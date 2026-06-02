export type AlbumImage = {
  id: string;
  src: string;
  alt: string;
  description: string;
};

// Add accolade screenshots here after placing the files in public/assets/album/.
export const albumImages: AlbumImage[] = [
  {
    id: "bcactf-badge",
    src: "/assets/album/bcactf_badge.png",
    alt: "BCACTF badge",
    description: "bro tien where is it.",
  },
  {
    id: "wsuctf-ak",
    src: "/assets/album/wsu_ak.png",
    alt: "WSUCTF all cleared",
    description: "ak'd wsuctf (god i miss my team)",
  },
  {
    id: "cuhk-scoreboard",
    src: "/assets/album/cuhk_scoreboard.png",
    alt: "CUHKCTF Scoreboard",
    description: "2nd place in CUHKCTF",
  },
  {
    id: "patriot-ak",
    src: "/assets/album/patriot_ak.png",
    alt: "PatriotCTF all cleared",
    description: "our 2nd AK (All clear)!! PatriotCTF :D",
  },
  {
    id: "hkcert-scoreboard",
    src: "/assets/album/hkcert_scoreboard.png",
    alt: "HKCERT CTF 2025 Scoreboard",
    description: "5th place in tertiary div for HKCERT CTF.",
  },
  {
    id: "swimmer-scoreboard",
    src: "/assets/album/swimmer_scoreboard.png",
    alt: "Swimmer OSINT CTF all cleared",
    description: "Swimmer OSINT CTF all cleared! :p",
  },
  {
    id: "pascal-ak",
    src: "/assets/album/pascal_ak.png",
    alt: "PascalCTF all cleared",
    description: "PascalCTF all cleared!!",
  },
];
``
