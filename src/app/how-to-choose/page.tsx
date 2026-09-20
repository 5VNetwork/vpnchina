import type { Metadata } from "next";
import Link from "next/link";
import { SITE_NAME, SITE_ORIGIN, UPDATED_AT_LABEL } from "@/lib/site";

const PATH = "/如何选择vpn";

export const metadata: Metadata = {
  title: "如何选择VPN｜中国用户选购指南",
  description:
    "在中国大陆怎么选 VPN：优先应用商店上架、经营年限、部分开源、可试用、宣传诚实、隐私政策清晰。避免夸大宣传与来路不明的安装包。",
  keywords: [
    "如何选择VPN",
    "怎么选VPN",
    "中国VPN",
    "VPN选购",
    "免费VPN",
    "安全VPN",
  ],
  alternates: { canonical: PATH },
  openGraph: {
    title: "如何选择VPN｜中国用户选购指南",
    description: `在中国大陆挑选 VPN 的实用标准。由 ${SITE_NAME} 整理。`,
    url: `${SITE_ORIGIN}${PATH}`,
    locale: "zh_CN",
    type: "article",
  },
};

const CRITERIA = [
  {
    id: "store",
    title: "优先选择应用商店上架的 VPN",
    body: [
      "App Store、Google Play、Microsoft Store 等会对上架应用做基础审核。商店渠道不等于绝对安全，但比来路不明的安装包、群文件或网盘包可靠得多。",
      "正规下载渠道本身就是筛选条件：能稳定上架、持续更新的产品，通常比只靠私链分发的「神秘客户端」更值得优先考虑。",
    ],
  },
  {
    id: "longevity",
    title: "优先选择经营多年的产品",
    body: [
      "VPN 服务依赖持续运维：节点、协议适配、客服与账号体系都需要长期投入。一夜之间冒出的品牌，更容易在收费后失联，或很快失效。",
      "能存在多年、仍在更新客户端与隐私说明的产品，至少说明它经受过一段时间的市场与网络环境考验。",
    ],
  },
  {
    id: "opensource",
    title: "优先选择至少部分开源的产品",
    body: [
      "目前几乎没有 VPN 应用会把全部客户端与服务端代码完全开源。更现实的标准是：核心内核、协议实现或关键模块是否公开，便于安全研究者与用户核对。",
      "许多市面 VPN 实际套用同一套模板，提供方甚至未必清楚自己在分发什么代码。对用户来说，能公开部分源码、说明技术栈的产品，比完全黑盒更值得信任。",
    ],
  },
  {
    id: "trial",
    title: "优先选择提供试用的产品",
    body: [
      "中国大陆的网络环境与海外不同，同一款 VPN 在不同地区、运营商下表现差异很大。很多产品宣传「全球可用」，到国内却连不上或极不稳定。",
      "先试用再付费，能用你自己的网络验证：能不能下载、能不能连上、速度是否可接受。无法试用、只能先付款的方案风险更高。",
    ],
  },
  {
    id: "honesty",
    title: "避开夸大宣传、不诚实的产品",
    body: [
      "常见夸张话术包括：「军事级加密」「永远不会被封锁」「全球最快」「100% 隐身」等。技术能力可以说明，但过度承诺往往是不诚实的营销。",
      "更可靠的产品会写清局限：免费额度多少、哪些平台支持、在中国网络下的定位是什么，而不是用绝对化口号掩盖不确定性。",
    ],
  },
  {
    id: "privacy",
    title: "选择隐私政策清晰的产品",
    body: [
      "隐私政策应能说清：记不记连接日志、日志保留多久、数据是否出售或共享、公司主体大致在哪。找不到政策、或全文空话堆砌的产品，应降低信任。",
      "政策写得好不等于一定做到，但这是最低门槛——愿意公开承诺的提供方，至少比完全不说明的更容易被监督。",
    ],
  },
];

export default function HowToChoosePage() {
  return (
    <div>
      <section className="border-b border-line">
        <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6">
          <p className="text-xs font-medium tracking-wide text-brand">
            更新于 {UPDATED_AT_LABEL} · 选购指南
          </p>
          <h1 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">
            在中国怎么选择 VPN
          </h1>
          <p className="mt-5 max-w-2xl text-base leading-relaxed text-muted sm:text-lg">
            海外榜单很少按中国大陆网络来测。选 VPN 时，更实用的标准是：能不能正规下载、能不能在你的网络下连上、提供方是否诚实、隐私说明是否清楚。
            下面六条是筛选时可以逐项对照的清单。
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-3xl px-4 py-12 sm:px-6">
        <ol className="space-y-10">
          {CRITERIA.map((item, index) => (
            <li key={item.id} id={item.id} className="scroll-mt-20">
              <p className="text-xs font-medium tracking-wide text-brand">
                第 {index + 1} 条
              </p>
              <h2 className="mt-2 text-xl font-semibold tracking-tight sm:text-2xl">
                {item.title}
              </h2>
              <div className="mt-3 space-y-3 text-base leading-relaxed text-ink/85">
                {item.body.map((paragraph) => (
                  <p key={paragraph.slice(0, 24)}>{paragraph}</p>
                ))}
              </div>
            </li>
          ))}
        </ol>
      </section>

      <section className="border-y border-line bg-white/60">
        <div className="mx-auto max-w-3xl space-y-4 px-4 py-12 text-base leading-relaxed text-ink/85 sm:px-6">
          <h2 className="text-2xl font-semibold tracking-tight text-ink">
            用这六条怎么落地？
          </h2>
          <p>
            不必一次找「完美」产品。先排除：只能私链下载、无法试用、宣传绝对化、找不到隐私政策的选项。
            再在剩余产品里，用你自己的设备实测连接与速度。
          </p>
          <p>
            本站按上述思路，分别介绍两款面向中国用户的产品：全平台看{" "}
            <Link href="/vpn" className="font-medium underline-offset-4 hover:underline">
              UmiVPN 推荐页
            </Link>
            ；手机永久免费看{" "}
            <Link
              href="/免费vpn"
              className="font-medium underline-offset-4 hover:underline"
            >
              努努加速器推荐页
            </Link>
            。请遵守所在地法律法规使用。
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-3xl px-4 py-12 sm:px-6">
        <div className="flex flex-wrap gap-4 text-sm">
          <Link href="/" className="font-medium underline-offset-4 hover:underline">
            返回首页
          </Link>
          <Link href="/about" className="text-muted underline-offset-4 hover:underline">
            关于与披露
          </Link>
        </div>
      </section>
    </div>
  );
}
