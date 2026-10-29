import type { Metadata } from "next";
import Link from "next/link";
import { SITE_NAME, UPDATED_AT_LABEL } from "@/lib/site";

export const metadata: Metadata = {
  title: "服务条款",
  description: `${SITE_NAME} 服务条款，含第三方广告免责声明。`,
  alternates: { canonical: "/terms" },
};

const SECTIONS: {
  id: string;
  heading: string;
  paragraphs: string[];
  list?: string[];
}[] = [
  {
    id: "overview",
    heading: "1. 服务概述",
    paragraphs: [
      `${SITE_NAME}（www.vpnchina.tech）是面向中国用户的内容型网站，提供 VPN / 免费VPN 产品推荐，以及免费节点与订阅分享等信息，仅供学习与技术交流参考。`,
    ],
  },
  {
    id: "acceptance",
    heading: "2. 接受条款",
    paragraphs: [
      "当你访问或使用本站，即视为你已阅读、理解并同意本服务条款。若不同意，请停止使用本站。",
    ],
  },
  {
    id: "responsibilities",
    heading: "3. 你的责任",
    paragraphs: ["使用本站时，你同意："],
    list: [
      "遵守你所在地的法律法规，合理合规使用网络工具。",
      "不将本站提供的节点、订阅链接或相关配置用于违法用途，也不向他人传播。",
      "不对本站进行攻击、滥用、干扰或未经授权的自动化抓取。",
      "自行判断第三方产品、客户端与广告内容的风险。",
    ],
  },
  {
    id: "limitations",
    heading: "4. 服务的局限性",
    paragraphs: [
      "免费节点的速度、稳定性与可用性会随时间、人数与线路变化，我们无法保证持续可用或固定速度。",
      "本站推荐页上的产品信息可能随官方调整而变化；下载、注册、付款与使用以对方官网或应用商店规则为准。",
      "本站内容按「现状」提供，不对特定用途作出明示或暗示保证。",
    ],
  },
  {
    id: "ads",
    heading: "5. 第三方广告免责声明",
    paragraphs: [
      "本站部分页面（例如免费节点页）可能展示由第三方广告网络投放的广告，包括但不限于横幅、跳转与弹窗广告。广告收入有助于我们持续提供免费节点等相关服务。",
      "这些广告由第三方提供，我们无法审核或控制广告内容，也不对任何广告或所宣传的产品或服务的内容、准确性、合法性或安全性作出认可、保证或承担任何责任。",
      "你与广告主之间的互动，包括任何购买、下载、短信、付款或信息交换，均仅发生在你与广告主之间。对于因广告内容或你与广告主的往来而产生或与之相关的任何损失或损害，我们概不负责。",
      "请保持警惕：不要发送短信、不要输入敏感信息或支付信息。你在本站内遇到的弹窗，均应视为弹窗广告，而非本站官方业务弹窗。",
    ],
  },
  {
    id: "liability",
    heading: "6. 责任限制",
    paragraphs: [
      "在适用法律允许的最大范围内，因使用或无法使用本站内容、免费节点、推荐产品或第三方广告而引起的任何直接、间接、偶然、特殊或后果性损失，我们均不承担责任。",
    ],
  },
  {
    id: "changes",
    heading: "7. 条款变更",
    paragraphs: [
      "我们可能不时修改本条款。更新后将在本页公布；继续使用本站即视为接受更新后的条款。",
    ],
  },
  {
    id: "related",
    heading: "8. 相关说明",
    paragraphs: [
      "更多站点背景与利益关系说明，请见关于页；隐私相关说明请见隐私政策。",
    ],
  },
];

export default function TermsPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6">
      <h1 className="text-3xl font-semibold tracking-tight">服务条款</h1>
      <p className="mt-2 text-sm text-muted">更新于 {UPDATED_AT_LABEL}</p>

      <div className="mt-6 space-y-8 leading-relaxed text-ink/85">
        <p>
          欢迎使用 {SITE_NAME}
          。本服务条款说明你使用本站时应了解的权利、义务与限制，尤其是第三方广告相关事项。
        </p>

        {SECTIONS.map((section) => (
          <section
            key={section.id}
            id={section.id}
            aria-labelledby={`terms-${section.id}`}
          >
            <h2
              id={`terms-${section.id}`}
              className="text-xl font-semibold tracking-tight text-ink"
            >
              {section.heading}
            </h2>
            <div className="mt-3 space-y-3">
              {section.paragraphs.map((p) => (
                <p key={p}>{p}</p>
              ))}
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
          <Link href="/privacy" className="underline-offset-4 hover:underline">
            隐私政策
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
