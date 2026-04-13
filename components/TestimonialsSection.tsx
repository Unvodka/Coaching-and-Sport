'use client';

import { useLanguage } from '@/lib/i18n/useLanguage';
import FadeInWhenVisible from './animations/FadeInWhenVisible';

const TESTIMONIALS_FR = [
  {
    name: 'Sophie M.',
    location: 'Valbonne',
    activity: 'Natation',
    text: 'En 10 séances avec Arnaud, j\'ai perdu 4kg et retrouvé confiance en moi. Sa pédagogie est bienveillante et vraiment efficace. Je recommande sans hésiter !',
    stars: 5,
    initial: 'S',
  },
  {
    name: 'Thomas R.',
    location: 'Sophia Antipolis',
    activity: 'Fitness plein air',
    text: 'Arnaud a totalement transformé ma condition physique. Les séances outdoor sont incroyables. Professionnel, ponctuel et toujours motivant — exactement ce dont j\'avais besoin.',
    stars: 5,
    initial: 'T',
  },
  {
    name: 'Marie-Claire D.',
    location: 'Mougins',
    activity: 'Aquafitness',
    text: 'J\'ai enfin trouvé un coach qui adapte vraiment le programme à mes douleurs articulaires. L\'aquafitness avec Arnaud est doux, efficace et vraiment fun !',
    stars: 5,
    initial: 'M',
  },
];

const TESTIMONIALS_EN = [
  {
    name: 'Sophie M.',
    location: 'Valbonne',
    activity: 'Swimming',
    text: 'In 10 sessions with Arnaud, I lost 4kg and regained my confidence. His coaching approach is supportive and truly effective. I recommend him without hesitation!',
    stars: 5,
    initial: 'S',
  },
  {
    name: 'Thomas R.',
    location: 'Sophia Antipolis',
    activity: 'Outdoor Fitness',
    text: 'Arnaud completely transformed my physical condition. The outdoor sessions are incredible. Professional, punctual and always motivating — exactly what I needed.',
    stars: 5,
    initial: 'T',
  },
  {
    name: 'Marie-Claire D.',
    location: 'Mougins',
    activity: 'Aquafitness',
    text: 'I finally found a coach who truly adapts the program to my joint pain. Aquafitness with Arnaud is gentle, effective and genuinely fun!',
    stars: 5,
    initial: 'M',
  },
];

function Stars({ count }: { count: number }) {
  return (
    <div className="flex gap-0.5 mb-3" aria-label={`${count} étoiles sur 5`}>
      {Array.from({ length: count }).map((_, i) => (
        <span key={i} className="text-amber-400 text-lg leading-none">★</span>
      ))}
    </div>
  );
}

export default function TestimonialsSection() {
  const { locale } = useLanguage();
  const testimonials = locale === 'en' ? TESTIMONIALS_EN : TESTIMONIALS_FR;
  const title = locale === 'en' ? 'What my clients say' : 'Ce que disent mes clients';
  const subtitle = locale === 'en'
    ? 'Real results, real people — on the French Riviera'
    : 'Des résultats concrets, des vraies personnes — sur la Côte d\'Azur';
  const googleLabel = locale === 'en' ? 'Verified reviews' : 'Avis vérifiés';

  return (
    <section
      aria-labelledby="testimonials-heading"
      className="py-24 px-16 w-full bg-white max-md:py-16 max-md:px-6"
    >
      <FadeInWhenVisible>
        <h2
          id="testimonials-heading"
          className="font-heading text-center text-5xl mb-3 font-extrabold tracking-tight text-heading max-md:text-[2.2rem] max-[480px]:text-[1.8rem]"
        >
          {title}
        </h2>
        <p className="text-center text-gray-500 text-lg mb-2">{subtitle}</p>

        {/* Google rating badge */}
        <div className="flex justify-center mb-12">
          <div className="inline-flex items-center gap-2 bg-gray-50 border border-gray-200 rounded-full px-5 py-2">
            <div className="flex gap-0.5">
              {Array.from({ length: 5 }).map((_, i) => (
                <span key={i} className="text-amber-400 text-base leading-none">★</span>
              ))}
            </div>
            <span className="text-sm font-bold text-gray-800">5,0</span>
            <span className="text-sm text-gray-400">· Google · {googleLabel}</span>
          </div>
        </div>
      </FadeInWhenVisible>

      <div className="max-w-[1100px] mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
        {testimonials.map((t, i) => (
          <FadeInWhenVisible key={i} delay={i * 0.1}>
            <article className="bg-gray-50 rounded-2xl p-7 border border-gray-100 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-300 h-full flex flex-col">
              <Stars count={t.stars} />

              <blockquote className="text-gray-600 leading-[1.75] text-[1rem] italic flex-1 mb-5">
                &ldquo;{t.text}&rdquo;
              </blockquote>

              <footer className="flex items-center gap-3">
                {/* Avatar initials */}
                <div className="w-10 h-10 rounded-full bg-brand-blue text-white flex items-center justify-center font-bold text-sm shrink-0">
                  {t.initial}
                </div>
                <div>
                  <p className="font-bold text-gray-900 text-sm leading-tight">{t.name}</p>
                  <p className="text-gray-400 text-xs">{t.location} · {t.activity}</p>
                </div>
              </footer>
            </article>
          </FadeInWhenVisible>
        ))}
      </div>
    </section>
  );
}
