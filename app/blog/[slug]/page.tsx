import { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { BLOG_POSTS, getBlogPostBySlug } from "@/lib/blog";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import JsonLd from "@/components/JsonLd";

const BASE_URL = "https://coach-bluewave.com";

interface Props {
  params: { slug: string };
}

export function generateStaticParams() {
  return BLOG_POSTS.map((post) => ({
    slug: post.slug,
  }));
}

const BLOG_KEYWORDS: Record<string, string[]> = {
  "perdre-du-poids-avec-coach-sportif": [
    "perte de poids", "perdre du poids", "weight loss", "coach sportif perte de poids",
    "maigrir avec coach", "régime sportif", "musculation perte de poids",
  ],
  "bienfaits-natation-adultes": [
    "natation", "natation adulte", "bienfaits natation", "swimming benefits",
    "cours de natation adulte", "maître-nageur", "swimming teacher",
    "natation perte de poids", "sport complet",
  ],
  "fitness-plein-air-avantages": [
    "fitness plein air", "outdoor fitness", "entraînement extérieur",
    "fitness Valbonne", "coach fitness", "HIIT plein air",
    "personal trainer outdoor", "circuit training extérieur",
  ],
  "nutrition-sportive-bases": [
    "nutrition sportive", "sports nutrition", "nutrition coach",
    "plan alimentaire sportif", "macronutriments", "protéines sport",
    "coaching nutritionnel", "meal plan",
  ],
  "commencer-sport-apres-40-ans": [
    "sport après 40 ans", "reprendre le sport", "remise en forme",
    "coaching seniors", "natation seniors", "fitness débutant",
    "coach sportif seniors", "personal trainer over 40",
  ],
};

export function generateMetadata({ params }: Props): Metadata {
  const post = getBlogPostBySlug(params.slug);
  if (!post) return {};

  const pageUrl = `${BASE_URL}/blog/${post.slug}`;
  const postKeywords = BLOG_KEYWORDS[params.slug] || [];

  return {
    title: post.title,
    description: post.description,
    keywords: ["Coach-Bluewave", "Arnaud Chevallier", ...postKeywords],
    alternates: {
      canonical: pageUrl,
    },
    openGraph: {
      type: "article",
      locale: "fr_FR",
      url: pageUrl,
      siteName: "Coach-Bluewave",
      title: post.title,
      description: post.description,
      publishedTime: post.date,
      authors: ["Arnaud Chevallier"],
      images: [
        {
          url: post.imageSrc,
          width: 1200,
          height: 630,
          alt: post.imageAlt,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.description,
      images: [post.imageSrc],
    },
  };
}

export default function BlogPostPage({ params }: Props) {
  const post = getBlogPostBySlug(params.slug);

  if (!post) {
    notFound();
  }

  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.description,
    image: post.imageSrc,
    datePublished: post.date,
    dateModified: post.date,
    url: `${BASE_URL}/blog/${post.slug}`,
    author: {
      "@type": "Person",
      "@id": `${BASE_URL}/#person`,
      name: "Arnaud Chevallier",
      jobTitle: "Coach Sportif & Maître-Nageur",
      url: BASE_URL,
    },
    publisher: {
      "@type": "Organization",
      name: "Coach-Bluewave",
      url: BASE_URL,
      logo: {
        "@type": "ImageObject",
        url: `${BASE_URL}/images/hero-valbonne.jpg`,
      },
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `${BASE_URL}/blog/${post.slug}`,
    },
    articleSection: post.category,
    keywords: (BLOG_KEYWORDS[post.slug] || []).join(", "),
    wordCount: post.content.join(" ").split(/\s+/).length,
    inLanguage: "fr",
  };

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Accueil",
        item: BASE_URL,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Blog",
        item: `${BASE_URL}/blog`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: post.title,
        item: `${BASE_URL}/blog/${post.slug}`,
      },
    ],
  };

  // Find related posts (same category, excluding current)
  const relatedPosts = BLOG_POSTS.filter(
    (p) => p.slug !== post.slug
  ).slice(0, 2);

  return (
    <>
      <JsonLd data={articleJsonLd} />
      <JsonLd data={breadcrumbJsonLd} />
      <Header />

      {/* Hero Image */}
      <section className="relative h-[45vh] min-h-[300px] flex items-center justify-center overflow-hidden">
        <Image
          src={post.imageSrc}
          alt={post.imageAlt}
          fill
          className="object-cover"
          priority
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-black/50 z-[1]" />
        <div className="relative z-10 text-center text-white px-8 max-w-[800px]">
          <div className="inline-block bg-brand-blue text-white text-sm font-bold px-4 py-1 rounded-full mb-4">
            {post.category}
          </div>
          <h1 className="font-heading text-[2.8rem] font-extrabold tracking-tight mb-4 drop-shadow-lg max-md:text-[2rem] max-[480px]:text-[1.6rem] leading-tight">
            {post.title}
          </h1>
          <div className="flex items-center justify-center gap-4 text-sm opacity-80">
            <span>Par Arnaud Chevallier</span>
            <span>·</span>
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
        </div>
      </section>

      {/* Back link */}
      <div className="py-6 px-16 max-md:px-6">
        <Link
          href="/blog"
          className="text-brand-blue font-semibold hover:underline text-[0.95rem] inline-flex items-center gap-2"
        >
          &larr; Retour au blog
        </Link>
      </div>

      {/* Article Content */}
      <article className="pb-16 px-16 max-w-[800px] mx-auto max-md:px-6">
        {post.content.map((paragraph, i) => (
          <p
            key={i}
            className="text-gray-600 mb-6 leading-[1.9] text-[1.05rem]"
          >
            {paragraph}
          </p>
        ))}
      </article>

      {/* CTA Section */}
      <section className="bg-gradient-to-br from-slate-50 to-slate-100 py-16 px-16 text-center max-md:py-12 max-md:px-6">
        <h2 className="font-heading text-2xl font-bold text-heading mb-4">
          Prêt à passer à l&apos;action ?
        </h2>
        <p className="text-gray-500 mb-8 max-w-[500px] mx-auto">
          Bénéficiez d&apos;un accompagnement personnalisé avec un coach
          sportif diplômé à Valbonne.
        </p>
        <Link
          href="/#contact"
          className="inline-block bg-gradient-to-br from-brand-blue to-brand-navy text-white py-4 px-10 rounded-lg font-bold text-base transition-all duration-300 no-underline hover:-translate-y-[2px] hover:shadow-[0_8px_25px_rgba(37,99,235,0.3)]"
        >
          Réserver une séance découverte
        </Link>
      </section>

      {/* Related Articles */}
      {relatedPosts.length > 0 && (
        <section className="py-20 px-16 max-md:py-12 max-md:px-6">
          <h2 className="font-heading text-center text-3xl font-extrabold tracking-tight text-heading mb-12 max-md:text-2xl">
            Articles similaires
          </h2>
          <div className="max-w-[900px] mx-auto grid grid-cols-2 gap-8 max-md:grid-cols-1">
            {relatedPosts.map((related) => (
              <Link
                key={related.slug}
                href={`/blog/${related.slug}`}
                className="group block bg-white rounded-xl shadow-[0_4px_20px_rgba(0,0,0,0.08)] border border-gray-200 overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_8px_30px_rgba(0,0,0,0.12)] no-underline"
              >
                <div className="relative h-[180px] overflow-hidden">
                  <Image
                    src={related.imageSrc}
                    alt={related.imageAlt}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                </div>
                <div className="p-5">
                  <h3 className="font-heading text-lg font-bold text-heading group-hover:text-brand-blue transition-colors mb-2">
                    {related.title}
                  </h3>
                  <span className="text-brand-blue font-semibold text-sm">
                    Lire &rarr;
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}

      <Footer />
    </>
  );
}
