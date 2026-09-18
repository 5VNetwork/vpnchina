import { getProduct, type Product, type ProductId } from "@/lib/products";
import { UPDATED_AT, UPDATED_AT_LABEL } from "@/lib/site";

export type ProductPage = {
  productId: ProductId;
  path: string;
  title: string;
  description: string;
  keywords: string[];
  h1: string;
  breadcrumb: string;
  updatedLabel: string;
  updatedIso: string;
  intro: string[];
  sections: { id: string; heading: string; body: string[] }[];
  suitable: string[];
  faqs: { q: string; a: string }[];
  otherPage: { href: string; label: string; hint: string };
};

export const UMIVPN_PAGE: ProductPage = {
  productId: "umivpn",
  path: "/vpn",
  title: "UmiVPN - 中国可用VPN推荐｜面向中国网络优化的免费VPN",
  description:
    "UmiVPN 是面向中国用户、针对中国网络环境优化的免费VPN。支持 Windows、macOS、iOS、Android，无日志、开源内核，适合在国内使用 VPN、访问海外 AI 与日常科学上网。",
  keywords: [
    "VPN",
    "免费VPN",
    "中国VPN",
    "中国可用VPN",
    "UmiVPN",
    "科学上网",
    "全平台VPN",
  ],
  h1: "UmiVPN：面向中国用户的免费VPN",
  breadcrumb: "UmiVPN",
  updatedLabel: UPDATED_AT_LABEL,
  updatedIso: UPDATED_AT,
  intro: [
    "搜「VPN」时，海外评测里的品牌在中国大陆经常连不上、不好下载、也不好付款。UmiVPN 按中国网络环境做连接与协议优化，让国内用户能真正连上。",
    "它是全平台免费VPN：Windows、macOS、iOS、Android 都有客户端，已上架主流应用商店。免费套餐每月 3GB；ChatGPT、Gemini、Claude 等常用 AI 站点免计量，不占用这 3GB。需要不限流量时，可升级付费套餐（约 14 元/月或 105 元/年）。",
    "官网：[https://www.umivpn.net](https://www.umivpn.net)。本页只推荐 UmiVPN。",
  ],
  sections: [
    {
      id: "china-network",
      heading: "为什么 UmiVPN 适合中国网络？",
      body: [
        "中国大陆的网络路径、干扰方式和应用分发渠道，都和海外评测环境不同。很多「全球最佳 VPN」在国内无法完成握手，或很快失效。",
        "UmiVPN 针对受限网络做一键直连与协议适配，安装后选择节点即可用，不必自己找订阅或改配置。内核来自开源 VX，便于核对安全性。",
      ],
    },
    {
      id: "who",
      heading: "谁适合用 UmiVPN？",
      body: [
        "需要电脑和手机都能用同一套免费VPN的用户。",
        "主要访问海外 AI、搜索与网页，希望免费档就够日常轻度使用的人。",
        "需要自定义分流、指定网站走代理的用户。",
      ],
    },
    {
      id: "download",
      heading: "怎么下载与开始用？",
      body: [
        "打开 [umivpn.com](https://www.umivpn.com)，按系统下载，或在 App Store、Google Play、Microsoft Store 搜索 UmiVPN。",
        "注册即可使用免费套餐，无需信用卡。请从官网或应用商店下载，避免来路不明的安装包。",
      ],
    },
  ],
  suitable: [
    "在中国大陆寻找能连上的 VPN / 免费VPN",
    "Windows / Mac 电脑用户，或电脑+手机都要用",
    "常用 ChatGPT、Gemini、Claude，希望 AI 流量免计量",
    "需要分流规则，而不是只加速被墙站点",
  ],
  faqs: [
    {
      q: "UmiVPN 在中国能当 VPN 用吗？",
      a: "可以。UmiVPN 面向中国用户和中国网络环境优化，一键连接，适合作为国内能用的免费VPN。实际速度以你当地网络实测为准。",
    },
    {
      q: "免费VPN每月 3GB 够不够？",
      a: "轻度查资料、用海外 AI、偶尔看视频，通常够用。ChatGPT、Gemini、Claude 等列表内 AI 站点不计入 3GB。长时间高清视频更容易用完非 AI 流量，那时可升级不限量套餐。",
    },
    {
      q: "UmiVPN 安全吗？",
      a: "无日志政策，开源内核，并上架主流应用商店。请遵守所在地法律法规使用。",
    },
  ],
  otherPage: {
    href: "/免费vpn",
    label: "努努加速器推荐页",
    hint: "主要用手机、希望永久免费不限流量，请看另一页。",
  },
};

