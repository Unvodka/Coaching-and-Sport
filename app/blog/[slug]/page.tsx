"use client";

import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { use } from "react";
import { BLOG_POSTS, getBlogPostBySlug } from "@/lib/blog";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useLanguage } from "@/lib/i18n/useLanguage";

interface Props {
  params: Promise<{ slug: string }>;
}

export default function BlogPostPage({ params }: Props) {
  const { slug } = use(params);
  const { locale, t } = useLanguage();

  const post = getBlogPostBySlug(slug);
  if (!post) notFound();

  const title = locale === "en" ? post.titleEn : post.title;
  const description = locale === "en" ? post.descriptionEn : post.description;
  const category = locale === "en" ? post.categoryEn : post.category;
  const imageAlt = locale === "en" ? post.imageAltEn : post.imageAlt;
  const content = locale === "en" ? post.contentEn : post.content;

  // Related posts — same category, then others
  const sameCategoryPosts = BLOG_POSTS.filter(
    (p) => p.slug !== post.slug && p.category === post.category
  );
  const otherPosts = BLOG_POSTS.filter(
    (p) => p.slug !== post.slug && p.category !== post.category
  );
  const relatedPosts = [...sameCategoryPosts, ...otherPosts].slice(0, 2);

  return (
    <>
      <Header />

      {/* Hero Image */}
      <section className="relative h-[45vh] min-h-[300px] flex items-center justify-center overflow-hidden">
        <Image
          src={post.imageSrc}
          alt={imageAlt}
          fill
          className="object-cover"
          priority
          sizes="100vw"
          quality={75}
        />
        <div className="absolute inset-0 bg-black/50 z-[1]" />
        <div className="relative z-10 text-center text-white px-8 max-w-[800px]">
          <div className="inline-block bg-brand-blue text-white text-sm font-bold px-4 py-1 rounded-full mb-4">
            {category}
          </div>
          <h1 className="font-heading text-[2.8rem] font-extrabold tracking-tight mb-4 drop-shadow-lg max-md:text-[2rem] max-[480px]:text-[1.6rem] leading-tight">
            {title}
          </h1>
          <div className="flex items-center justify-center gap-4 text-sm opacity-80 flex-wrap">
            <span>{t("blog.by")}</span>
            <span>·</span>
            <time dateTime={post.date}>
              {new Date(post.date).toLocaleDateString(
                locale === "en" ? "en-GB" : "fr-FR",
                { day: "numeric", month: "long", year: "numeric" }
              )}
            </time>
            <span>·</span>
            <span>
              {post.readingTime} {t("blog.readingTime")}
            </span>
          </div>
        </div>
      </section>

      {/* Back link */}
      <div className="py-6 px-16 max-md:px-6">
        <Link
          href="/blog"
          className="text-brand-blue font-semibold hover:underline text-[0.95rem] inline-flex items-center gap-2"
        >
          {t("blog.backToBlog")}
        </Link>
      </div>

      {/* Article Content */}
      <article className="pb-16 px-16 max-w-[800px] mx-auto max-md:px-6">
        {content.map((paragraph, i) => (
          <p key={i} className="text-gray-600 mb-6 leading-[1.9] text-[1.05rem]">
            {paragraph}
          </p>
        ))}
      </article>

      {/* CTA Section */}
      <section className="bg-gradient-to-br from-slate-50 to-slate-100 py-16 px-16 text-center max-md:py-12 max-md:px-6">
        <h2 className="font-heading text-2xl font-bold text-heading mb-4">
          {t("blog.cta.title")}
        </h2>
        <p className="text-gray-500 mb-8 max-w-[500px] mx-auto">
          {t("blog.cta.subtitle")}
        </p>
        <Link
          href="/#contact"
          className="inline-block bg-gradient-to-br from-brand-blue to-brand-navy text-white py-4 px-10 rounded-lg font-bold text-base transition-all duration-300 no-underline hover:-translate-y-[2px] hover:shadow-[0_8px_25px_rgba(37,99,235,0.3)]"
        >
          {t("blog.cta.button")}
        </Link>
      </section>

      {/* Related Articles */}
      {relatedPosts.length > 0 && (
        <section className="py-20 px-16 max-md:py-12 max-md:px-6">
          <h2 className="font-heading text-center text-3xl font-extrabold tracking-tight text-heading mb-12 max-md:text-2xl">
            {t("blog.relatedArticles")}
          </h2>
          <div className="max-w-[900px] mx-auto grid grid-cols-2 gap-8 max-md:grid-cols-1">
            {relatedPosts.map((related) => {
              const relatedTitle = locale === "en" ? related.titleEn : related.title;
              const relatedImageAlt = locale === "en" ? related.imageAltEn : related.imageAlt;

              return (
                <Link
                  key={related.slug}
                  href={`/blog/${related.slug}`}
                  className="group block bg-white rounded-xl shadow-[0_4px_20px_rgba(0,0,0,0.08)] border border-gray-200 overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_8px_30px_rgba(0,0,0,0.12)] no-underline"
                >
                  <div className="relative h-[180px] overflow-hidden">
                    <Image
                      src={related.imageSrc}
                      alt={relatedImageAlt}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                      sizes="(max-width: 768px) 100vw, 50vw"
                    />
                  </div>
                  <div className="p-5">
                    <h3 className="font-heading text-lg font-bold text-heading group-hover:text-brand-blue transition-colors mb-2">
                      {relatedTitle}
                    </h3>
                    <span className="text-brand-blue font-semibold text-sm">
                      {t("blog.readMore")}
                    </span>
                  </div>
                </Link>
              );
            })}
          </div>
        </section>
      )}

      <Footer />
    </>
  );
}
