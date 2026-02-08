"use client";

import { useState, FormEvent, useEffect } from "react";
import emailjs from "@emailjs/browser";

export default function ContactSection() {
  const [fromName, setFromName] = useState("");
  const [fromEmail, setFromEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [formule, setFormule] = useState("");
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const publicKey = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY;
    if (publicKey && publicKey !== "YOUR_PUBLIC_KEY") {
      emailjs.init(publicKey);
    }
  }, []);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const serviceId = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID;
    const templateId = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID;

    if (
      !serviceId ||
      !templateId ||
      serviceId === "YOUR_SERVICE_ID" ||
      templateId === "YOUR_TEMPLATE_ID"
    ) {
      alert(
        "EmailJS n'est pas configuré. Contactez : chevallier.a06@gmail.com"
      );
      setIsSubmitting(false);
      return;
    }

    const templateParams = {
      from_name: fromName,
      from_email: fromEmail,
      phone: phone || "Non renseigné",
      formule,
      message,
      to_email: "chevallier.a06@gmail.com",
    };

    emailjs.send(serviceId, templateId, templateParams).then(
      () => {
        alert("✅ Message envoyé avec succès !");
        setFromName("");
        setFromEmail("");
        setPhone("");
        setFormule("");
        setMessage("");
        setIsSubmitting(false);
      },
      () => {
        alert(
          "❌ Erreur lors de l'envoi. Contactez : chevallier.a06@gmail.com"
        );
        setIsSubmitting(false);
      }
    );
  };

  return (
    <section
      id="contact"
      className="bg-gradient-to-br from-slate-50 to-slate-100 py-24 px-16 w-full max-md:py-16 max-md:px-6"
    >
      <h2 data-aos="fade-up" className="font-heading text-center text-5xl mb-4 font-extrabold tracking-tight text-heading max-md:text-[2.2rem] max-[480px]:text-[1.8rem]">
        Contactez-Moi
      </h2>
      <p data-aos="fade-up" data-aos-delay="100" className="text-center text-gray-500 text-lg mb-16 max-w-[700px] mx-auto">
        Prêt à commencer votre transformation ? Parlons-en !
      </p>

      <form
        onSubmit={handleSubmit}
        data-aos="fade-up"
        data-aos-delay="200"
        data-aos-duration="1000"
        className="max-w-[700px] mx-auto bg-white p-12 rounded-2xl shadow-[0_8px_30px_rgba(0,0,0,0.08)] border border-gray-200 max-md:p-8 max-[480px]:p-6"
      >
        <div className="mb-7">
          <label className="block mb-2.5 text-gray-700 font-semibold text-[0.95rem]">
            Nom Complet *
          </label>
          <input
            type="text"
            required
            value={fromName}
            onChange={(e) => setFromName(e.target.value)}
            className="w-full p-4 border-2 border-gray-200 rounded-lg text-base transition-all duration-300 font-sans focus:outline-none focus:border-brand-blue focus:shadow-[0_0_0_3px_rgba(37,99,235,0.1)]"
          />
        </div>

        <div className="mb-7">
          <label className="block mb-2.5 text-gray-700 font-semibold text-[0.95rem]">
            Email *
          </label>
          <input
            type="email"
            required
            value={fromEmail}
            onChange={(e) => setFromEmail(e.target.value)}
            className="w-full p-4 border-2 border-gray-200 rounded-lg text-base transition-all duration-300 font-sans focus:outline-none focus:border-brand-blue focus:shadow-[0_0_0_3px_rgba(37,99,235,0.1)]"
          />
        </div>

        <div className="mb-7">
          <label className="block mb-2.5 text-gray-700 font-semibold text-[0.95rem]">
            Téléphone
          </label>
          <input
            type="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="w-full p-4 border-2 border-gray-200 rounded-lg text-base transition-all duration-300 font-sans focus:outline-none focus:border-brand-blue focus:shadow-[0_0_0_3px_rgba(37,99,235,0.1)]"
          />
        </div>

        <div className="mb-7">
          <label className="block mb-2.5 text-gray-700 font-semibold text-[0.95rem]">
            Type de cours souhaité *
          </label>
          <select
            required
            value={formule}
            onChange={(e) => setFormule(e.target.value)}
            className="w-full p-4 border-2 border-gray-200 rounded-lg text-base transition-all duration-300 font-sans focus:outline-none focus:border-brand-blue focus:shadow-[0_0_0_3px_rgba(37,99,235,0.1)]"
          >
            <option value="">-- Sélectionnez --</option>
            <option value="particulier">Cours Particuliers</option>
            <option value="programmation">Programmation Sur Mesure</option>
            <option value="info">Demande d&apos;information</option>
          </select>
        </div>

        <div className="mb-7">
          <label className="block mb-2.5 text-gray-700 font-semibold text-[0.95rem]">
            Votre Message *
          </label>
          <textarea
            required
            placeholder="Parlez-moi de vos objectifs, votre niveau actuel..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="w-full p-4 border-2 border-gray-200 rounded-lg text-base transition-all duration-300 font-sans min-h-[150px] resize-y focus:outline-none focus:border-brand-blue focus:shadow-[0_0_0_3px_rgba(37,99,235,0.1)]"
          />
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="bg-gradient-to-br from-brand-blue to-brand-navy text-white py-5 px-12 border-none rounded-lg text-[1.1rem] font-bold cursor-pointer transition-all duration-300 w-full hover:-translate-y-[3px] hover:shadow-[0_10px_25px_rgba(37,99,235,0.3)] disabled:opacity-60 disabled:cursor-not-allowed"
        >
          {isSubmitting ? "Envoi en cours..." : "Envoyer ma Demande"}
        </button>
      </form>
    </section>
  );
}
