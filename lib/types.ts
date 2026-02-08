export interface NavLink {
  href: string;
  label: string;
}

export interface Service {
  imageSrc: string;
  imageAlt: string;
  title: string;
  description: string;
}

export interface Program {
  imageSrc: string;
  title: string;
  description: string;
  features: string[];
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
