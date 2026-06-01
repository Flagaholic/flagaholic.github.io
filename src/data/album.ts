export type AlbumImage = {
  src: string;
  alt: string;
  description: string;
};

// Add accolade screenshots here after placing the files in public/assets/album/.
export const albumImages: AlbumImage[] = [
  {
    src: "/assets/album/bcactf_badge.png",
    alt: "BCACTF badge",
    description: "BCACTF badge",
  },
  {
    src: "/assets/album/wsu_ak.png",
    alt: "WSUCTF all-clear screenshot",
    description: "WSUCTF all-clear screenshot",
  },
  {
    src: "/assets/album/cuhk_cert.png",
    alt: "CUHKCTF certificate",
    description: "CUHKCTF certificate",
  },
];
``