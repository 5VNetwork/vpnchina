import Image from "next/image";
import Link from "next/link";
import { LinkedText } from "@/components/linked-text";
import type { ProductPage } from "@/lib/pages";
import type { Product } from "@/lib/products";
import { SITE_NAME, SITE_ORIGIN } from "@/lib/site";

export function ProductRecommend({
  page,
  product,
}: {
  page: ProductPage;
  product: Product;
}) {
  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: page.faqs.map((faq) => ({
      "@type": "Question",
      name: faq.q,
      acceptedAnswer: { "@type": "Answer", text: faq.a },
    })),
  };
  const productJsonLd = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: product.name,
    applicationCategory: "UtilitiesApplication",
    operatingSystem: product.platforms.join(", "),
    url: product.url,
    description: page.description,
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "CNY",
    },
    publisher: {
      "@type": "Organization",
      name: SITE_NAME,
      url: SITE_ORIGIN,
    },
  };

  const specs = [
    ["价格", product.priceLabel],
    ["平台", product.platforms.join(" / ")],
    ["中国网络", product.chinaUsable],
    ["流量", product.traffic],
    ["日志", product.logs],
    ["设备", product.devices],
  ] as const;

  return (
    <article className="mx-auto max-w-3xl px-4 py-12 sm:px-6">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productJsonLd) }}
      />

      <nav className="text-sm text-muted">
        <Link href="/" className="hover:text-ink">
          首页
        </Link>
        <span className="mx-2">/</span>
        <span className="text-ink">{page.breadcrumb}</span>
      </nav>

      <p className="mt-6 text-xs font-medium tracking-wide text-brand">
        更新于 {page.updatedLabel} · 本页只推荐 {product.name}
      </p>
      <div className="mt-3 flex items-start gap-4">
        <Image
          src={product.icon}
          alt={`${product.name} 图标`}
          width={64}
          height={64}
          className="h-16 w-16 shrink-0 object-contain"
        />
        <div>
          <h1 className="text-3xl font-semibold tracking-tight">{page.h1}</h1>
          <p className="mt-3 text-base leading-relaxed text-muted">{product.tagline}</p>
        </div>
      </div>

      <p className="mt-8">
        <a
          href={product.url}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex h-11 items-center rounded-lg bg-brand px-5 text-sm font-semibold text-paper hover:bg-brand-dark"
        >
          {product.ctaLabel}
        </a>
      </p>

      <div className="mt-10 space-y-4 text-base leading-relaxed text-ink/85">
        {page.intro.map((paragraph) => (
          <p key={paragraph.slice(0, 24)}>
            <LinkedText text={paragraph} />
          </p>
        ))}
      </div>

      <section className="mt-10 rounded-2xl border border-line bg-white p-5">
        <h2 className="text-lg font-semibold">关键信息</h2>
        <dl className="mt-4 grid gap-4 text-sm sm:grid-cols-2">
          {specs.map(([label, value]) => (
            <div key={label}>
              <dt className="text-muted">{label}</dt>
              <dd className="mt-1 font-medium">{value}</dd>
            </div>
          ))}
        </dl>
      </section>

      <section className="mt-10">
        <h2 className="text-xl font-semibold">特点</h2>
        <ul className="mt-3 list-disc space-y-2 pl-5 text-ink/85">
          {product.highlights.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </section>

      <section className="mt-10">
        <h2 className="text-xl font-semibold">适合谁</h2>
        <ul className="mt-3 list-disc space-y-2 pl-5 text-ink/85">
          {page.suitable.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </section>

      {page.sections.map((section) => (
        <section key={section.id} id={section.id} className="mt-10">
          <h2 className="text-xl font-semibold">{section.heading}</h2>
          <div className="mt-4 space-y-4 leading-relaxed text-ink/85">
            {section.body.map((paragraph) => (
              <p key={paragraph.slice(0, 28)}>
                <LinkedText text={paragraph} />
              </p>
            ))}
          </div>
        </section>
      ))}

      <section className="mt-10">
        <h2 className="text-xl font-semibold">使用注意</h2>
        <ul className="mt-3 list-disc space-y-2 pl-5 text-ink/85">
          {product.caveats.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </section>

      <section className="mt-10">
        <h2 className="mb-4 text-xl font-semibold">常见问题</h2>
        <div className="divide-y divide-line rounded-xl border border-line bg-white">
          {page.faqs.map((faq) => (
            <details key={faq.q} className="group px-4 py-3">
              <summary className="cursor-pointer font-medium">{faq.q}</summary>
              <p className="mt-2 text-sm leading-relaxed text-muted">{faq.a}</p>
            </details>
          ))}
        </div>
      </section>

      <p className="mt-10">
        <a
          href={product.url}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex h-11 items-center rounded-lg bg-brand px-5 text-sm font-semibold text-paper hover:bg-brand-dark"
        >
          {product.ctaLabel}
        </a>
      </p>

      <p className="mt-12 text-sm text-muted">
        {page.otherPage.hint}{" "}
        <Link href={page.otherPage.href} className="font-medium text-ink underline-offset-4 hover:underline">
          {page.otherPage.label}
        </Link>
      </p>
    </article>
  );
}
