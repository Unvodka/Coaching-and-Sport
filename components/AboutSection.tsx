export default function AboutSection() {
  return (
    <section id="apropos" className="bg-white py-24 px-16 w-full max-md:py-16 max-md:px-6">
      <h2
        data-aos="fade-up"
        className="font-heading text-center text-5xl mb-4 font-extrabold tracking-tight text-heading max-md:text-[2.2rem] max-[480px]:text-[1.8rem]"
      >
        À Propos
      </h2>
      <div className="flex flex-col items-center text-center max-w-[800px] mx-auto">
        <div>
          <h3 data-aos="fade-up" data-aos-delay="100" className="font-heading text-heading text-[1.8rem] mb-6 font-bold">
            Arnaud Chevallier - Votre Coach Dédié à Votre Réussite
          </h3>
          <p data-aos="fade-up" data-aos-delay="200" className="text-gray-600 mb-5 leading-[1.8] text-[1.05rem]">
            Maître-nageur diplômé et coach sportif certifié, je me consacre
            depuis plusieurs années à accompagner mes clients dans leur parcours
            de transformation physique.
          </p>
          <p data-aos="fade-up" data-aos-delay="300" className="text-gray-600 mb-5 leading-[1.8] text-[1.05rem]">
            Spécialisé dans la perte de poids et la remise en forme, j&apos;ai
            développé une approche globale qui combine plusieurs disciplines
            sportives pour des résultats durables et harmonieux.
          </p>
          <p data-aos="fade-up" data-aos-delay="400" className="text-gray-600 mb-5 leading-[1.8] text-[1.05rem]">
            Ma philosophie : un accompagnement bienveillant, des objectifs
            réalistes et une progression adaptée à votre rythme. Chaque personne
            est unique, et votre programme le sera aussi.
          </p>
          <p data-aos="fade-up" data-aos-delay="500" className="text-gray-600 mb-5 leading-[1.8] text-[1.05rem]">
            <strong className="text-heading">Basé à Valbonne</strong>,
            j&apos;interviens dans toute la région pour vous offrir le meilleur
            service possible.
          </p>
        </div>
        <div data-aos="zoom-in" data-aos-delay="600" data-aos-duration="1000" className="text-[8rem] mt-8">🏅</div>
      </div>
    </section>
  );
}
