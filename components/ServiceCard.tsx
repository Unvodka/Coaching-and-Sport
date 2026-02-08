import Image from "next/image";
import { Service } from "@/lib/types";

export default function ServiceCard({
  imageSrc,
  imageAlt,
  title,
  description,
}: Service) {
  return (
    <div className="bg-white rounded-xl overflow-hidden shadow-[0_4px_20px_rgba(0,0,0,0.08)] transition-all duration-300 border border-gray-200 hover:-translate-y-2 hover:shadow-[0_12px_40px_rgba(37,99,235,0.15)] hover:border-brand-blue">
      <Image
        src={imageSrc}
        alt={imageAlt}
        width={800}
        height={220}
        className="w-full h-[220px] object-cover"
      />
      <div className="p-8">
        <h3 className="text-2xl mb-4 text-heading font-bold">{title}</h3>
        <p className="text-gray-500 leading-[1.7] text-[0.98rem]">
          {description}
        </p>
      </div>
    </div>
  );
}
