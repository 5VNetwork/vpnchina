import type { NextConfig } from "next";
import { initOpenNextCloudflareForDev } from "@opennextjs/cloudflare";

/**
 * Chinese keyword URLs stay in the address bar.
 * Latin aliases 301 to the canonical Chinese / English paths.
 */
const nextConfig: NextConfig = {
  poweredByHeader: false,
  images: {
    formats: ["image/webp", "image/avif"],
    dangerouslyAllowSVG: true,
  },
  async rewrites() {
    return [
      {
        source: "/免费vpn",
        destination: "/free-vpn",
      },
      {
        source: "/%E5%85%8D%E8%B4%B9vpn",
        destination: "/free-vpn",
      },
    ];
  },
  async redirects() {
    return [
      { source: "/free-vpn", destination: "/免费vpn", permanent: true },
      { source: "/umivpn", destination: "/vpn", permanent: true },
      { source: "/nunu", destination: "/免费vpn", permanent: true },
      { source: "/免费VPN", destination: "/免费vpn", permanent: true },
      { source: "/中国vpn", destination: "/vpn", permanent: true },
      { source: "/中国VPN", destination: "/vpn", permanent: true },
      { source: "/免费梯子", destination: "/免费vpn", permanent: true },
    ];
  },
};

export default nextConfig;

initOpenNextCloudflareForDev();
