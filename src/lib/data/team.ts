export interface SocialLink {
  url: string;
  username?: string;
}

export interface TeamMember {
  id: string;
  name: string;
  role?: string;
  specialties?: string[];
  joinDate?: Date;
  avatar?: string;
  socials?: {
    github?: SocialLink;
    twitter?: SocialLink;
    instagram?: SocialLink;
    discord?: SocialLink;
    blog?: SocialLink;
    linkedin?: SocialLink;
  };
  quote?: string;
}

export interface Achievement {
  id: string;
  competition: string;
  date: Date;
  placement: number;
  points: number;
  ratingPoints: number;
  year: number;
}

export interface TeamStats {
  currentRanking: number;
  currentPoints: number;
  year: number;
  countryRanking: number;
  memberCount: number;
  timezone: string;
  previousRanking?: {
    ranking: number;
    points: number;
    year: number;
    countryRanking: number;
  };
}

export const teamInfo = {
  name: "Sanrioholic",
  aliases: ["flagaholic", "ctf-beginner", "flagaholicpus", "Sanrioholicpus"],
  website: "www.flagaholic.xyz",
  email: "youstube@flagaholic.xyz",
  discord: "youtubeshort@discord",
  description: "A HK-based CTF Team.",
  location: "Hong Kong",
  timezone: "UTC+8",
  recruiting: true,
  recruitmentInfo: "DM youtubeshort@discord for recruitment"
};

export const teamStats: TeamStats = {
  currentRanking: 126,
  currentPoints: 101.098,
  year: 2026,
  countryRanking: 2,
  memberCount: 21,
  timezone: "UTC+8",
  previousRanking: {
    ranking: 159,
    points: 290.275,
    year: 2025,
    countryRanking: 3
  }
};

export const currentMembers: TeamMember[] = [
  {
    id: "1",
    name: "youstube_",
    role: "Team Leader",
    specialties: ["Misc", "Forensics", "OSINT"],
    avatar: "/assets/playerlogo/youstube.jpg",
    socials: {
      github: { url: "https://github.com/codestube", username: "codestube" },
      instagram: { url: "https://www.instagram.com/youstube__", username: "youstube__" }
    },
    quote: "leader"
  },
  {
    id: "2",
    name: "xzhiyouu (Nelson)",
    role: "Website Maintainer",
    specialties: ["Misc", "Forensics"],
    avatar: "/assets/playerlogo/Nelson.jpg",
    socials: {
      github: { url: "https://github.com/xzhiyouu62", username: "xzhiyouu62" }
    }
  },
  {
    id: "3",
    name: "Kazuya",
    specialties: ["Rev", "Web"],
    avatar: "/assets/playerlogo/kazuya.png"
  },
  {
    id: "4",
    name: "bug1nst0m@ch",
    role: "Not even computer major",
    specialties: ["Misc", "Forensics"],
    avatar: "/assets/playerlogo/thomas.png"
  },
  {
    id: "5",
    name: "owo",
    specialties: ["Web"],
    avatar: "/assets/playerlogo/OwO.png"
  },
  {
    id: "6",
    name: "Nsnzero",
    specialties: ["Hardware"],
    avatar: "/assets/playerlogo/NSN.png"
  },
  {
    id: "7",
    name: "Taokyle",
    role: "Website Maintainer",
    specialties: ["Misc", "Web", "Forensics"],
    avatar: "/assets/playerlogo/taokyle.jpeg",
    socials: {
      github: { url: "https://github.com/TaokyleYT", username: "TaokyleYT" },
      instagram: { url: "https://www.instagram.com/taokyle415", username: "taokyle415" },
      discord: { url: "https://discord.com/users/681426499794239519", username: "taokyle" }
    },
    quote: "dumbass++"
  },
  {
    id: "8",
    name: "SISUBENY",
    specialties: ["Rev", "Pwn"],
    avatar: "/assets/playerlogo/sisubeny.png",
    socials: {
      github: { url: "https://github.com/SISUBEN", username: "SISUBEN" },
      twitter: { url: "https://x.com/SISUBENY", username: "SISUBENY" },
      blog: { url: "https://sisubeny.space" }
    },
    quote: "english level U"
  },
  {
    id: "9",
    name: "twopus",
    role: `differentiating "ur" & "ure"`,
    specialties: ["Uhh"],
    avatar: "/assets/playerlogo/twopus.png",
    socials: {
      github: { url: "https://github.com/twopus", username: "twopus" }
    },
    quote: "roblox lover"
  },
  {
    id: "10",
    name: "HarryBOB",
    specialties: ["Blockchain"],
    avatar: "/assets/playerlogo/harrybob.jpg",
    socials: {
      github: { url: "https://github.com/harry-bob", username: "harry-bob" }
    },
    quote: "A Snorlax?"
  },
  {
    id: "11",
    name: "Carz",
    role: "a car",
    specialties: ["Crypto", "Forensics"],
    avatar: "/assets/playerlogo/carz.jpeg",
    quote: "KA CHOW!"
  },
  {
    id: "12",
    name: "Demonster",
    role: "Raccoon goes maur maur",
    specialties: ["Web"],
    avatar: "/assets/playerlogo/demonster.png",
    socials: {
      linkedin: { url: "https://www.linkedin.com/in/daniel-agatan/", username: "daniel-agatan" }
    }
  },
  {
    id: "13",
    name: "B34RN00B",
    specialties: ["OSINT", "Forensics"],
    avatar: "/assets/playerlogo/B34RN00B.png",
    socials: {
      discord: { url: "https://discord.com/users/1379831907784855712", username: "b34rn00by" }
    }
  },
  {
    id: "14",
    name: "damwan21",
    specialties: ["OSINT", "Crypto"],
    avatar: "/assets/playerlogo/damwan.jpg",
    quote: "weird?"
  },
  { id: "15", name: "Zwique" },
  { id: "16", name: "Laggy" },
  { id: "17", name: "Acacia" },
  { id: "18", name: "igtanova06" },
  { id: "19", name: "zuytrinh" },
  { id: "20", name: "Kaiyasi" },
  { id: "21", name: "Akitenten" }
];

