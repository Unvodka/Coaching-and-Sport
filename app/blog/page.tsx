import { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { BLOG_POSTS } from "@/lib/blog";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import JsonLd from "@/components/JsonLd";

const BASE_URL = "https://coach-bluewave.com";

export const metadata: Metadata = {
  title: "Blog - Conseils Sport, Natation, Fitness & Nutrition",
  description:
    "Blog Coach-Bluewave par Arnaud Chevallier, maître-nageur et coach sportif à Valbonne. Conseils d'expert en natation (swimming), fitness, musculation, HIIT, perte de poids et nutrition sportive. Articles pour se remettre en forme sur la Côte d'Azur et en ligne.",
  keywords: [
    "blog coach sportif", "blog fitness", "blog natation",
    "conseils natation", "swimming tips", "conseils fitness",
    "perte de poids", "nutrition sportive", "musculation conseils",
    "HIIT", "coach sportif Valbonne", "maître-nageur blog",
  ],
  alternates: {
    canonical: `${BASE_URL}/blog`,
  },
  openGraph: {
    type: "website",
    locale: "fr_FR",
    url: `${BASE_URL}/blog`,
    siteName: "Coach-Bluewave",
    title: "Blog Coach-Bluewave - Conseils Sport, Natation, Fitness & Nutrition",
    description:
      "Blog de coaching sportif par Arnaud Chevallier, maître-nageur diplômé. Conseils natation, fitness, musculation et nutrition à Valbonne.",
    images: [
      {
        url: "/images/hero-valbonne.jpg",
        width: 1200,
        height: 630,
        alt: "Blog Coach-Bluewave",
      },
    ],
  },
};

export default function BlogPage() {
  const blogListJsonLd = {
    "@context": "https://schema.org",
    "@type": "Blog",
    name: "Blog Coach-Bluewave",
    description:
      "Conseils d'expert en coaching sportif, natation, fitness et nutrition à Valbonne.",
    url: `${BASE_URL}/blog`,
    author: {
      "@type": "Person",
      "@id": `${BASE_URL}/#person`,
      name: "Arnaud Chevallier",
    },
    blogPost: BLOG_POSTS.map((post) => ({
      "@type": "BlogPosting",
      headline: post.title,
      description: post.description,
      url: `${BASE_URL}/blog/${post.slug}`,
      datePublished: post.date,
      author: {
        "@type": "Person",
        name: "Arnaud Chevallier",
      },
      image: post.imageSrc,
    })),
  };

  return (
    <>
      <JsonLd data={blogListJsonLd} />
      <Header />

      {/* Hero */}
      <section className="bg-gradient-to-br from-brand-dark to-brand-navy text-white py-20 pt-32 px-16 text-center max-md:py-14 max-md:pt-28 max-md:px-6">
        <h1 className="font-heading text-[3rem] font-extrabold tracking-tight mb-4 max-md:text-[2.2rem]">
          Blog
        </h1>
        <p className="text-xl opacity-90 max-w-[600px] mx-auto max-md:text-lg">
          Conseils d&apos;expert en sport, natation, fitness et nutrition pour
          atteindre vos objectifs
        </p>
      </section>

      {/* Blog Grid */}
      <section className="py-20 px-16 max-md:py-12 max-md:px-6">
        <div className="max-w-[1100px] mx-auto grid grid-cols-2 gap-10 max-md:grid-cols-1">
          {BLOG_POSTS.map((post) => (
            <Link
              key={post.slug}
              href={`/blog/${post.slug}`}
              className="group block bg-white rounded-2xl shadow-[0_4px_20px_rgba(0,0,0,0.08)] border border-gray-200 overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_8px_30px_rgba(0,0,0,0.12)] no-underline"
            >
              <div className="relative h-[220px] overflow-hidden">
                <Image
                  src={post.imageSrc}
                  alt={post.imageAlt}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
                <div className="absolute top-4 left-4 bg-brand-blue text-white text-xs font-bold px-3 py-1 rounded-full">
                  {post.category}
                </div>
              </div>
              <div className="p-6">
                <div className="flex items-center gap-3 text-sm text-gray-400 mb-3">
                  <time dateTime={post.date}>
                    {new Date(post.date).toLocaleDateString("fr-FR", {
                      day: "numeric",
                      month: "long",
                      year: "numeric",
                    })}
                  </time>
                  <span>·</span>
                  <span>{post.readingTime} de lecture</span>
                </div>
                <h2 className="font-heading text-xl font-bold text-heading mb-3 group-hover:text-brand-blue transition-colors">
                  {post.title}
                </h2>
                <p className="text-gray-500 text-[0.95rem] leading-relaxed line-clamp-3">
                  {post.description}
                </p>
                <span className="inline-block mt-4 text-brand-blue font-semibold text-sm group-hover:underline">
                  Lire l&apos;article &rarr;
                </span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <Footer />
    </>
  );
}
