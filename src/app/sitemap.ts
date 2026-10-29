import type { MetadataRoute } from "next";
import { SITE_ORIGIN, UPDATED_AT } from "@/lib/site";

function absoluteUrl(path: string): string {
  return new URL(path || "/", `${SITE_ORIGIN}/`).href;
}

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date(UPDATED_AT);
  const paths = [
    "/",
    "/vpn",
    "/免费vpn",
    "/免费节点",
    "/如何选择vpn",
    "/about",
    "/privacy",
    "/terms",
  ];

  return paths.map((path) => ({
    url: absoluteUrl(path),
    lastModified,
    changeFrequency:
      path === "/" ||
      path === "/vpn" ||
      path === "/免费vpn" ||
      path === "/免费节点" ||
      path === "/如何选择vpn"
        ? "weekly"
        : "monthly",
    priority:
      path === "/"
        ? 1
        : path === "/vpn" || path === "/免费vpn"
          ? 0.95
          : path === "/免费节点" || path === "/如何选择vpn"
            ? 0.7
            : 0.4,
  }));
}
