import { siteUrl } from "../lib/site";

export default function robots() {
  return {
    rules: {
      userAgent: "*",
      allow: ["/", "/menu", "/about"],
      disallow: ["/cart", "/checkout", "/orders", "/kitchen", "/account", "/signin", "/signup", "/api/"],
    },
    sitemap: new URL("/sitemap.xml", siteUrl).toString(),
    host: siteUrl.toString(),
  };
}
