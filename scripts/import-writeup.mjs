import { mkdir, readFile, writeFile } from "node:fs/promises";
import { createInterface } from "node:readline/promises";
import { stdin as input, stdout as output } from "node:process";
import path from "node:path";

const CONTENT_ROOT = new URL("../src/content/writeups/", import.meta.url);
const PUBLIC_ROOT = new URL("../public/writeup-files/", import.meta.url);
const TEXT_EXTENSIONS = new Set([
  ".c",
  ".cpp",
  ".css",
  ".go",
  ".h",
  ".html",
  ".java",
  ".js",
  ".json",
  ".jsx",
  ".mjs",
  ".md",
  ".py",
  ".rb",
  ".rs",
  ".sh",
  ".sql",
  ".ts",
  ".tsx",
  ".txt",
  ".yaml",
  ".yml",
]);

function usage() {
  console.log(`Import a GitHub writeup folder into the Astro site.

Usage:
  npm run import:writeup

The command opens a guided prompt for the GitHub link, event, category/tags, author, date, and dry-run mode.
`);
}

function parseGitHubFolderUrl(value) {
  const url = new URL(value);
  if (url.hostname !== "github.com") {
    throw new Error("Only github.com folder URLs are supported right now.");
  }

  const segments = url.pathname.split("/").filter(Boolean).map(decodeURIComponent);
  const treeIndex = segments.indexOf("tree");
  if (segments.length < 5 || treeIndex !== 2) {
    throw new Error("Expected a GitHub folder URL like https://github.com/owner/repo/tree/main/path/to/writeup");
  }

  const [owner, repo] = segments;
  const ref = segments[treeIndex + 1];
  const folderPath = segments.slice(treeIndex + 2).join("/");
  if (!folderPath) {
    throw new Error("The GitHub URL must point to a folder inside the repository.");
  }

  return { owner, repo, ref, folderPath, folderName: segments.at(-1) };
}

function slugify(value) {
  return value
    .trim()
    .toLowerCase()
    .replace(/&/g, "and")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "") || "writeup";
}

function commaList(value) {
  return value.split(",").map((item) => item.trim()).filter(Boolean);
}

function safePathSegment(value) {
  return value
    .trim()
    .replace(/[/:\\]+/g, "-")
    .replace(/\s+/g, " ") || "writeup";
}

async function confirm(label) {
  const terminal = createInterface({ input, output });
  try {
    const answer = (await terminal.question(label)).trim();
    return /^y(?:es)?$/i.test(answer);
  } finally {
    terminal.close();
  }
}

async function promptForImport() {
  const terminal = createInterface({ input, output });
  const args = { flags: new Set(), options: {}, positional: [] };

  async function ask(label, { required = false } = {}) {
    while (true) {
      const answer = (await terminal.question(label)).trim();
      if (answer || !required) return answer;
      console.log("This one is required.");
    }
  }

  try {
    args.positional[0] = await ask("github link for writeup: ", { required: true });
    args.options.event = await ask("event: ", { required: true });

    let categoryTags = [];
    categoryTags = commaList(await ask("category/tags (comma separated, first is primary): ", { required: true }));
    args.options.category = categoryTags[0];
    args.options.author = await ask("author: ", { required: true });
    args.options.date = await ask("date (YYYY-MM-DD): ", { required: true });

    const title = await ask("title override (optional, enter to use README title): ");
    if (title) args.options.title = title;

    const extraTags = commaList(await ask("extra tags (comma separated, optional): "));
    args.options.tags = [...new Set([...categoryTags, ...extraTags].map(slugify))].join(",");

    const dryRun = await ask("dry run only? (y/N): ");
    if (/^y(?:es)?$/i.test(dryRun)) args.flags.add("dry-run");
  } finally {
    terminal.close();
  }

  return args;
}

function frontmatterString(data) {
  const lines = ["---"];
  lines.push(`title: ${JSON.stringify(data.title)}`);
  lines.push(`event: ${JSON.stringify(data.event)}`);
  lines.push(`category: ${JSON.stringify(data.category)}`);
  lines.push(`author: ${JSON.stringify(data.author)}`);
  lines.push(`date: ${JSON.stringify(data.date)}`);
  lines.push(`tags: [${data.tags.map((tag) => JSON.stringify(tag)).join(", ")}]`);
  lines.push("attachments:");
  if (data.attachments.length === 0) {
    lines[lines.length - 1] = "attachments: []";
  } else {
    for (const attachment of data.attachments) {
      lines.push(`  - name: ${JSON.stringify(attachment.name)}`);
      lines.push(`    href: ${JSON.stringify(attachment.href)}`);
      lines.push(`    type: ${JSON.stringify(attachment.type)}`);
    }
  }
  lines.push("---", "");
  return lines.join("\n");
}

