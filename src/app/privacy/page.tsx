import type { Metadata } from "next";
import Link from "next/link";
import { SITE_NAME, UPDATED_AT_LABEL } from "@/lib/site";

export const metadata: Metadata = {
  title: "隐私政策",
  description: `${SITE_NAME} 隐私政策：未登录不收集个人数据；登录时仅收集邮箱用于身份验证。`,
  alternates: { canonical: "/privacy" },
};

const SECTIONS: {
  id: string;
  heading: string;
  paragraphs: string[];
  list?: string[];
}[] = [
  {
    id: "scope",
    heading: "1. 适用范围",
    paragraphs: [
      `本隐私政策适用于您访问与使用 ${SITE_NAME}（www.vpnchina.tech，以下简称「本站」）的行为。本站提供 VPN / 免费VPN 产品推荐，以及免费节点与订阅分享等内容。`,
      "请您在使用本站前仔细阅读本政策。继续使用本站，即表示您知悉并同意本政策所述内容。",
    ],
  },
  {
    id: "no-login",
    heading: "2. 未登录时的数据处理",
    paragraphs: [
      "在您未登录的情况下，本站不收集您的个人数据。",
    ],
  },
  {
    id: "login",
    heading: "3. 登录时收集的信息",
    paragraphs: [
      "当您使用免费节点等需要登录的功能时，本站将通过电子邮件验证码完成身份验证。为此，我们会收集并处理您主动提供的电子邮件地址，且仅用于以下目的：",
    ],
    list: [
      "发送登录验证码并进行身份验证；",
      "维护登录会话与账号相关安全；",
      "在必要时就账号或服务相关事项与您联系。",
    ],
  },
  {
    id: "use",
    heading: "4. 信息的使用与保存",
    paragraphs: [
      "除本政策载明的目的外，我们不会将您的电子邮件地址用于无关的营销推送，亦不会出售您的个人数据。",
      "身份验证及相关数据可能由我们使用的第三方身份认证与后端服务（例如 Supabase）代表我们进行处理与存储。该等处理仅服务于本站登录与免费节点等功能的提供。",
    ],
  },
  {
    id: "third-party",
    heading: "5. 第三方网站与广告",
    paragraphs: [
      "当您点击前往 UmiVPN、努努加速器或其他第三方官网、应用商店时，将适用该等第三方各自的隐私政策与数据处理规则，本站不对其行为负责。",
      "本站部分页面可能展示第三方广告网络投放的广告。广告服务商可能依据其自身政策收集或处理与广告展示相关的数据。",
    ],
  },
  {
    id: "security",
    heading: "6. 安全措施",
    paragraphs: [
      "我们采取合理的技术与管理措施，保护所处理的数据，防止未经授权的访问、披露、篡改或毁损。但请理解，互联网传输与存储无法保证绝对安全。",
    ],
  },
  {
    id: "rights",
    heading: "7. 您的选择",
    paragraphs: [
      "您可以选择不登录本站；在此情况下，您仍可浏览公开推荐内容，但无法使用需登录的免费节点等功能。",
      "如您希望就账号或邮箱相关事宜提出询问，可通过本站「关于」页所载渠道与我们联系。",
    ],
  },
  {
    id: "changes",
    heading: "8. 政策更新",
    paragraphs: [
      "我们可能不时更新本隐私政策。更新后的版本将在本页公布，并注明更新日期。请您定期查阅。在变更生效后继续使用本站，即视为您知悉更新后的政策。",
    ],
  },
];

export default function PrivacyPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6">
      <h1 className="text-3xl font-semibold tracking-tight">隐私政策</h1>
      <p className="mt-2 text-sm text-muted">更新于 {UPDATED_AT_LABEL}</p>

      <div className="mt-6 space-y-8 leading-relaxed text-ink/85">
        <p>
          本政策旨在以清晰、正式的方式说明 {SITE_NAME}{" "}
          如何处理与您相关的信息，尤其是未登录与登录两种情形下的区别。
        </p>

        {SECTIONS.map((section) => (
          <section
            key={section.id}
            id={section.id}
            aria-labelledby={`privacy-${section.id}`}
          >
            <h2
              id={`privacy-${section.id}`}
              className="text-xl font-semibold tracking-tight text-ink"
            >
              {section.heading}
            </h2>
            <div className="mt-3 space-y-3">
              {section.paragraphs.map((p) => (
                <p key={p}>{p}</p>
              ))}
              {section.id === "third-party" ? (
                <p>
                  有关广告风险与免责说明，请另行参阅{" "}
                  <Link
                    href="/terms#ads"
                    className="underline-offset-4 hover:underline"
                  >
                    服务条款中的第三方广告免责声明
                  </Link>
                  。
                </p>
              ) : null}
              {section.list ? (
                <ul className="list-disc space-y-2 pl-5">
                  {section.list.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              ) : null}
            </div>
          </section>
        ))}

        <p className="text-sm text-muted">
          另见{" "}
          <Link href="/terms" className="underline-offset-4 hover:underline">
            服务条款
          </Link>{" "}
          与{" "}
          <Link href="/about" className="underline-offset-4 hover:underline">
            关于与披露
          </Link>
          。
        </p>
      </div>
    </div>
  );
}
