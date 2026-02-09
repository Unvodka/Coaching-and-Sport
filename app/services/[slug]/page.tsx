import { Metadata } from "next";
import { notFound } from "next/navigation";
import { SERVICES, getServiceBySlug } from "@/lib/constants";
import ServiceDetailContent from "@/components/ServiceDetailContent";

interface Props {
  params: { slug: string };
}

export function generateStaticParams() {
  return SERVICES.map((service) => ({
    slug: service.slug,
  }));
}

export function generateMetadata({ params }: Props): Metadata {
  const service = getServiceBySlug(params.slug);
  if (!service) return {};

  return {
    title: `${service.title} - Arnaud Chevallier Coach Sportif`,
    description: service.description,
  };
}

export default function ServicePage({ params }: Props) {
  const service = getServiceBySlug(params.slug);

  if (!service) {
    notFound();
  }

  return <ServiceDetailContent service={service} />;
}
