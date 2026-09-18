import type { Metadata } from "next";
import { ProductRecommend } from "@/components/product-recommend";
import { UMIVPN_PAGE } from "@/lib/pages";
import { getProduct } from "@/lib/products";
import { SITE_ORIGIN } from "@/lib/site";

export const metadata: Metadata = {
  title: { absolute: UMIVPN_PAGE.title },
  description: UMIVPN_PAGE.description,
  keywords: UMIVPN_PAGE.keywords,
  alternates: { canonical: UMIVPN_PAGE.path },
  openGraph: {
    title: UMIVPN_PAGE.title,
    description: UMIVPN_PAGE.description,
    url: `${SITE_ORIGIN}${UMIVPN_PAGE.path}`,
    locale: "zh_CN",
    type: "article",
  },
};

export default function VpnPage() {
  return <ProductRecommend page={UMIVPN_PAGE} product={getProduct("umivpn")} />;
}
