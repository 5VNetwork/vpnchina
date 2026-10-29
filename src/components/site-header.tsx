import Link from "next/link";
import { SITE_NAME } from "@/lib/site";

const NAV = [
  { href: "/", label: "首页" },
  { href: "/vpn", label: "UmiVPN" },
  { href: "/免费vpn", label: "努努加速器" },
  { href: "/免费节点", label: "免费节点" },
  { href: "/如何选择vpn", label: "怎么选" },
  { href: "/about", label: "关于" },
];

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 border-b border-line bg-paper/90 backdrop-blur">
      <div className="mx-auto flex h-14 max-w-3xl items-center justify-between px-4 sm:px-6">
        <Link href="/" className="text-sm font-semibold tracking-tight">
          {SITE_NAME}
        </Link>
        <nav className="flex items-center gap-3 overflow-x-auto text-xs text-muted sm:gap-4 sm:text-sm">
          {NAV.map((item) => (
            <Link key={item.href} href={item.href} className="hover:text-ink">
              {item.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
