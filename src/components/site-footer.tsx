import Link from "next/link";
import { SITE_NAME, SITE_TAGLINE } from "@/lib/site";

export function SiteFooter() {
  return (
    <footer className="mt-auto border-t border-line">
      <div className="mx-auto grid max-w-3xl gap-8 px-4 py-10 text-sm sm:grid-cols-2 sm:px-6">
        <div>
          <p className="font-medium">{SITE_NAME}</p>
          <p className="mt-2 leading-relaxed text-muted">{SITE_TAGLINE}</p>
        </div>
        <div className="grid grid-cols-2 gap-6">
          <div>
            <p className="mb-3 font-medium">推荐页</p>
            <ul className="space-y-2 text-muted">
              <li>
                <Link href="/vpn" className="hover:text-ink">
                  UmiVPN / VPN
                </Link>
              </li>
              <li>
                <Link href="/免费vpn" className="hover:text-ink">
                  努努加速器 / 免费VPN
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <p className="mb-3 font-medium">本站</p>
            <ul className="space-y-2 text-muted">
              <li>
                <Link href="/about" className="hover:text-ink">
                  关于与披露
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="hover:text-ink">
                  隐私政策
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <p className="border-t border-line py-4 text-center text-xs text-muted">
        © {new Date().getFullYear()} {SITE_NAME} · 请遵守当地法律法规合理使用网络工具
      </p>
    </footer>
  );
}
