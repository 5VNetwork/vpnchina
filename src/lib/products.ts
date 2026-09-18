export type ProductId = "umivpn" | "nunu";

export type Product = {
  id: ProductId;
  name: string;
  path: string;
  icon: string;
  badge: string;
  tagline: string;
  priceLabel: string;
  platforms: string[];
  chinaUsable: string;
  logs: string;
  traffic: string;
  devices: string;
  protocol: string;
  highlights: string[];
  caveats: string[];
  ctaLabel: string;
  url: string;
};

export const PRODUCTS: Record<ProductId, Product> = {
  umivpn: {
    id: "umivpn",
    name: "UmiVPN",
    path: "/vpn",
    icon: "/products/umivpn.svg",
    badge: "全平台免费VPN",
    tagline:
      "专为中国用户打造的免费VPN：针对国内网络优化，一键直连，覆盖 Windows / macOS / iOS / Android。",
    priceLabel: "免费套餐可用 · 可选付费（约 14 元/月，105 元/年）",
    platforms: ["Windows", "macOS", "iOS", "Android"],
    chinaUsable: "针对中国大陆网络环境优化，一键连接",
    logs: "无日志",
    traffic:
      "免费套餐每月 3GB（ChatGPT / Gemini / Claude 等 AI 站点免计量）；付费套餐不限量",
    devices: "免费套餐最多 3 台同时在线；付费套餐最多 5 台",
    protocol: "通用与专有协议，适配复杂网络",
    highlights: [
      "为中国用户与中国网络优化，适配中国网络环境",
      "电脑和手机都能用",
      "无日志政策，开源 VX 内核",
      "App Store / Google Play / Microsoft Store 可下载",
      "常用 AI 站点流量不计入免费额度",
      "支持自定义分流与地区选择",
    ],
    caveats: [
      "非顶级 BGP/CN2 线路，但面向国内网络调优、性价比高",
      "免费档同时在线设备有限；付费档最多 5 台",
      "不支持种子下载",
    ],
    ctaLabel: "前往 UmiVPN 官网",
    url: "https://www.umivpn.net",
  },
  nunu: {
    id: "nunu",
    name: "努努加速器",
    path: "/免费vpn",
    icon: "/products/nunu.png",
    badge: "手机永久免费",
    tagline:
      "为中国手机用户准备的永久免费VPN：不限流量、不设付费墙，针对国内网络一键加速被限制站点。",
    priceLabel: "¥0 · 永久免费（广告维持运营）",
    platforms: ["iOS", "Android"],
    chinaUsable: "针对中国大陆手机网络优化，一键加速被限制站点",
    logs: "不记录浏览历史",
    traffic: "不限流量、不限速",
    devices: "手机（iOS / Android），不限制设备数量",
    protocol: "通用与专有协议，适配复杂网络",
    highlights: [
      "为中国用户优化，默认只加速无法访问的站点",
      "永久免费、不限流量，没有试用到期",
      "开源核心，App Store / Google Play 双端上架",
      "一键连接，适合日常浏览与海外内容",
      "不限制登录设备数量",
    ],
    caveats: [
      "不支持桌面端；电脑请看 UmiVPN 推荐页",
      "通过广告维持免费",
      "单次连接约 30 分钟至 3 小时（可看广告延长；轻度使用往往更久）",
      "不支持自定义分流与种子下载",
    ],
    ctaLabel: "前往 努努加速器官网",
    url: "https://www.nunu.monster",
  },
};

export function getProduct(id: ProductId): Product {
  return PRODUCTS[id];
}
