import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function generateUserCode() {
  const alphabet = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
  let code = "EDU-";
  for (let i = 0; i < 6; i += 1) {
    code += alphabet[Math.floor(Math.random() * alphabet.length)];
  }
  return code;
}

export function embedResourceLink(link: string) {
  if (link.includes("drive.google.com")) {
    const match = link.match(/\/d\/(.+?)\//);
    if (match?.[1]) {
      return `https://drive.google.com/file/d/${match[1]}/preview`;
    }
  }
  if (link.includes("onedrive.live.com")) {
    return link.replace("view.aspx", "embed");
  }
  if (link.includes("dropbox.com")) {
    return link.replace("?dl=0", "?raw=1");
  }
  return null;
}

