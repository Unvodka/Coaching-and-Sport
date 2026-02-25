import type { TranslationKey } from "./fr";

const en: Record<TranslationKey, string> = {
  // Nav
  "nav.home": "Home",
  "nav.services": "Services",
  "nav.offers": "Offers & Pricing",
  "nav.about": "About",
  "nav.contact": "Contact",

  // Hero
  "hero.subtitle":
    "Lifeguard and sports coach specializing in weight loss and fitness",
  "hero.cta": "Start my transformation",

  // Services section
  "services.title": "My Services",
  "services.subtitle": "Comprehensive support tailored to your goals",
  "services.learnMore": "Learn more",

  // Offers section
  "offers.title": "Offers & Pricing",
  "offers.subtitle":
    "Choose the plan that best fits your needs and goals",
  "offers.packsTitle": "Private Lesson Packs",
  "offers.packsSubtitle":
    "Book your individual sessions with great value packs",
  "offers.checkoutError": "Error creating the checkout session.",
  "offers.connectionError": "Connection error. Please try again.",
  "offers.redirecting": "Redirecting...",
  "offers.bookNow": "Book now",
  "offers.included": "What's included",
  "offers.goals": "Goals",
  "offers.showGoals": "Show goals",
  "offers.hideGoals": "Hide goals",

  // Info note
  "info.programsInclude": "All programs include:",
  "info.programsDetails":
    "Free initial assessment • Personalized follow-up • Nutrition advice • Continuous motivation",
  "info.securePayment": "Secured payment by Stripe",
  "info.paymentMethods": "SSL 256-bit encryption • 3D Secure • CB, Visa, Mastercard, Apple Pay",
  "info.sessionsNote":
    "Sessions can be used for any activity: swimming, fitness, or outdoor training",
  "info.needAdvice": "Need help choosing?",
  "info.contactMe": "Contact me",
  "info.freeConsult": "for a free 15-minute consultation!",

  // About section
  "about.title": "About",
  "about.heading": "Arnaud Chevallier, Your Coach Dedicated to Your Success",
  "about.p1":
    "Certified lifeguard and sports coach, I have been dedicated for several years to helping my clients on their physical transformation journey.",
  "about.p2":
    "Specializing in weight loss and fitness, I have developed a holistic approach that combines multiple sports disciplines for lasting and balanced results.",
  "about.p3":
    "My philosophy: supportive guidance, realistic goals, and progress adapted to your pace. Every person is unique, and your program will be too.",
  "about.p4.prefix": "Based in Valbonne",
  "about.p4.suffix":
    ", I work throughout the region to offer you the best possible service.",
  "about.cta": "Learn more",

  // About page (dedicated /apropos)
  "aboutPage.title": "About Coach-Bluewave",
  "aboutPage.subtitle":
    "Discover my journey and coaching philosophy",
  "aboutPage.heading":
    "Arnaud Chevallier — Sports Coach & Certified Lifeguard",
  "aboutPage.headingName": "Arnaud Chevallier",
  "aboutPage.headingRole": "Fitness Coach & Certified Swimming Teacher and Lifeguard",
  "aboutPage.p1":
    "Certified lifeguard and sports coach, I have been dedicated for several years to helping my clients on their physical transformation journey.",
  "aboutPage.p2":
    "Specializing in weight loss and fitness, I have developed a holistic approach that combines multiple sports disciplines for lasting and balanced results.",
  "aboutPage.p3":
    "My philosophy: supportive guidance, realistic goals, and progress adapted to your pace. Every person is unique, and your program will be too.",
  "aboutPage.p4":
    "Based in Valbonne, I work throughout the region to offer you the best possible service.",
  "aboutPage.qualificationsTitle": "My Qualifications",
  "aboutPage.q1": "State-certified Lifeguard",
  "aboutPage.q2": "Certified sports coach",
  "aboutPage.q3": "Weight loss and fitness specialist",
  "aboutPage.q4": "Sports nutrition advisor",
  "aboutPage.approachTitle": "My Approach",
  "aboutPage.approach1":
    "Complete initial assessment of your fitness level and goals",
  "aboutPage.approach2":
    "100% personalized programs adapted to your pace and constraints",
  "aboutPage.approach3":
    "Regular follow-up and adjustments to ensure your progress",
  "aboutPage.approach4":
    "Supportive and motivating guidance at every step",
  "aboutPage.ctaTitle": "Ready to get started?",
  "aboutPage.ctaText": "Contact me",
  "aboutPage.backHome": "← Back to home",

  // Contact section
  "contact.title": "Contact Me",
  "contact.subtitle": "Ready to start your transformation? Let's talk!",
  "contact.fullName": "Full Name",
  "contact.email": "Email",
  "contact.phone": "Phone",
  "contact.courseType": "Desired course type",
  "contact.select": "-- Select --",
  "contact.privateLesson": "Private Lessons",
  "contact.customProgram": "Custom Programming",
  "contact.infoRequest": "Information Request",
  "contact.message": "Your Message",
  "contact.placeholder":
    "Tell me about your goals, your current level...",
  "contact.sending": "Sending...",
  "contact.submit": "Send my Request",
  "contact.notConfigured":
    "EmailJS is not configured. Contact: chevallier.a06@gmail.com",
  "contact.success": "Message sent successfully!",
  "contact.error":
    "Error sending message. Contact: chevallier.a06@gmail.com",
  "contact.notProvided": "Not provided",

  // Footer
  "footer.text":
    "Coach-Bluewave | Arnaud Chevallier - Sports Coach & Lifeguard - All rights reserved",

  // Service detail pages
  "detail.backToServices": "Back to services",
  "detail.benefits": "Benefits",
  "detail.targetAudience": "Who Is It For?",
  "detail.seeOffers": "See offers & pricing",
  "detail.faq": "Frequently Asked Questions",

  // Security badges
  "security.securedByStripe": "Secured by Stripe · 3D Secure",
  "security.badge1.title": "100% secure payment",
  "security.badge1.desc": "SSL 256-bit encryption",
  "security.badge2.title": "3D Secure enabled",
  "security.badge2.desc": "Bank double authentication",
  "security.badge3.title": "CB, Visa, Mastercard",
  "security.badge3.desc": "Apple Pay also accepted",

  // Packs page
  "packs.title": "Private Lesson Packs",
  "packs.subtitle": "Book your individual sessions with great value packs",
  "packs.backToOffers": "← Back to offers",

  // Checkout
  "security.checkoutSecured": "Your payment was secured by Stripe · 3D Secure · SSL 256-bit",
  "checkout.success.title": "Payment successful!",
  "checkout.success.message":
    "Thank you for your trust. You will receive a confirmation email with all the details of your booking.",
  "checkout.success.backHome": "Back to home",
  "checkout.cancel.title": "Payment cancelled",
  "checkout.cancel.message":
    "Your payment has been cancelled. No amount has been charged. Feel free to come back when you're ready!",
  "checkout.cancel.seeOffers": "See offers",

  // Auth
  "auth.signIn": "Sign in",
  "auth.signOut": "Sign out",
  "auth.myPortal": "My Portal",

  // Portal - Dashboard
  "portal.dashboard": "Dashboard",
  "portal.welcome": "Welcome,",
  "portal.dashboardSubtitle": "Here is a summary of your activity",

  // Portal - Recipes
  "portal.recipes": "Recipes",
  "portal.recipes.new": "New Recipe",
  "portal.recipes.search": "Search recipes...",
  "portal.recipes.favorites": "Favorites",
  "portal.recipes.myRecipes": "My Recipes",
  "portal.recipes.all": "All",
  "portal.recipes.category": "Category",
  "portal.recipes.ingredients": "Ingredients",
  "portal.recipes.instructions": "Instructions",
  "portal.recipes.instructionsFr": "Instructions (FR)",
  "portal.recipes.instructionsEn": "Instructions (EN)",
  "portal.recipes.titleFr": "Title (FR)",
  "portal.recipes.titleEn": "Title (EN)",
  "portal.recipes.descriptionFr": "Description (FR)",
  "portal.recipes.descriptionEn": "Description (EN)",
  "portal.recipes.imageUrl": "Image URL",
  "portal.recipes.save": "Save",
  "portal.recipes.makePublic": "Make public (visible to all members)",

  // Portal - Weight
  "portal.weight": "Weight Tracking",
  "portal.weight.add": "Add entry",
  "portal.weight.current": "Current weight",
  "portal.weight.progress": "Progress",
  "portal.weight.kg": "Weight (kg)",
  "portal.weight.date": "Date",
  "portal.weight.notes": "Notes",

  // Portal - Journal
  "portal.journal": "Wellness Journal",
  "portal.journal.new": "New Entry",
  "portal.journal.mood": "Mood",
  "portal.journal.energy": "Energy",
  "portal.journal.notes": "Notes",
  "portal.journal.tags": "Tags",

  // Portal - Workouts
  "portal.workouts": "Programs",
  "portal.workouts.weeks": "weeks",
  "portal.workouts.sets": "sets",
  "portal.workouts.reps": "reps",
  "portal.workouts.rest": "rest",
  "portal.workouts.progress": "Progress",

  // Portal - Profile
  "portal.profile": "My Profile",
  "portal.profile.name": "Full Name",
  "portal.profile.email": "Email",
  "portal.profile.update": "Update",
};

export default en;
