import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { BLOG_POSTS, getBlogPostBySlug } from "@/lib/blog";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import JsonLd from "@/components/JsonLd";
import BlogPostClient from "./BlogPostClient";
import { BASE_URL } from "@/lib/config";

interface Props {
  params: { slug: string };
}

export async function generateStaticParams() {
  return BLOG_POSTS.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const post = getBlogPostBySlug(params.slug);
  if (!post) return { title: "Article introuvable" };

  const { title, description, date, imageSrc, imageAlt, slug } = post;

  return {
    title,
    description,
    alternates: { canonical: `${BASE_URL}/blog/${slug}` },
    openGraph: {
      title,
      description,
      url: `${BASE_URL}/blog/${slug}`,
      type: "article",
      publishedTime: date,
      authors: ["Arnaud Chevallier"],
      images: [{ url: imageSrc, width: 1200, height: 630, alt: imageAlt }],
    },
  };
}

export default function BlogPostPage({ params }: Props) {
  const post = getBlogPostBySlug(params.slug);
  if (!post) notFound();

  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "@id": `${BASE_URL}/blog/${post.slug}`,
    headline: post.title,
    description: post.description,
    image: post.imageSrc,
    datePublished: post.date,
    dateModified: post.date,
    url: `${BASE_URL}/blog/${post.slug}`,
    inLanguage: "fr-FR",
    author: {
      "@type": "Person",
      "@id": `${BASE_URL}/#person`,
      name: "Arnaud Chevallier",
      jobTitle: "Éducateur Sportif & Maître-Nageur",
      url: BASE_URL,
    },
    publisher: {
      "@type": "Person",
      "@id": `${BASE_URL}/#person`,
      name: "Arnaud Chevallier",
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `${BASE_URL}/blog/${post.slug}`,
    },
    articleBody: post.content.join(" "),
    keywords: [post.category, "coaching sportif", "Valbonne", "Côte d'Azur"],
    articleSection: post.category,
  };

  return (
    <>
      <JsonLd data={articleJsonLd} />
      <Header />
      <main>
        <BlogPostClient post={post} />
      </main>
      <Footer />
    </>
  );
}