function stripFrontmatter(markdown) {
  if (!markdown.startsWith("---\n")) return markdown;
  const end = markdown.indexOf("\n---", 4);
  if (end === -1) return markdown;
  return markdown.slice(markdown.indexOf("\n", end + 4) + 1);
}

function firstHeading(markdown) {
  return markdown.match(/^#\s+(.+?)\s*$/m)?.[1]?.trim();
}

function stripMatchingFirstHeading(markdown, title) {
  const escaped = title.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  return markdown.replace(new RegExp(`^#\\s+${escaped}\\s*\\n+`, "i"), "");
}

function isExternalHref(href) {
  return /^(?:[a-z][a-z0-9+.-]*:|#|\/\/)/i.test(href);
}

function normalizeRelativeTarget(readmeDir, target) {
  const [pathname, suffix = ""] = target.split(/([?#].*)/);
  const normalized = path.posix.normalize(path.posix.join(readmeDir, pathname));
  return { pathname: normalized, suffix };
}

function rewriteMarkdownAssets(markdown, assetMap, readmeDir) {
  let output = markdown.replace(/(!?\[[^\]]*\]\()([^)]+)(\))/g, (match, prefix, rawHref, suffix) => {
    const href = rawHref.trim();
    if (isExternalHref(href)) return match;

    const quote = href.match(/^(['"])(.*)\1$/);
    const cleanHref = quote ? quote[2] : href;
    const resolved = normalizeRelativeTarget(readmeDir, cleanHref);
    const replacement = assetMap.get(resolved.pathname);
    if (!replacement) return match;

    return `${prefix}${replacement}${resolved.suffix}${suffix}`;
  });

  output = output.replace(/\b(src|href)=(["'])([^"']+)\2/g, (match, attr, quote, rawHref) => {
    if (isExternalHref(rawHref)) return match;

    const resolved = normalizeRelativeTarget(readmeDir, rawHref);
    const replacement = assetMap.get(resolved.pathname);
    if (!replacement) return match;

    return `${attr}=${quote}${replacement}${resolved.suffix}${quote}`;
  });

  return output;
}

function inferAttachmentType(relativePath) {
  const directory = relativePath.split("/").at(0)?.toLowerCase();
  if (directory === "files") return "file";
  if (directory === "src") return "source";

  const extension = path.extname(relativePath).toLowerCase();
  if (extension === ".py" || extension === ".js" || extension === ".sh") return "script";
  if (extension === ".md" || extension === ".txt") return "notes";
  return "attachment";
}

function isPreviewableAttachment(relativePath) {
  const extension = path.extname(relativePath).toLowerCase();
  return TEXT_EXTENSIONS.has(extension) && !relativePath.toLowerCase().endsWith("readme.md");
}

async function fetchJson(url) {
  const response = await fetch(url, {
    headers: {
      Accept: "application/vnd.github+json",
      "User-Agent": "flagaholic-writeup-importer",
    },
  });

  if (!response.ok) {
    throw new Error(`${url} returned HTTP ${response.status}`);
  }

  return response.json();
}

async function fetchArrayBuffer(url) {
  const response = await fetch(url, {
    headers: {
      "User-Agent": "flagaholic-writeup-importer",
    },
  });

  if (!response.ok) {
    throw new Error(`${url} returned HTTP ${response.status}`);
  }

  return response.arrayBuffer();
}

async function listGitHubFiles({ owner, repo, ref, folderPath }) {
  const encodedPath = folderPath.split("/").map(encodeURIComponent).join("/");
  const url = `https://api.github.com/repos/${owner}/${repo}/contents/${encodedPath}?ref=${encodeURIComponent(ref)}`;
  const items = await fetchJson(url);
  if (!Array.isArray(items)) {
    throw new Error("The GitHub URL points to a file, not a folder.");
  }

  const files = [];
  const queue = items.map((item) => ({ item }));

  while (queue.length > 0) {
    const { item } = queue.shift();
    if (item.type === "file") {
      files.push({
        name: item.name,
        path: item.path,
        relativePath: path.posix.relative(folderPath, item.path),
        downloadUrl: item.download_url,
      });
      continue;
    }

    if (item.type === "dir") {
      const children = await fetchJson(item.url);
      for (const child of children) {
        queue.push({ item: child });
      }
    }
  }

  return files;
}

async function fileExists(fileUrl) {
  try {
    await readFile(fileUrl);
    return true;
  } catch (error) {
    if (error.code === "ENOENT") return false;
    throw error;
  }
}

async function main() {
  const argv = process.argv.slice(2);
  if (argv.length === 1 && argv[0] === "--help") {
    usage();
    return;
  }
  if (argv.length > 0) {
    throw new Error("can you just run `npm run import:writeup` and not try to break me -_-||");
  }
  const args = await promptForImport();

  const sourceUrl = args.positional[0];
  if (!sourceUrl) {
    usage();
    throw new Error("Missing GitHub folder URL.");
  }

  for (const required of ["event", "category", "author", "date"]) {
    if (!args.options[required]) {
      usage();
      throw new Error(`Missing required option --${required}`);
    }
  }

  const githubFolder = parseGitHubFolderUrl(sourceUrl);
  const files = await listGitHubFiles(githubFolder);
  const readme = files.find((file) => /^readme\.md$/i.test(path.basename(file.relativePath)));
  if (!readme) {
    throw new Error("Could not find README.md in that GitHub folder.");
  }

  const readmeBuffer = Buffer.from(await fetchArrayBuffer(readme.downloadUrl));
  const originalMarkdown = readmeBuffer.toString("utf8");
  const title = args.options.title || firstHeading(originalMarkdown) || githubFolder.folderName;
  const year = args.options.date.slice(0, 4);
  const eventSlug = slugify(args.options.event);
  const writeupSlug = slugify(title);
  const categoryLabel = args.options.category.trim();
  const contentSegment = safePathSegment(`${categoryLabel} - ${title}`);
  const contentFolder = new URL(`${year}/${eventSlug}/${contentSegment}/`, CONTENT_ROOT);
  const contentFile = new URL("README.md", contentFolder);
  const publicFolderPath = `${year}/${eventSlug}/${writeupSlug}`;
  const publicFolder = new URL(`${publicFolderPath}/`, PUBLIC_ROOT);
  const publicHrefBase = `/writeup-files/${publicFolderPath}`;
  const readmeDir = path.posix.dirname(readme.relativePath);
  const assetFiles = files.filter((file) => file.relativePath !== readme.relativePath);
  const assetMap = new Map(
    assetFiles.map((file) => [
      file.relativePath,
      `${publicHrefBase}/${file.relativePath.split("/").map(encodeURIComponent).join("/")}`,
    ])
  );
  const attachments = assetFiles
    .filter((file) => isPreviewableAttachment(file.relativePath))
    .map((file) => ({
      name: path.posix.basename(file.relativePath),
      href: assetMap.get(file.relativePath),
      type: inferAttachmentType(file.relativePath),
    }));

  let markdown = stripFrontmatter(originalMarkdown);
  markdown = stripMatchingFirstHeading(markdown, title);
  markdown = rewriteMarkdownAssets(markdown, assetMap, readmeDir);
  markdown = `${frontmatterString({
    title,
    event: args.options.event,
    category: categoryLabel,
    author: args.options.author,
    date: args.options.date,
    tags: (args.options.tags || "").split(",").map((tag) => slugify(tag)).filter(Boolean),
    attachments,
  })}${markdown.trimStart()}`;

  console.log(`Source: ${sourceUrl}`);
  console.log(`Writeup: ${contentFile.pathname}`);
  console.log(`Assets: ${publicFolder.pathname}`);
  console.log(`Public URL: /writeups/${year}/${eventSlug}/${contentSegment}/`);
  console.log(`Attachments: ${attachments.length}`);

  if (args.flags.has("dry-run")) {
    console.log("Dry run only. No files were written.");
    return;
  }

  if (await fileExists(contentFile)) {
    const shouldOverwrite = await confirm(`A writeup already exists at ${contentFile.pathname}. Overwrite it? (y/N): `);
    if (!shouldOverwrite) {
      throw new Error("Import cancelled. No files were changed.");
    }
  }

  await mkdir(contentFolder, { recursive: true });
  await mkdir(publicFolder, { recursive: true });
  await writeFile(contentFile, markdown);

  for (const file of assetFiles) {
    const target = new URL(file.relativePath, publicFolder);
    await mkdir(new URL("./", target), { recursive: true });
    const bytes = Buffer.from(await fetchArrayBuffer(file.downloadUrl));
    await writeFile(target, bytes);
  }

  console.log(`Imported ${assetFiles.length + 1} files.`);
}

main().catch((error) => {
  console.error(error.message);
  process.exit(1);
});
