import type { Metadata } from "next";
import { BLOG_POSTS } from "@/lib/blog";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import JsonLd from "@/components/JsonLd";
import BlogListClient from "./BlogListClient";
import { BASE_URL } from "@/lib/config";

export const metadata: Metadata = {
  title: "Blog — Conseils Sport, Natation & Nutrition",
  description:
    "Articles de conseils en coaching sportif, natation, nutrition et bien-être par Arnaud Chevallier, éducateur sportif et maître-nageur à Valbonne.",
  alternates: {
    canonical: `${BASE_URL}/blog`,
  },
  openGraph: {
    title: "Blog Coach-Bluewave — Conseils Sport, Natation & Nutrition",
    description:
      "Articles de conseils en coaching sportif, natation, nutrition et bien-être par Arnaud Chevallier, maître-nageur à Valbonne.",
    url: `${BASE_URL}/blog`,
    type: "website",
  },
};

const blogListJsonLd = {
  "@context": "https://schema.org",
  "@type": "Blog",
  "@id": `${BASE_URL}/blog`,
  name: "Blog Coach-Bluewave",
  description: "Conseils en coaching sportif, natation, nutrition et bien-être par Arnaud Chevallier",
  url: `${BASE_URL}/blog`,
  author: {
    "@type": "Person",
    "@id": `${BASE_URL}/#person`,
    name: "Arnaud Chevallier",
  },
  blogPost: BLOG_POSTS.map((post) => ({
    "@type": "BlogPosting",
    headline: post.title,
    url: `${BASE_URL}/blog/${post.slug}`,
    datePublished: post.date,
    image: post.imageSrc,
    author: {
      "@type": "Person",
      "@id": `${BASE_URL}/#person`,
      name: "Arnaud Chevallier",
    },
  })),
};

export default function BlogPage() {
  return (
    <>
      <JsonLd data={blogListJsonLd} />
      <Header />
      <main>
        <BlogListClient />
      </main>
      <Footer />
    </>
  );
}
