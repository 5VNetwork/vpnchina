import type { Metadata } from "next";
import Link from "next/link";
import {
  PRIMARY_KEYWORDS,
  SITE_ORIGIN,
  SITE_TAGLINE,
  SITE_TITLE,
  UPDATED_AT_LABEL,
} from "@/lib/site";

export const metadata: Metadata = {
  title: {
    absolute: SITE_TITLE,
  },
  description: SITE_TAGLINE,
  keywords: [...PRIMARY_KEYWORDS],
  alternates: { canonical: "/" },
  openGraph: {
    title: SITE_TITLE,
    description: SITE_TAGLINE,
    url: SITE_ORIGIN,
    locale: "zh_CN",
    type: "website",
  },
};

const HOME_FAQS = [
  {
    q: "在中国搜 VPN，为什么很多「全球最佳」不能用？",
    a: "海外评测基于海外网络、海外应用商店和海外付款。中国大陆的网络路径、干扰方式和下载渠道都不同，所以很多国际品牌连不上或很快失效。本站只介绍面向中国用户、针对中国网络优化的产品。",
  },
  {
    q: "「VPN」和「免费VPN」有什么区别？",
    a: "日常搜索里两者经常混用。想找全平台、能当正规 VPN 用的方案，看 UmiVPN 推荐页；想找手机上真正长期免费、不限流量的方案，看努努加速器推荐页。两款产品不在同一页混排。",
  },
  {
    q: "面向中国网络优化是什么意思？",
    a: "指协议、节点和连接方式按国内常见限制做了适配，并且能从国内常用渠道下载（官网或应用商店），而不是把一套海外通用配置原样搬过来。",
  },
];

export default function HomePage() {
  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: HOME_FAQS.map((faq) => ({
      "@type": "Question",
      name: faq.q,
      acceptedAnswer: { "@type": "Answer", text: faq.a },
    })),
  };

  return (
    <div>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />

      <section className="border-b border-line">
        <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6">
          <p className="text-xs font-medium tracking-wide text-brand">
            更新于 {UPDATED_AT_LABEL} · www.vpnchina.tech
          </p>
          <h1 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">
            {SITE_TITLE}
          </h1>
          <p className="mt-5 max-w-2xl text-base leading-relaxed text-muted sm:text-lg">
            在中国大陆搜「VPN」或「免费VPN」，真正要问的是：能不能下载、能不能连上、是不是为中国网络做过优化。
            本站把两款产品分开写推荐页，避免混在一张对比表里——按你的搜索进入对应页面即可。
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-3xl px-4 py-12 sm:px-6">
        <h2 className="text-2xl font-semibold tracking-tight">进入对应推荐页</h2>
        <p className="mt-2 text-sm text-muted">
          每一页只推荐一款产品，方便搜索引擎和读者对上「VPN」或「免费VPN」。
        </p>
        <div className="mt-6 grid gap-4">
          <Link
            href="/vpn"
            className="rounded-2xl border border-line bg-white p-6 transition-colors hover:border-ink/20"
          >
            <p className="text-xs font-medium tracking-wide text-brand">搜 VPN</p>
            <h3 className="mt-2 text-xl font-semibold">UmiVPN 推荐页</h3>
            <p className="mt-2 text-sm leading-relaxed text-muted">
              面向中国用户的全平台免费VPN。电脑和手机都能用，针对国内网络一键直连。
            </p>
          </Link>
          <Link
            href="/免费vpn"
            className="rounded-2xl border border-line bg-white p-6 transition-colors hover:border-ink/20"
          >
            <p className="text-xs font-medium tracking-wide text-brand">搜 免费VPN</p>
            <h3 className="mt-2 text-xl font-semibold">努努加速器推荐页</h3>
            <p className="mt-2 text-sm leading-relaxed text-muted">
              面向中国用户的手机永久免费VPN。不限流量，针对国内网络加速被限制站点。
            </p>
          </Link>
        </div>
      </section>

      <section className="border-y border-line bg-white/60">
        <div className="mx-auto max-w-3xl space-y-4 px-4 py-12 text-base leading-relaxed text-ink/85 sm:px-6">
          <h2 className="text-2xl font-semibold tracking-tight text-ink">
            为什么要强调「中国可用」？
          </h2>
          <p>
            国际 VPN 榜单很少按中国大陆网络来测。节点在海外、协议未做干扰适配，用户搜到的「第一名」往往装不上或连不上。
          </p>
          <p>
            对中国用户更有用的标准是：下载渠道正规、连接针对国内环境优化、说明记不记日志，以及免费档是否真能日常使用。本站推荐的两款产品都按这个标准单独介绍。
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-3xl px-4 py-12 sm:px-6">
        <h2 className="mb-4 text-2xl font-semibold tracking-tight">常见问题</h2>
        <div className="divide-y divide-line rounded-xl border border-line bg-white">
          {HOME_FAQS.map((faq) => (
            <details key={faq.q} className="group px-4 py-3">
              <summary className="cursor-pointer font-medium">{faq.q}</summary>
              <p className="mt-2 text-sm leading-relaxed text-muted">{faq.a}</p>
            </details>
          ))}
        </div>
      </section>
    </div>
  );
}
