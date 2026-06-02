export const team = {
  name: "flagaholic",
  description: "A chill CTF team based in Hong Kong. lwk a bit too chill :p",
  location: "Hong Kong",
  timezone: "UTC+8",
  email: "youstube@flagaholic.xyz",
  discord: "youtubeshort@discord",
  discordInvite: "https://discord.gg/z9JTf2uuWq",
  ctftimeUrl: "https://ctftime.org/team/113364",
  githubUrl: "https://github.com/Flagaholic",
  instagramUrl: "https://www.instagram.com/flagaholichk",
};

export const accomplishments = [
  {
    title: "NuttyShell x PolyUCTF 2026",
    detail: "1st place in tertiary category under the name 3Failure1Noob",
  },
  {
    title: "HKCERT CTF 2025",
    detail: "Qualified as Finalist and played our first offline CTF locally!",
  },
  {
    title: "Internal Workshop",
    detail: "Created fun workshop session for internal members to participate in! ",
  },
];

type TimelineItem = {
  date: string;
  title: string;
  detail: string;
  rank?: string;
  origin?: boolean;
  href?: string;
};

export const timeline: TimelineItem[] = [
  {
    date: "2025 May",
    title: "Start of flagaholic",
    detail: "i made flagaholic cuz polyuctf 2025.",
    origin: true,
  },
  {
    date: "2025 May",
    title: "WSUCTF",
    rank: "#1",
    detail: "we all cleared WSUCTF (still no scoreboard) -v-",
    href: "https://ctftime.org/event/2757",
  },
  {
    date: "2025 June",
    title: "BCACTF",
    rank: "#17/277",
    detail: "almost solo beat prime blitzhack :skull:\nalso tien STILL havent give me the badge",
    href: "https://ctftime.org/event/2836",
  },
  {
    date: "2025 Aug",
    title: "Full Weak Engineer CTF",
    rank: "#25/733",
    detail: "i think i wanted do writeup on a minecraft chall but forgot",
    href: "https://ctftime.org/event/2864",
  },
  {
    date: "2025 Sep",
    title: "ImaginaryCTF",
    rank: "#49/1414",
    detail: "when is ictf daily coming back",
    href: "https://2025.imaginaryctf.org/Team/392.html",
  },
  {
    date: "2025 Sep",
    title: "CUHKCTF #3/189",
    rank: "#2 in guest div.",
    detail: "we blooded 10 challs :>",
    href: "/album/#cuhk-scoreboard",
  },
  {
    date: "2025 Oct",
    title: "osu!gaming CTF",
    rank: "#38/740",
    detail: "kaijuu ni naritai~",
    href: "https://2025.osugaming.sekai.team/scores",
  },
  {
    date: "2025 Nov",
    title: "V1t CTF",
    rank: "#5/1237",
    detail: "our first int'l top 5 :o",
    href: "https://2025.v1t.site/scoreboard/",
  },
  {
    date: "2025 Nov",
    title: "PatriotCTF",
    rank: "#5/1343",
    detail: "our second ak + top 5 int'l :o",
    href: "/album/#patriot-ak",
  },
  {
    date: "2025 Dec",
    title: "HKCERT CTF",
    rank: "#40/573",
    detail: "#5 in tertiary div., qualified to final\nhonestly one of the worst ctf played",
    href: "/album/#hkcert-scoreboard",
  },
  {
    date: "2026 Jan",
    title: "Swimmer OSINT CTF",
    rank: "#19/687",
    detail: "our 3rd ak!! fun ctf imo :D",
    href: "/album/#swimmer-scoreboard",
  },
  {
    date: "2026 Jan",
    title: "PascalCTF",
    rank: "#12/855",
    detail: "4th ak! our team carried :p",
    href: "/album/#pascal-ak",
  },
  {
    date: "2026 Mar",
    title: "ApoorvCTF",
    rank: "#32/850",
    detail: "whole lotta fake flag ctf.",
    href: "https://ctftime.org/event/3171",
  },
  {
    date: "2026 May",
    title: "TJCTF",
    rank: "#44/948",
    detail: "Whole lotta w challs ctf <3",
    href: "https://ctf.tjctf.org/scores",
  },
  {
    date: "2026 May",
    title: "0xV01D CTF",
    rank: "#4/689",
    detail: "One of the weirder CTF we've played..\nlwk hated it but top 5 is top 5",
    href: "https://ctftime.org/event/3269",
  },
];

