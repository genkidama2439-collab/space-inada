import type { ImageAsset } from "./images";

/**
 * チームメンバー（/about のチーム紹介）。
 * 写真は public/images/about/team-*.jpg。
 */
export type TeamMember = {
  name: string;
  role: string;
  origin: string;
  /** 紹介の短い箇条書き */
  notes: string[];
  /** 特技 */
  specialty: string;
  image: ImageAsset;
};

export const teamMembers: TeamMember[] = [
  {
    name: "Toon",
    role: "カメラマン",
    origin: "北海道出身",
    notes: ["島イチ若くて才能あふれるクリエイター", "細くて、歌がうまい"],
    specialty: "作曲",
    image: {
      src: "/images/about/team-toon.jpg",
      alt: "宮古島の星空フォトチーム・カメラマン Toon のポートレート",
      orientation: "portrait",
    },
  },
  {
    name: "Sho",
    role: "カメラマン",
    origin: "北海道出身",
    notes: ["なんでもできるマッチョ", "怒ったら絶対こわい"],
    specialty: "なんでもできる",
    image: {
      src: "/images/about/team-sho.jpg",
      alt: "宮古島の星空フォトチーム・カメラマン Sho のポートレート",
      orientation: "portrait",
    },
  },
];
