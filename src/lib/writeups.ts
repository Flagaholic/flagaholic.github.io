import type { CollectionEntry } from "astro:content";

export type WriteupEntry = CollectionEntry<"writeups">;

export function writeupSlug(writeup: WriteupEntry) {
  return writeup.id.replace(/\/(?:README|readme)\.md$/, "").replace(/\.md$/, "");
}

export function sortWriteups(a: WriteupEntry, b: WriteupEntry) {
  return b.data.date.localeCompare(a.data.date);
}
