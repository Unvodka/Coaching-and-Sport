"use client";

import Link from "next/link";
import Image from "next/image";
import { BLOG_POSTS } from "@/lib/blog";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useLanguage } from "@/lib/i18n/useLanguage";

export default function BlogPage() {
  const { locale, t } = useLanguage();

  return (
    <>
      <Header />

      {/* Hero */}
      <section className="bg-gradient-to-br from-brand-dark to-brand-navy text-white py-20 pt-32 px-16 text-center max-md:py-14 max-md:pt-28 max-md:px-6">
        <h1 className="font-heading text-[3rem] font-extrabold tracking-tight mb-4 max-md:text-[2.2rem]">
          {t("blog.title")}
        </h1>
        <p className="text-xl opacity-90 max-w-[600px] mx-auto max-md:text-lg">
          {t("blog.subtitle")}
        </p>
      </section>

      {/* Blog Grid */}
      <section className="py-20 px-16 max-md:py-12 max-md:px-6">
        <div className="max-w-[1100px] mx-auto grid grid-cols-2 gap-10 max-md:grid-cols-1">
          {BLOG_POSTS.map((post) => {
            const title = locale === "en" ? post.titleEn : post.title;
            const description = locale === "en" ? post.descriptionEn : post.description;
            const category = locale === "en" ? post.categoryEn : post.category;
            const imageAlt = locale === "en" ? post.imageAltEn : post.imageAlt;

            return (
              <Link
                key={post.slug}
                href={`/blog/${post.slug}`}
                className="group block bg-white rounded-2xl shadow-[0_4px_20px_rgba(0,0,0,0.08)] border border-gray-200 overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_8px_30px_rgba(0,0,0,0.12)] no-underline"
              >
                <div className="relative h-[220px] overflow-hidden">
                  <Image
                    src={post.imageSrc}
                    alt={imageAlt}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, 50vw"
                    quality={75}
                    loading="lazy"
                  />
                  <div className="absolute top-4 left-4 bg-brand-blue text-white text-xs font-bold px-3 py-1 rounded-full">
                    {category}
                  </div>
                </div>
                <div className="p-6">
                  <div className="flex items-center gap-3 text-sm text-gray-400 mb-3">
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
                  <h2 className="font-heading text-xl font-bold text-heading mb-3 group-hover:text-brand-blue transition-colors">
                    {title}
                  </h2>
                  <p className="text-gray-500 text-[0.95rem] leading-relaxed line-clamp-3">
                    {description}
                  </p>
                  <span className="inline-block mt-4 text-brand-blue font-semibold text-sm group-hover:underline">
                    {t("blog.readArticle")}
                  </span>
                </div>
              </Link>
            );
          })}
        </div>
      </section>

      <Footer />
    </>
  );
}
