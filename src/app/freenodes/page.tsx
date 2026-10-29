import type { Metadata } from "next";
import Link from "next/link";
import { AdsNoticeBanner } from "@/components/freenodes/AdsNoticeBanner";
import { FreeNodesContent } from "@/components/freenodes/FreeNodesContent";
import { SITE_NAME, SITE_ORIGIN, UPDATED_AT_LABEL } from "@/lib/site";

const PATH = "/免费节点";

const FAQS = [
  {
    q: "免费节点安全吗？",
    a: "可以放心使用。本页分享的免费节点不记录你的流量，并采用业界标准的 TLS 加密。",
  },
  {
    q: "什么是 VX？",
    a: "VX 是一款免费、完全开源的多平台代理客户端。本页节点均在 VX 中测试可用；其他客户端不一定能正常使用。",
  },
] as const;

export const metadata: Metadata = {
  title: "免费节点分享 - 免费VPN",
  description:
    "免费VPN与免费节点分享：登录后获取订阅链接与节点列表，可一键导入 VX 客户端。仅供学习与交流网络技术使用。",
  keywords: [
    "免费节点",
    "节点分享",
    "VX",
    "努努加速器",
    "免费VPN",
    "订阅链接",
    "科学上网",
    "免费VPN节点",
  ],
  alternates: { canonical: PATH },
  openGraph: {
    title: "免费节点｜VX 订阅与节点分享",
    description: `登录获取免费节点与订阅链接，支持导入 VX。由 ${SITE_NAME} 提供。`,
    url: `${SITE_ORIGIN}${PATH}`,
    locale: "zh_CN",
    type: "article",
  },
};

export default function FreeNodesPage() {
  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: FAQS.map((faq) => ({
      "@type": "Question",
      name: faq.q,
      acceptedAnswer: { "@type": "Answer", text: faq.a },
    })),
  };

  return (
    <article className="mx-auto max-w-3xl px-4 py-12 sm:px-6">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />

      <nav className="text-sm text-muted">
        <Link href="/" className="hover:text-ink">
          首页
        </Link>
        <span className="mx-2">/</span>
        <span className="text-ink">免费节点</span>
      </nav>

      <h1 className="mt-6 text-3xl font-semibold tracking-tight">免费节点</h1>
      <p className="mt-2 text-sm text-muted">更新于 {UPDATED_AT_LABEL}</p>

      <div className="mt-6">
        <AdsNoticeBanner />
      </div>

      <div className="mt-6 space-y-4 leading-relaxed text-ink/85">
        <p>
          本页提供面向中国用户整理的<strong>免费节点</strong>
          与订阅链接，可配合 VX
          等代理客户端使用。节点资源有限，速度与可用性会随时间变化；需要更快速或稳定体验时可参考本站的{" "}
          <Link href="/vpn" className="underline-offset-4 hover:underline">
            UmiVPN
          </Link>{" "}
          或{" "}
          <Link href="/免费vpn" className="underline-offset-4 hover:underline">
            努努加速器
          </Link>{" "}
          推荐页。
        </p>
        <p>
          查看与复制节点需要邮箱验证码登录。登录后可复制订阅链接、复制节点、显示二维码，或通过「直接导入客户端」唤起
          VX。请遵守当地法律法规，仅将内容用于学习与技术交流。
        </p>
      </div>

      <div className="mt-10">
        <FreeNodesContent />
      </div>

      <section className="mt-12" aria-labelledby="freenodes-faq-title">
        <h2
          id="freenodes-faq-title"
          className="mb-4 text-2xl font-semibold tracking-tight"
        >
          常见问题
        </h2>
        <div className="divide-y divide-line rounded-xl border border-line bg-white">
          {FAQS.map((faq) => (
            <details key={faq.q} className="group px-4 py-3">
              <summary className="cursor-pointer font-medium">{faq.q}</summary>
              <p className="mt-2 text-sm leading-relaxed text-muted">{faq.a}</p>
            </details>
          ))}
        </div>
      </section>
    </article>
  );
}
