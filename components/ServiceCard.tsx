"use client";

import Image from "next/image";
import Link from "next/link";
import { Service } from "@/lib/types";
import { useLanguage } from "@/lib/i18n/useLanguage";

export default function ServiceCard({
  slug,
  imageSrc,
  imageAlt,
  title,
  description,
}: Service) {
  const { t } = useLanguage();

  return (
    <Link
      href={`/services/${slug}`}
      className="h-full flex flex-col bg-white rounded-xl overflow-hidden shadow-[0_4px_20px_rgba(0,0,0,0.08)] transition-all duration-300 border border-gray-200 hover:-translate-y-2 hover:shadow-[0_12px_40px_rgba(37,99,235,0.15)] hover:border-brand-blue no-underline group"
    >
      <Image
        src={imageSrc}
        alt={imageAlt}
        width={800}
        height={220}
        className="w-full h-[220px] object-cover"
      />
      <div className="p-8 flex-1 flex flex-col">
        <h3 className="text-2xl mb-4 text-heading font-bold">{title}</h3>
        <p className="text-gray-500 leading-[1.7] text-[0.98rem] flex-1">
          {description}
        </p>
        <span className="inline-flex items-center mt-4 text-brand-blue font-semibold text-sm gap-1 transition-all duration-300 group-hover:gap-2">
          {t("services.learnMore")} &rarr;
        </span>
      </div>
    </Link>
  );
}
