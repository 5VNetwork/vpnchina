/** Production origin. Override with NEXT_PUBLIC_SITE_URL. */
export const SITE_ORIGIN =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ??
  "https://www.vpnchina.tech";

export const SITE_NAME = "VPN中国";
export const SITE_TITLE = "VPN中国 - 中国可用的免费VPN推荐";
export const SITE_TAGLINE =
  "面向中国用户、针对中国网络环境优化的免费VPN推荐。UmiVPN 与努努加速器分页介绍。";

export const UPDATED_AT = "2026-09-18";
export const UPDATED_AT_LABEL = "2026年9月18日";

export const PRIMARY_KEYWORDS = [
  "VPN",
  "免费VPN",
  "免费vpn",
  "中国VPN",
  "中国可用VPN",
  "科学上网",
  "UmiVPN",
  "努努加速器",
] as const;