export const achievements2026: Achievement[] = [
  { id: "1", competition: "PascalCTF 2026", date: new Date("2026-03-01"), placement: 12, points: 7403.0000, ratingPoints: 26.022, year: 2026 },
  { id: "2", competition: "Scarlet CTF 2026", date: new Date("2026-02-15"), placement: 19, points: 6303.0000, ratingPoints: 13.151, year: 2026 },
  { id: "3", competition: "ApoorvCTF 2026", date: new Date("2026-02-01"), placement: 32, points: 5282.0000, ratingPoints: 14.638, year: 2026 },
  { id: "4", competition: "Batman's Kitchen CTF 2026", date: new Date("2026-01-20"), placement: 40, points: 7864.0000, ratingPoints: 14.659, year: 2026 },
  { id: "5", competition: "THJCC CTF 2026", date: new Date("2026-01-15"), placement: 42, points: 3019.0000, ratingPoints: 0.000, year: 2026 },
  { id: "6", competition: "TaipanByte's Chart CTF", date: new Date("2026-01-10"), placement: 105, points: 3330.0000, ratingPoints: 8.921, year: 2026 },
  { id: "7", competition: "New Year CTF 2026", date: new Date("2026-01-01"), placement: 129, points: 1150.0000, ratingPoints: 2.512, year: 2026 },
  { id: "8", competition: "KnightCTF 2026", date: new Date("2025-12-20"), placement: 159, points: 1400.0000, ratingPoints: 8.227, year: 2026 },
  { id: "9", competition: "BITSCTF 2026", date: new Date("2025-12-15"), placement: 153, points: 884.0000, ratingPoints: 6.373, year: 2026 },
  { id: "10", competition: "SWIMMER OSINT CTF", date: new Date("2025-12-10"), placement: 19, points: 3971.0000, ratingPoints: 0.000, year: 2026 },
];

export const achievements2025: Achievement[] = [
  { id: "11", competition: "PatriotCTF 2025", date: new Date("2025-09-15"), placement: 5, points: 6813.0000, ratingPoints: 50.904, year: 2025 },
  { id: "12", competition: "BCACTF 6.0", date: new Date("2025-08-20"), placement: 17, points: 4075.0000, ratingPoints: 41.164, year: 2025 },
  { id: "13", competition: "HKCERT CTF 2025 (Qualifying Round)", date: new Date("2025-11-10"), placement: 40, points: 5135.0000, ratingPoints: 39.496, year: 2025 },
  { id: "14", competition: "Lexington Informatics Tournament CTF 2025", date: new Date("2025-07-15"), placement: 72, points: 3417.0000, ratingPoints: 34.502, year: 2025 },
  { id: "15", competition: "V1t CTF 2025", date: new Date("2025-06-01"), placement: 5, points: 7751.0000, ratingPoints: 22.942, year: 2025 },
  { id: "16", competition: "SECCON CTF 14 Quals", date: new Date("2025-12-01"), placement: 76, points: 751.0000, ratingPoints: 22.724, year: 2025 },
  { id: "17", competition: "HeroCTF v7", date: new Date("2025-05-15"), placement: 53, points: 4093.0000, ratingPoints: 22.210, year: 2025 },
  { id: "18", competition: "ImaginaryCTF 2025", date: new Date("2025-07-01"), placement: 49, points: 3226.0000, ratingPoints: 22.393, year: 2025 },
  { id: "19", competition: "Null CTF 2025", date: new Date("2025-04-01"), placement: 7, points: 10674.0000, ratingPoints: 21.794, year: 2025 },
  { id: "20", competition: "BackdoorCTF 2025", date: new Date("2025-12-20"), placement: 130, points: 1100.0000, ratingPoints: 12.147, year: 2025 },
];

// Get top achievements for display
export const topAchievements = [
  ...achievements2026.slice(0, 5),
  ...achievements2025.slice(0, 5)
].sort((a, b) => b.ratingPoints - a.ratingPoints).slice(0, 10);