export const NUNU_PAGE: ProductPage = {
  productId: "nunu",
  path: "/免费vpn",
  title: "努努加速器 - 免费VPN推荐｜中国可用的手机永久免费VPN",
  description:
    "努努加速器是面向中国用户的免费VPN：iOS / Android 永久免费、不限流量，针对中国网络加速被限制站点。已上架 App Store 与 Google Play。",
  keywords: [
    "免费VPN",
    "免费vpn",
    "手机VPN",
    "永久免费VPN",
    "中国可用VPN",
    "努努加速器",
    "免费梯子",
  ],
  h1: "努努加速器：中国可用的免费VPN",
  breadcrumb: "努努加速器",
  updatedLabel: UPDATED_AT_LABEL,
  updatedIso: UPDATED_AT,
  intro: [
    "搜「免费VPN」时，最怕试用到期、流量封顶或突然收费。努努加速器面向中国手机用户：承诺永不向用户收费、不按流量计费，用广告维持运营。",
    "它针对国内网络做加速，默认不是全局代理——只走无法访问的站点，更符合多数人的手机上网习惯。支持 iOS 与 Android，已上架 App Store 与 Google Play。",
    "官网：[https://www.nunu.monster](https://www.nunu.monster)。本页只推荐努努加速器。",
  ],
  sections: [
    {
      id: "china-network",
      heading: "为什么努努适合中国用户？",
      body: [
        "很多海外免费VPN在中国连不上，或只能用几天。努努加速器按国内手机网络环境优化连接，一键加速被限制的网站与应用。",
        "因为它不是全局 VPN，日常国内 App 不必全部绕行海外，延迟和耗电通常更友好。",
      ],
    },
    {
      id: "who",
      heading: "谁适合用努努加速器？",
      body: [
        "主要用手机、预算为 0、想找长期免费VPN 的用户。",
        "只想打开被限制网站，不需要自己写分流规则的人。",
        "希望从 App Store / Google Play 正规下载的人。",
      ],
    },
    {
      id: "download",
      heading: "怎么下载？",
      body: [
        "在 App Store 或 Google Play 搜索「努努加速器」，或打开 [nunu.monster](https://www.nunu.monster) 按指引安装。",
        "单次连接大约持续 30 分钟到 3 小时，可观看广告延长；轻度使用时往往更久。请走官网或应用商店。",
      ],
    },
  ],
  suitable: [
    "在中国大陆搜「免费VPN」、希望真正长期免费",
    "iPhone / Android 用户，不需要电脑客户端",
    "不限流量的日常浏览与视频",
    "只想加速无法访问的站点，而不是全局代理",
  ],
  faqs: [
    {
      q: "努努加速器是免费VPN吗？",
      a: "是。永久免费、不限流量，定位就是给中国用户用的手机免费VPN / 网络加速器。",
    },
    {
      q: "在中国网络下能连上吗？",
      a: "努努针对国内网络优化，一键连接被限制站点。稳不稳以你本机实测为准，请从应用商店下载官方版本。",
    },
    {
      q: "为什么可以永久免费？",
      a: "通过应用内广告维持运营，不设付费墙。需要警惕来路不明、强制索权、无隐私政策的「永久免费」软件。",
    },
  ],
  otherPage: {
    href: "/vpn",
    label: "UmiVPN 推荐页",
    hint: "电脑也要用、或需要分流与全平台客户端，请看另一页。",
  },
};

export function getProductPage(id: ProductId): {
  page: ProductPage;
  product: Product;
} {
  const page = id === "umivpn" ? UMIVPN_PAGE : NUNU_PAGE;
  return { page, product: getProduct(id) };
}
