import { mkdir, writeFile } from "node:fs/promises";

const TEAM_ID = 113364;
const CURRENT_YEAR = new Date().getFullYear();
const YEARS = [CURRENT_YEAR];
const OUTFILE = new URL("../src/data/ctftime.json", import.meta.url);

async function fetchJson(url) {
  const response = await fetch(url, {
    headers: {
      Accept: "application/json",
      "User-Agent": "Mozilla/5.0 flagaholic-site-updater",
    },
  });

  if (!response.ok) {
    throw new Error(`${url} returned HTTP ${response.status}`);
  }

  return response.json();
}

async function fetchText(url) {
  const response = await fetch(url, {
    headers: {
      Accept: "text/html",
      "User-Agent": "Mozilla/5.0 flagaholic-site-updater",
    },
  });

  if (!response.ok) {
    throw new Error(`${url} returned HTTP ${response.status}`);
  }

  return response.text();
}

function decodeHtml(value) {
  return value
    .replace(/&#39;/g, "'")
    .replace(/&quot;/g, '"')
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">");
}

function parseRatingTable(html, year) {
  const paneMatch = html.match(new RegExp(`<div class="tab-pane[^"]*" id="rating_${year}">([\\s\\S]*?)</table>`, "i"));
  if (!paneMatch) return [];

  const rows = paneMatch[1].matchAll(
    /<tr><td class="place_ico"><\/td><td class="place">(\d+)<\/td><td><a href="\/event\/(\d+)">([\s\S]*?)<\/a><\/td><td>([\d.]+)<\/td><td>([\d.]+)<\/td><\/tr>/g
  );

  return Array.from(rows, ([, place, eventId, title, points, ratingPoints]) => ({
    eventId,
    title: decodeHtml(title),
    year,
    place: Number(place),
    points: Number(points),
    ratingPoints: Number(ratingPoints),
  }));
}

function extractTeamEvents(results, year) {
  return Object.entries(results).flatMap(([eventId, event]) => {
    const score = event.scores?.find((item) => Number(item.team_id) === TEAM_ID);
    if (!score) return [];

    return [{
      eventId,
      title: event.title,
      year,
      date: new Date(Number(event.time) * 1000).toISOString().slice(0, 10),
      place: Number(score.place),
      points: Number(score.points),
      ratingPoints: null,
    }];
  });
}

const started = Date.now();
const team = await fetchJson(`https://ctftime.org/api/v1/teams/${TEAM_ID}/`);
const teamPageHtml = await fetchText(`https://ctftime.org/team/${TEAM_ID}`);
const yearlyResults = await Promise.all(
  YEARS.map(async (year) => [year, await fetchJson(`https://ctftime.org/api/v1/results/${year}/`)])
);

const apiEvents = yearlyResults
  .flatMap(([year, results]) => extractTeamEvents(results, year))
  .sort((a, b) => b.date.localeCompare(a.date));

const ratingEvents = parseRatingTable(teamPageHtml, CURRENT_YEAR);
const apiEventsById = new Map(apiEvents.map((event) => [event.eventId, event]));

const events = ratingEvents.map((event) => ({
  ...apiEventsById.get(event.eventId),
  ...event,
})).concat(apiEvents.filter((event) => !ratingEvents.some((ratingEvent) => ratingEvent.eventId === event.eventId)));

const latestEvents = [...events].sort((a, b) => (b.date || "").localeCompare(a.date || ""));

const highestRatedEvents = [...events]
  .filter((event) => typeof event.ratingPoints === "number" && event.ratingPoints > 0)
  .sort((a, b) => b.ratingPoints - a.ratingPoints)
  .slice(0, 10);

const payload = {
  fetchedAt: new Date().toISOString(),
  fetchMs: Date.now() - started,
  team: {
    id: team.id,
    name: team.name,
    country: team.country,
  },
  currentYear: {
    year: CURRENT_YEAR,
    globalRank: team.rating?.[CURRENT_YEAR]?.rating_place ?? null,
    countryRank: team.rating?.[CURRENT_YEAR]?.country_place ?? null,
    ratingPoints: team.rating?.[CURRENT_YEAR]?.rating_points ?? null,
  },
  events,
  latestEvents,
  highestRatedEvents,
};

await mkdir(new URL("../src/data", import.meta.url), { recursive: true });
await writeFile(OUTFILE, `${JSON.stringify(payload, null, 2)}\n`);

console.log(`Saved ${events.length} CTFTime events to ${OUTFILE.pathname} in ${payload.fetchMs}ms`);
