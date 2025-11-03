import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const base =
    process.env.NEXT_PUBLIC_SITE_URL ?? "https://consultinguz.vercel.app";
  const routes = [
    "",
    "/services/employers",
    "/services/jobseekers",
    "/services/partners",
    "/services/process",
    "/compliance",
    "/about/mission",
    "/about/team",
  ];
  return routes.map((path) => ({
    url: `${base}${path}`,
    lastModified: new Date(),
    changeFrequency: "weekly",
    priority: path === "" ? 1 : 0.7,
  }));
}
