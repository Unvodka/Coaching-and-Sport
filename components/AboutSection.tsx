'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useLanguage } from '@/lib/i18n/useLanguage';
import FadeInWhenVisible from './animations/FadeInWhenVisible';

export default function AboutSection() {
  const { t } = useLanguage();

  return (
    <section
      id="apropos"
      className="bg-gray-100 py-24 px-16 w-full max-md:py-16 max-md:px-6"
    >
      <FadeInWhenVisible>
        <h2 className="font-heading text-center text-5xl mb-4 font-extrabold tracking-tight text-heading max-md:text-[2.2rem] max-[480px]:text-[1.8rem]">
          {t('about.heading.name')}
        </h2>
        <p className="text-center text-xl text-gray-500 font-semibold mb-10 max-md:text-lg">
          {t('about.heading.role')} !
        </p>
      </FadeInWhenVisible>

      <div className="max-w-[1100px] mx-auto flex flex-col lg:flex-row gap-12 items-center">

        {/* Photo */}
        <FadeInWhenVisible delay={0.1} className="shrink-0 flex justify-center">
          <div className="relative w-[280px] h-[360px] rounded-2xl overflow-hidden shadow-[0_8px_30px_rgba(0,0,0,0.12)]">
            <Image
              src="/images/arnaud-stretch.jpg"
              alt="Arnaud Chevallier — Coach sportif à Valbonne"
              fill
              className="object-cover object-top"
              sizes="280px"
            />
          </div>
        </FadeInWhenVisible>

        {/* Text */}
        <div className="flex flex-col items-center lg:items-start text-center lg:text-left max-w-[700px]">
          <FadeInWhenVisible delay={0.2}>
            <p className="text-gray-600 mb-5 leading-[1.8] text-[1.1rem]">
              {t('about.p1')}
            </p>
          </FadeInWhenVisible>
          <FadeInWhenVisible delay={0.3}>
            <p className="text-gray-600 mb-5 leading-[1.8] text-[1.1rem]">
              {t('about.p2')}
            </p>
          </FadeInWhenVisible>
          <FadeInWhenVisible delay={0.35}>
            <p className="text-gray-600 mb-8 leading-[1.8] text-[1.1rem]">
              {t('about.p3')}
            </p>
          </FadeInWhenVisible>
          <FadeInWhenVisible delay={0.4}>
            <Link
              href="/apropos"
              className="inline-flex items-center gap-2 bg-brand-blue text-white font-semibold py-4 px-10 rounded-xl text-lg shadow-lg hover:bg-blue-700 transition-all duration-300 hover:-translate-y-0.5 no-underline"
            >
              {t('about.cta')} &rarr;
            </Link>
          </FadeInWhenVisible>
        </div>

      </div>
    </section>
  );
}
