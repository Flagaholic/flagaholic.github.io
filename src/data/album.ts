export type AlbumImage = {
  id: string;
  year: string;
  file: string;
  src: string;
  alt: string;
  description: string;
  pinned?: boolean;
  pinOrder?: number;
};

type AlbumImageData = Omit<AlbumImage, "src">;

// Add accolade screenshots here after placing files in public/assets/album/{year}/.
const albumImageData: AlbumImageData[] = [
  {
    id: "2025-polyuctf-scoreboard",
    year: "2025",
    file: "polyuctf_scoreboard.png",
    alt: "PolyUCTF 2025 scoreboard",
    description: "#4 in sub-degree cat. this was our first ever ctf.",
  },
  {
    id: "2025-bcactf-badge",
    year: "2025",
    file: "bcactf_badge.png",
    alt: "BCACTF 6.0 badge",
    description: "bro tien where is it.",
  },
  {
    id: "2025-wsuctf-ak",
    year: "2025",
    file: "wsu_ak.png",
    alt: "WSUCTF all cleared",
    description: "ak'd wsuctf (god i miss my team)",
  },
  {
    id: "2025-cuhk-scoreboard",
    year: "2025",
    file: "cuhk_scoreboard.png",
    alt: "CUHKCTF 2025 Scoreboard",
    description: "2nd place in CUHKCTF 2025",
  },
  {
    id: "2025-patriot-ak",
    year: "2025",
    file: "patriot_ak.png",
    alt: "PatriotCTF 2025 all cleared",
    description: "our 2nd AK (All clear)!! PatriotCTF 2025 :D",
  },
  {
    id: "2025-hkcert-scoreboard",
    year: "2025",
    file: "hkcert_scoreboard.png",
    alt: "HKCERT CTF 2025 Scoreboard",
    description: "5th place in tertiary div for HKCERT CTF.",
  },
  {
    id: "2026-swimmer-scoreboard",
    year: "2026",
    file: "swimmer_scoreboard.png",
    alt: "Swimmer OSINT CTF 2026 all cleared",
    description: "Swimmer OSINT CTF 2026 all cleared! :p",
  },
  {
    id: "2026-polyuctf-scoreboard",
    year: "2026",
    file: "polyuctf_scoreboard.png",
    alt: "PolyUCTF 2026 Scoreboard",
    description: "#1 IN POLYUCTF 2026 (playing under 3Failures1Noob)!!!",
    pinned: true,
    pinOrder: 1,
  },
  {
    id: "2026-pascal-ak",
    year: "2026",
    file: "pascal_ak.png",
    alt: "PascalCTF all cleared",
    description: "PascalCTF 2026 all cleared!!",
  },
];

export const albumImages: AlbumImage[] = albumImageData.map((image) => ({
  ...image,
  src: `/assets/album/${image.year}/${image.file}`,
}));

export const pinnedAlbumImages = albumImages
  .map((image, index) => ({ image, index }))
  .filter(({ image }) => image.pinned === true)
  .sort((a, b) => (a.image.pinOrder ?? a.index) - (b.image.pinOrder ?? b.index))
  .map(({ image }) => image);

export const albumSections = Array.from(
  albumImages.reduce((sections, image) => {
    const images = sections.get(image.year) ?? [];
    images.push(image);
    sections.set(image.year, images);
    return sections;
  }, new Map<string, AlbumImage[]>()),
).map(([year, images]) => ({ year, images }));
