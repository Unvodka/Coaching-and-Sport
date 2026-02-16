"use client";

import { useState, FormEvent, useEffect } from "react";
import { motion } from "framer-motion";
import emailjs from "@emailjs/browser";
import { useLanguage } from "@/lib/i18n/useLanguage";
import FadeInWhenVisible from "./animations/FadeInWhenVisible";

export default function ContactSection() {
  const [fromName, setFromName] = useState("");
  const [fromEmail, setFromEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [formule, setFormule] = useState("");
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { t } = useLanguage();

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
      alert(t("contact.notConfigured"));
      setIsSubmitting(false);
      return;
    }

    const templateParams = {
      from_name: fromName,
      from_email: fromEmail,
      phone: phone || t("contact.notProvided"),
      formule,
      message,
      to_email: "chevallier.a06@gmail.com",
    };

    emailjs.send(serviceId, templateId, templateParams).then(
      () => {
        alert(`✅ ${t("contact.success")}`);
        setFromName("");
        setFromEmail("");
        setPhone("");
        setFormule("");
        setMessage("");
        setIsSubmitting(false);
      },
      () => {
        alert(`❌ ${t("contact.error")}`);
        setIsSubmitting(false);
      }
    );
  };

  return (
    <section
      id="contact"
      className="bg-gradient-to-br from-slate-50 to-slate-100 py-14 px-16 w-full max-md:py-10 max-md:px-6"
    >
      <FadeInWhenVisible>
        <h2 className="font-heading text-center text-5xl mb-4 font-extrabold tracking-tight text-heading max-md:text-[2.2rem] max-[480px]:text-[1.8rem]">
          {t("contact.title")}
        </h2>
      </FadeInWhenVisible>
      <FadeInWhenVisible delay={0.1}>
        <p className="text-center text-gray-500 text-lg mb-10 max-w-[700px] mx-auto">
          {t("contact.subtitle")}
        </p>
      </FadeInWhenVisible>

      <FadeInWhenVisible delay={0.2} duration={0.8}>
        <form
          onSubmit={handleSubmit}
          className="max-w-[700px] mx-auto bg-white p-8 rounded-2xl shadow-[0_8px_30px_rgba(0,0,0,0.08)] border border-gray-200 max-md:p-6 max-[480px]:p-4"
        >
          <div className="mb-3.5">
            <label className="block mb-1.5 text-gray-700 font-semibold text-[0.95rem]">
              {t("contact.fullName")} *
            </label>
            <input
              type="text"
              required
              value={fromName}
              onChange={(e) => setFromName(e.target.value)}
              className="w-full p-3.5 border-2 border-gray-200 rounded-lg text-base transition-all duration-300 font-sans focus:outline-none focus:border-brand-blue focus:shadow-[0_0_0_3px_rgba(37,99,235,0.1)]"
            />
          </div>

          <div className="mb-3.5">
            <label className="block mb-1.5 text-gray-700 font-semibold text-[0.95rem]">
              {t("contact.email")} *
            </label>
            <input
              type="email"
              required
              value={fromEmail}
              onChange={(e) => setFromEmail(e.target.value)}
              className="w-full p-3.5 border-2 border-gray-200 rounded-lg text-base transition-all duration-300 font-sans focus:outline-none focus:border-brand-blue focus:shadow-[0_0_0_3px_rgba(37,99,235,0.1)]"
            />
          </div>

          <div className="mb-3.5">
            <label className="block mb-1.5 text-gray-700 font-semibold text-[0.95rem]">
              {t("contact.phone")}
            </label>
            <input
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="w-full p-3.5 border-2 border-gray-200 rounded-lg text-base transition-all duration-300 font-sans focus:outline-none focus:border-brand-blue focus:shadow-[0_0_0_3px_rgba(37,99,235,0.1)]"
            />
          </div>

          <div className="mb-3.5">
            <label className="block mb-1.5 text-gray-700 font-semibold text-[0.95rem]">
              {t("contact.courseType")} *
            </label>
            <select
              required
              value={formule}
              onChange={(e) => setFormule(e.target.value)}
              className="w-full p-3.5 border-2 border-gray-200 rounded-lg text-base transition-all duration-300 font-sans focus:outline-none focus:border-brand-blue focus:shadow-[0_0_0_3px_rgba(37,99,235,0.1)]"
            >
              <option value="">{t("contact.select")}</option>
              <option value="particulier">{t("contact.privateLesson")}</option>
              <option value="programmation">{t("contact.customProgram")}</option>
              <option value="info">{t("contact.infoRequest")}</option>
            </select>
          </div>

          <div className="mb-3.5">
            <label className="block mb-1.5 text-gray-700 font-semibold text-[0.95rem]">
              {t("contact.message")} *
            </label>
            <textarea
              required
              placeholder={t("contact.placeholder")}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="w-full p-3.5 border-2 border-gray-200 rounded-lg text-base transition-all duration-300 font-sans min-h-[90px] resize-y focus:outline-none focus:border-brand-blue focus:shadow-[0_0_0_3px_rgba(37,99,235,0.1)]"
            />
          </div>

          <motion.button
            type="submit"
            disabled={isSubmitting}
            whileHover={{ y: -3, boxShadow: "0 10px 25px rgba(37,99,235,0.3)" }}
            whileTap={{ scale: 0.98 }}
            className="bg-gradient-to-br from-brand-blue to-brand-navy text-white py-4 px-12 border-none rounded-lg text-[1.1rem] font-bold cursor-pointer transition-all duration-300 w-1/2 mx-auto block disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {isSubmitting ? t("contact.sending") : t("contact.submit")}
          </motion.button>
        </form>
      </FadeInWhenVisible>
    </section>
  );
}