export const members = [
  {
    name: "youstube_",
    role: "Team leader",
    focus: ["OSINT", "Forensics", "Misc"],
    avatar: "/assets/playerlogo/youstube.jpg",
    quote: "leader",
    socials: {
      github: "https://github.com/codestube",
      instagram: "https://www.instagram.com/youstube__",
    },
  },
  {
    name: "Taokyle",
    role: "Website maintainer",
    focus: ["Misc", "Web", "Forensics"],
    avatar: "/assets/playerlogo/taokyle.jpeg",
    quote: "dumbass++",
    socials: {
      github: "https://github.com/TaokyleYT",
      instagram: "https://www.instagram.com/taokyle415",
      discord: "https://discord.com/users/681426499794239519",
    },
  },
  {
    name: "SISUBENY",
    role: "Web maintainer",
    focus: ["Rev", "Pwn"],
    avatar: "/assets/playerlogo/sisubeny.png",
    quote: "english level U",
    socials: {
      github: "https://github.com/SISUBEN",
      x: "https://x.com/SISUBENY",
      blog: "https://sisubeny.space",
    },
  },
  {
    name: "xzhiyouu",
    role: "Web maintainer",
    focus: ["Crypto", "Misc"],
    avatar: "/assets/playerlogo/Nelson.jpg",
    socials: {
      github: "https://github.com/xzhiyouu62",
    },
  },
  {
    name: "twopus",
    role: "Web maintainer",
    focus: ["Brainrot", "Roblox"],
    avatar: "/assets/playerlogo/twopus.png",
    quote: "roblox lover",
    socials: {
      github: "https://github.com/twopus",
    },
  },
  {
    name: "Demonster",
    role: "Staff team",
    focus: ["Web"],
    avatar: "/assets/playerlogo/demonster.png",
    quote: "raccoon goes maur maur",
    socials: {
      linkedin: "https://www.linkedin.com/in/daniel-agatan/",
    },
  },
  {
    name: "owo",
    role: "Braindead individual",
    focus: ["Web"],
    avatar: "/assets/playerlogo/owo.png",
    socials: {
      github: "https://github.com/sunny7890987",
    },
  },
  {
    name: "HarryBOB",
    role: "Ice cweam enjoyerr",
    focus: ["Blockchain"],
    avatar: "/assets/playerlogo/harrybob.jpg",
    socials: {
      github: "https://github.com/harry-bob",
    },
  },
  {
    name: "Carz",
    role: "A car",
    focus: ["Crypto", "Forensics"],
    avatar: "/assets/playerlogo/carz.jpeg",
  },
  {
    name: "B34RN00B",
    role: "a bear with limited wifi",
    focus: ["OSINT", "Forensics"],
    avatar: "/assets/playerlogo/bearnoob.png",
    socials: {
      discord: "https://discord.com/users/1379831907784855712",
    },
  },
  {
    name: "damwan21",
    role: "always fatshaming",
    focus: ["OSINT", "Crypto"],
    avatar: "/assets/playerlogo/damwan.jpg",
    quote: "weirdo?",
  },
  {
    name: "Zwique",
    role: "so good at everything",
    focus: ["Crypto", "OSINT", "Forensics"],
    avatar: "/assets/playerlogo/zwique.png",
    socials: {
      github: "https://github.com/Zwique",
      blog: "https://zwique.gitbook.io/zwique_notes",
    },
  },
  {
    name: "Laggy",
    role: "the carry of our team orz orz orz",
    focus: ["Pwn", "Rev"],
    avatar: "/assets/playerlogo/laggy.png",
    socials: {
      github: "https://github.com/alaggydev",
      blog: "https://alaggydev.github.io/",
    }
  },
  {
    name: "Acacia",
    role: "viet 1",
    focus: ["Web"],
    avatar: "/assets/playerlogo/acacia.png",
  },
  {
    name: "igtanova06",
    role: "viet 2",
    focus: ["Rev"],
    avatar: "/assets/playerlogo/igtanova.png",
  },
  {
    name: "zuytrinh",
    role: "viet 3",
    focus: ["Forensics", "Misc"],
    avatar: "/assets/playerlogo/zuytrinh.png",
  },
  {
    name: "Kaiyasi",
    role: "Player",
    focus: ["Web", "AI"],
    avatar: "/assets/playerlogo/kaiyasi.png",
  },
  {
    name: "Akitenten",
    role: "Player",
    focus: ["OSINT"],
    avatar: "/assets/playerlogo/aki.png",
  },
  {
    name: "shay",
    role: "Player",
    focus: ["OSINT"],
    avatar: "/assets/playerlogo/shay.png",
  },
  {
    name: "JustCat",
    role: "Player",
    focus: ["Pwn", "Rev", "Misc"],
    avatar: "/assets/playerlogo/jst.png",
    socials: {
      github: "https://github.com/AJustcaTA",
      blog: "https://ajustcata.github.io/",
    }
  },
  {
    name: "Chung",
    role: "Player",
    focus: ["OSINT"],
    avatar: "/assets/playerlogo/chung.png",
  },
  {
    name: "Kazuya",
    role: "OG Member",
    focus: ["Web", "Rev"],
    avatar: "/assets/playerlogo/kazuya.png",
  },
  {
    name: "bug1nst0m@ch",
    role: "OG Member",
    focus: ["Misc", "OSINT"],
    avatar: "/assets/playerlogo/thomas.png",
    quote: "not even computer major",
  },
  {
    name: "Nsnzero",
    role: "OG Member",
    focus: ["Hardware"],
    avatar: "/assets/playerlogo/nsn.png",
    socials: {
      github: "https://github.com/nsnzero",
    },
  },
];
