import type { Metadata } from "next";
import { SITE_NAME } from "@/lib/site";

export const metadata: Metadata = {
  title: "隐私政策",
  description: `${SITE_NAME} 站点隐私政策说明。`,
  alternates: { canonical: "/privacy" },
};

export default function PrivacyPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6">
      <h1 className="text-3xl font-semibold tracking-tight">隐私政策</h1>
      <div className="mt-6 space-y-4 leading-relaxed text-ink/85">
        <p>
          本站（{SITE_NAME}
          ）是内容型推荐网站。我们可能使用基础访问统计以改进内容，不会出售你的个人浏览数据。
        </p>
        <p>
          当你点击前往 UmiVPN 或 努努加速器 官网 / 应用商店时，将适用对方站点或商店的隐私政策。
        </p>
      </div>
    </div>
  );
}
