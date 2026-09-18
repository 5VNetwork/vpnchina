import type { Metadata } from "next";
import { ProductRecommend } from "@/components/product-recommend";
import { NUNU_PAGE } from "@/lib/pages";
import { getProduct } from "@/lib/products";
import { SITE_ORIGIN } from "@/lib/site";

export const metadata: Metadata = {
  title: { absolute: NUNU_PAGE.title },
  description: NUNU_PAGE.description,
  keywords: NUNU_PAGE.keywords,
  alternates: { canonical: NUNU_PAGE.path },
  openGraph: {
    title: NUNU_PAGE.title,
    description: NUNU_PAGE.description,
    url: `${SITE_ORIGIN}${NUNU_PAGE.path}`,
    locale: "zh_CN",
    type: "article",
  },
};

export default function FreeVpnPage() {
  return <ProductRecommend page={NUNU_PAGE} product={getProduct("nunu")} />;
}
