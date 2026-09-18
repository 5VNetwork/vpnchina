import type { Metadata } from "next";
import Link from "next/link";
import { SITE_NAME } from "@/lib/site";

export const metadata: Metadata = {
  title: "关于本站与披露",
  description: `${SITE_NAME} 由 UmiVPN / 努努加速器相关产品方运营。本页说明推荐范围与利益关系。`,
  alternates: { canonical: "/about" },
};

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6">
      <h1 className="text-3xl font-semibold tracking-tight">关于本站与披露</h1>
      <div className="mt-6 space-y-4 leading-relaxed text-ink/85">
        <p>
          <strong>{SITE_NAME}</strong>
          （www.vpnchina.tech）是中文 VPN 推荐站。我们把产品拆成独立推荐页：
        </p>
        <ul className="list-disc space-y-2 pl-5">
          <li>
            <Link href="/vpn" className="font-medium underline-offset-4 hover:underline">
              /vpn
            </Link>
            ：只推荐 UmiVPN，对应搜索「VPN」
          </li>
          <li>
            <Link href="/免费vpn" className="font-medium underline-offset-4 hover:underline">
              /免费vpn
            </Link>
            ：只推荐努努加速器，对应搜索「免费VPN」
          </li>
        </ul>
        <p>
          本站由相关产品方运营，不会假装「中立测评几十个海外品牌」。两款产品都强调面向中国用户、针对中国网络环境优化。
        </p>
        <p>请遵守你所在地的法律法规，合理合规使用网络工具。本站内容仅供参考。</p>
      </div>
      <p className="mt-8">
        <Link href="/" className="text-sm font-medium underline-offset-4 hover:underline">
          返回首页
        </Link>
      </p>
    </div>
  );
}
