import { MetadataRoute } from "next";
import { SERVICES } from "@/lib/constants";
import { BLOG_POSTS } from "@/lib/blog";
import { BASE_URL } from "@/lib/config";

// Bump this date whenever you make significant content changes to the homepage
const HOMEPAGE_LAST_MODIFIED = new Date("2026-03-15");
const SERVICES_LAST_MODIFIED = new Date("2026-03-15");
const LEGALS_LAST_MODIFIED = new Date("2026-03-15");

export default function sitemap(): MetadataRoute.Sitemap {
  const servicePages = SERVICES.map((service) => ({
    url: `${BASE_URL}/services/${service.slug}`,
    lastModified: SERVICES_LAST_MODIFIED,
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }));

  // Blog posts use their actual publish date
  const blogPages = BLOG_POSTS.map((post) => ({
    url: `${BASE_URL}/blog/${post.slug}`,
    lastModified: new Date(post.date),
    changeFrequency: "yearly" as const,
    priority: 0.7,
  }));

  // Most recent blog post date drives the /blog index lastModified
  const latestBlogDate = BLOG_POSTS.reduce((latest, post) => {
    const d = new Date(post.date);
    return d > latest ? d : latest;
  }, new Date("2025-01-01"));

  return [
    {
      url: BASE_URL,
      lastModified: HOMEPAGE_LAST_MODIFIED,
      changeFrequency: "weekly",
      priority: 1,
    },
    ...servicePages,
    {
      url: `${BASE_URL}/apropos`,
      lastModified: new Date("2026-03-15"),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/packs`,
      lastModified: new Date("2026-03-15"),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/blog`,
      lastModified: latestBlogDate,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    ...blogPages,
    {
      url: `${BASE_URL}/mentions-legales`,
      lastModified: LEGALS_LAST_MODIFIED,
      changeFrequency: "yearly",
      priority: 0.3,
    },
    {
      url: `${BASE_URL}/politique-de-confidentialite`,
      lastModified: LEGALS_LAST_MODIFIED,
      changeFrequency: "yearly",
      priority: 0.3,
    },
    {
      url: `${BASE_URL}/cgv`,
      lastModified: LEGALS_LAST_MODIFIED,
      changeFrequency: "yearly",
      priority: 0.3,
    },
  ];
}
