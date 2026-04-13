import { Metadata } from 'next';
import LandingPageClient from './LandingPageClient';

export const metadata: Metadata = {
  title: 'Pack 10 Séances Particulières — Coach Bluewave | Valbonne, Côte d\'Azur',
  description:
    'Transformez votre corps en 10 séances avec Arnaud Chevallier, éducateur sportif diplômé d\'État à Valbonne. Natation, fitness, aquafitness. 499€ soit 249,50€ net après crédit d\'impôt SAP.',
  robots: { index: false }, // landing page ads — pas d'indexation SEO
  openGraph: {
    title: 'Pack 10 Séances — Coach Bluewave',
    description: 'Coaching sportif personnalisé à Valbonne. 499€ → 249,50€ après crédit d\'impôt.',
    images: ['/images/arnaud-pushup-pool.jpg'],
  },
};

export default function DecouvertePage() {
  return <LandingPageClient />;
}
