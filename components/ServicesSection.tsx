"use client";

import { SERVICES } from "@/lib/constants";
import ServiceCard from "./ServiceCard";
import FadeInWhenVisible from "./animations/FadeInWhenVisible";
import StaggerContainer from "./animations/StaggerContainer";
import StaggerItem from "./animations/StaggerItem";

export default function ServicesSection() {
  return (
    <section id="services" className="py-24 px-16 w-full md:py-24 md:px-16 max-md:py-16 max-md:px-6">
      <FadeInWhenVisible>
        <h2 className="font-heading text-center text-5xl mb-4 font-extrabold tracking-tight text-heading max-md:text-[2.2rem] max-[480px]:text-[1.8rem]">
          Mes Services
        </h2>
      </FadeInWhenVisible>
      <FadeInWhenVisible delay={0.1}>
        <p className="text-center text-gray-500 text-lg mb-16 max-w-[700px] mx-auto">
          Un accompagnement complet adapté à vos objectifs
        </p>
      </FadeInWhenVisible>
      <StaggerContainer className="flex flex-wrap gap-10 max-md:flex-col" staggerDelay={0.15}>
        {SERVICES.map((service) => (
          <StaggerItem key={service.title} className="flex-1 min-w-0 max-md:min-w-full">
            <ServiceCard {...service} />
          </StaggerItem>
        ))}
      </StaggerContainer>
    </section>
  );
}
