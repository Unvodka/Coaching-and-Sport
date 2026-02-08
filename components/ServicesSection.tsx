import { SERVICES } from "@/lib/constants";
import ServiceCard from "./ServiceCard";

export default function ServicesSection() {
  return (
    <section id="services" className="py-24 px-16 w-full md:py-24 md:px-16 max-md:py-16 max-md:px-6">
      <h2
        data-aos="fade-up"
        className="font-heading text-center text-5xl mb-4 font-extrabold tracking-tight text-heading max-md:text-[2.2rem] max-[480px]:text-[1.8rem]"
      >
        Mes Services
      </h2>
      <p
        data-aos="fade-up"
        data-aos-delay="100"
        className="text-center text-gray-500 text-lg mb-16 max-w-[700px] mx-auto"
      >
        Un accompagnement complet adapté à vos objectifs
      </p>
      <div className="flex flex-wrap gap-10 max-md:flex-col">
        {SERVICES.map((service, index) => (
          <ServiceCard key={service.title} {...service} index={index} />
        ))}
      </div>
    </section>
  );
}
