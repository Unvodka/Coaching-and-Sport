export type Locale = "fr" | "en";

export interface NavLink {
  href: string;
  label: string;
}

export interface ServiceBenefit {
  icon: string;
  title: string;
  description: string;
}

export interface ServiceDetail {
  heroImageSrc: string;
  heroImageAlt: string;
  subtitle: string;
  longDescription: string[];
  benefits: ServiceBenefit[];
  targetAudience: string[];
  ctaText: string;
}

export interface Service {
  slug: string;
  imageSrc: string;
  imageAlt: string;
  title: string;
  description: string;
  detail: ServiceDetail;
}

export interface Program {
  imageSrc: string;
  title: string;
  description: string;
  features: string[];
  goals: string[];
  price: string;
  priceNumeric?: number;
  priceUnit?: string;
  priceDetails: string;
  ctaText: string;
  ctaHref?: string;
  isFeatured?: boolean;
  featuredBadge?: string;
}

export interface PricingPack {
  title: string;
  price: string;
  priceNumeric: number;
  duration: string;
  features: string[];
}
