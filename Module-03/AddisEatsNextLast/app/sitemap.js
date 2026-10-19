import { getDishes } from "../lib/db";
import { siteUrl } from "../lib/site";

export default async function sitemap() {
  const now = new Date();
  const publicPages = ["", "/menu", "/about"];
  const dishes = await getDishes();

  return [
    ...publicPages.map((path) => ({
      url: new URL(path, siteUrl).toString(),
      lastModified: now,
      changeFrequency: path === "/menu" ? "daily" : "monthly",
      priority: path === "" ? 1 : 0.7,
    })),
    ...dishes.map((dish) => ({
      url: new URL(`/menu/${dish.id}`, siteUrl).toString(),
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.6,
    })),
  ];
}
