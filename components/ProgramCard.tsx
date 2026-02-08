import Image from "next/image";
import { Program } from "@/lib/types";

interface ProgramCardProps extends Program {
  onCheckout?: () => void;
  isLoading?: boolean;
  index?: number;
}

export default function ProgramCard({
  imageSrc,
  title,
  description,
  features,
  price,
  priceUnit,
  priceDetails,
  ctaText,
  ctaHref,
  isFeatured,
  featuredBadge,
  onCheckout,
  isLoading = false,
  index = 0,
}: ProgramCardProps) {
  const isStripe = !!onCheckout;

  const cardClasses = `flex-1 min-w-0 bg-white rounded-xl overflow-hidden flex flex-col transition-all duration-300 shadow-[0_4px_15px_rgba(0,0,0,0.06)] hover:shadow-[0_12px_35px_rgba(37,99,235,0.12)] hover:border-brand-blue hover:-translate-y-1 no-underline cursor-pointer ${
    isFeatured ? "border-[3px] border-brand-blue" : "border-2 border-gray-200"
  } ${isLoading ? "opacity-60 pointer-events-none" : ""}`;

  const content = (
    <>
      <div className="relative h-48 w-full overflow-hidden">
        <Image
          src={imageSrc}
          alt={title}
          fill
          className="object-cover opacity-60"
          sizes="(max-width: 768px) 100vw, 33vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        {featuredBadge && (
          <span className="absolute top-4 right-4 bg-brand-blue text-white py-1.5 px-4 rounded-full text-xs font-bold uppercase tracking-wider">
            {featuredBadge}
          </span>
        )}
        <h3 className="font-heading absolute bottom-4 left-6 right-6 text-white text-[1.6rem] font-bold drop-shadow-lg">
          {title}
        </h3>
      </div>
      <div className="flex-1 p-10 flex flex-col items-center text-center">
        <p className="text-gray-500 leading-[1.7] mb-6 text-[1.05rem]">{description}</p>
        <ul className="list-none p-0">
          {features.map((feature) => (
            <li key={feature} className="py-[0.7rem] text-gray-600 flex items-center justify-center gap-3 text-[0.95rem]">
              <span className="text-brand-blue font-bold text-lg shrink-0">✓</span>
              {feature}
            </li>
          ))}
        </ul>
      </div>
      <div className="p-10 flex flex-col justify-center items-center text-center bg-white border-t border-gray-200">
        <div className="text-[2.5rem] font-bold text-heading leading-none mb-2 max-[480px]:text-[2rem]">
          {price}
          {priceUnit && <small className="text-base text-gray-500 font-normal">{priceUnit}</small>}
        </div>
        <p className="text-gray-500 text-[0.95rem] mb-8">{priceDetails}</p>
        <span className="bg-gradient-to-br from-brand-blue to-brand-navy text-white py-[1.1rem] px-10 rounded-lg font-bold transition-all duration-300 inline-block w-full text-center text-base">
          {isLoading ? "Redirection..." : ctaText}
        </span>
      </div>
    </>
  );

  if (isStripe) {
    return (
      <div onClick={!isLoading ? onCheckout : undefined} data-aos="flip-left" data-aos-delay={index * 200} className={cardClasses}>
        {content}
      </div>
    );
  }

  return (
    <a href={ctaHref} data-aos="flip-left" data-aos-delay={index * 200} className={cardClasses}>
      {content}
    </a>
  );
}
