import type { TranslationKey } from './fr';

const en: Record<TranslationKey, string> = {
  // Nav
  'nav.home': 'Home',
  'nav.services': 'Services',
  'nav.offers': 'Offers & Pricing',
  'nav.about': 'About',
  'nav.contact': 'Contact',

  // Hero
  'hero.subtitle':
    'Lifeguard and sports educator specializing in weight loss, fitness and well-being',
  'hero.subtitle.line1': 'Lifeguard and sports educator',
  'hero.subtitle.line2': 'Swimming, fitness and well-being',
  'hero.cta': 'Start my transformation',

  // Services section
  'services.title': 'My Services',
  'services.subtitle': 'Comprehensive support tailored to your goals',
  'services.learnMore': 'Learn more',

  // Offers section
  'offers.title': 'Offers & Pricing',
  'offers.subtitle': 'Choose the plan that best fits your needs and goals',
  'offers.packsTitle': 'Private Lesson Packs',
  'offers.packsSubtitle':
    'Book your individual sessions with great value packs',
  'offers.checkoutError': 'Error creating the checkout session.',
  'offers.connectionError': 'Connection error. Please try again.',
  'offers.redirecting': 'Redirecting...',
  'offers.bookNow': 'Book now',
  'offers.included': "What's included",
  'offers.goals': 'Goals',
  'offers.showGoals': 'Show goals',
  'offers.hideGoals': 'Hide goals',
  'offers.showFeatures': 'See details',
  'offers.hideFeatures': 'Hide details',

  // Info note
  'info.programsInclude': 'All programs include:',
  'info.programsDetails':
    'Free initial assessment • Personalized follow-up • Nutrition advice • Continuous motivation',
  'info.securePayment': 'Secured payment by Stripe',
  'info.paymentMethods':
    'SSL encryption • 3D Secure • CB, Visa, Mastercard, Apple Pay, Google Pay',
  'info.sessionsNote':
    'Sessions can be used for any activity: swimming, fitness, or outdoor training',
  'info.needAdvice': 'Need help choosing?',
  'info.contactMe': 'Contact me',
  'info.freeConsult': 'for a free 15-minute consultation!',

  // About section
  'about.title': 'About',
  'about.heading.name': 'Arnaud Chevallier',
  'about.heading.role': 'A coach dedicated to your success',
  'about.p1':
    'For over a decade I have dedicated myself to teaching swimming and sports activities.',
  'about.p2':
    'Specializing in fitness, weight loss, well-being and mental health, I have developed a holistic approach that combines multiple sports disciplines for lasting and balanced results.',
  'about.p3':
    'I can welcome you at home and also work throughout the Alpes-Maritimes region to offer you the service that suits you.',
  'about.cta': 'Learn more',

  // About page (dedicated /apropos)
  'aboutPage.title': 'Who is behind Coach-Bluewave?',
  'aboutPage.subtitle': 'Discover my journey and coaching philosophy',
  'aboutPage.heading': 'Arnaud Chevallier — Sports Coach & Certified Lifeguard',
  'aboutPage.headingName': 'Arnaud Chevallier',
  'aboutPage.headingRole': 'Sports Coach & Lifeguard',
  'aboutPage.p1':
    'A lifeguard and sports educator for over ten years, I grew up on the French Riviera, between Antibes and its surroundings, between sea and mountains — a natural environment that has never left me. From an early age, I turned to sport in all its forms: in the water, on land, alone or as a team, with a constant desire to move and always push a little further.',
  'aboutPage.p2':
    "I've had the chance to work in incredible places: the Thermes Marins de Monte-Carlo, the Maybourne Riviera, Thalazur, Aquavelo, Aquafit, and many more. I've also worked in other countries, with other methods. All of this taught me to adapt, to listen, and to feel comfortable everywhere and with everyone.",
  'aboutPage.p3':
    "Specializing in multi-sport practice, weight loss, fitness and well-being, I've developed a holistic approach that combines multiple disciplines for lasting results. But beyond technique, what truly fascinates me is people — psychology, what motivates them, what holds them back. This is also what I teach, through technical and fun exercises, practical advice and genuine conversations.",
  'aboutPage.p4':
    "Balance is at the heart of everything I do: between body and mind, between effort and pleasure, between what we eat and what we burn. Well-being doesn't come from others — it comes from within, when we learn to find that balance between movement, nutrition and mindset.",
  'aboutPage.p5':
    'My philosophy is simple: caring support, realistic goals, and progress adapted to your pace. Every person is unique, and your program will be too.',
  'aboutPage.p6':
    "A nature lover, smiling and full of energy, I'm one of those people who make you want to get moving — without overthinking it. Based in Valbonne, I work across the French Riviera and the Var. By a pool, outdoors or at your home, I love to share with simplicity, sincerity and good humour.",
  'aboutPage.qualificationsTitle': 'My Strengths',
  'aboutPage.q1': '10 years of experience as a professional, a life of experience of training',
  'aboutPage.q2': 'Swimming lessons, aquafitness (group), fitness and aquabike. Introductory pilates and freediving.',
  'aboutPage.q3': 'Weight loss, fitness, well-being and mental health',
  'aboutPage.q4': 'Nutrition advice',
  'aboutPage.approachTitle': 'My Approach',
  'aboutPage.approach1':
    'Initial assessment for a 100% personalised programme adapted to your pace, goals and constraints',
  'aboutPage.approach2':
    'Quality of life improvements for better performance',
  'aboutPage.approach3':
    'Motivation in a fun or technical setting depending on the circumstances',
  'aboutPage.approach4': 'Caring support all the way through',
  'aboutPage.ctaTitle': 'Ready to get started?',
  'aboutPage.ctaText': 'Contact me',
  'aboutPage.backHome': '← Back to home',

  // Contact section
  'contact.title': 'Contact Me',
  'contact.subtitle': "Ready to start your transformation? Let's talk!",
  'contact.fullName': 'Full Name',
  'contact.email': 'Email',
  'contact.phone': 'Phone',
  'contact.courseType': 'Desired course type',
  'contact.select': '-- Select --',
  'contact.privateLesson': 'Private Lessons',
  'contact.customProgram': 'Custom Programming',
  'contact.infoRequest': 'Information Request',
  'contact.message': 'Your Message',
  'contact.placeholder': 'Tell me about your goals, your current level...',
  'contact.sending': 'Sending...',
  'contact.submit': 'Send my Request',
  'contact.notConfigured':
    'EmailJS is not configured. Contact: chevallier.a06@gmail.com',
  'contact.success': 'Message sent successfully!',
  'contact.error': 'Error sending message. Contact: chevallier.a06@gmail.com',
  'contact.notProvided': 'Not provided',

  // Footer
  'footer.text':
    'Coach-Bluewave | Arnaud Chevallier - Sports Coach & Lifeguard - All rights reserved',
  'footer.legal': 'Legal Notice',
  'footer.privacy': 'Privacy Policy',
  'footer.cgv': 'Terms & Conditions',

  // Service detail pages
  'detail.backToServices': 'Back to services',
  'detail.benefits': 'Benefits',
  'detail.targetAudience': 'Who Is It For?',
  'detail.seeOffers': 'See offers & pricing',
  'detail.faq': 'Frequently Asked Questions',

  // Security badges
  'security.securedByStripe': 'Secured by Stripe · 3D Secure',
  'security.badge1.title': '100% secure payment',
  'security.badge1.desc': 'SSL encryption',
  'security.badge2.title': '3D Secure enabled',
  'security.badge2.desc': 'Bank double authentication',
  'security.badge3.title': 'CB, Visa, Mastercard',
  'security.badge3.desc': 'Apple Pay & Google Pay accepted',

  // Packs page
  'packs.title': 'Private Lesson Packs',
  'packs.subtitle': 'Book your individual sessions with great value packs',
  'packs.backToOffers': '← Back to offers',

  // Checkout
  'security.checkoutSecured':
    'Your payment was secured by Stripe · 3D Secure · SSL',
  'checkout.success.title': 'Payment successful!',
  'checkout.success.message':
    'Thank you for your trust. You will receive a confirmation email with all the details of your booking.',
  'checkout.success.backHome': 'Back to home',
  'checkout.cancel.title': 'Payment cancelled',
  'checkout.cancel.message':
    "Your payment has been cancelled. No amount has been charged. Feel free to come back when you're ready!",
  'checkout.cancel.seeOffers': 'See offers',

  // Auth
  'auth.signIn': 'Sign in',
  'auth.signOut': 'Sign out',
  'auth.myPortal': 'My Portal',

  // Portal - Dashboard
  'portal.dashboard': 'Dashboard',
  'portal.welcome': 'Welcome,',
  'portal.dashboardSubtitle': 'Here is a summary of your activity',

  // Portal - Recipes
  'portal.recipes': 'Recipes',
  'portal.recipes.new': 'New Recipe',
  'portal.recipes.search': 'Search recipes...',
  'portal.recipes.all': 'All',
  'portal.recipes.category': 'Category',
  'portal.recipes.ingredients': 'Ingredients',
  'portal.recipes.instructions': 'Instructions',
  'portal.recipes.instructionsFr': 'Instructions (FR)',
  'portal.recipes.instructionsEn': 'Instructions (EN)',
  'portal.recipes.titleFr': 'Title (FR)',
  'portal.recipes.titleEn': 'Title (EN)',
  'portal.recipes.descriptionFr': 'Description (FR)',
  'portal.recipes.descriptionEn': 'Description (EN)',
  'portal.recipes.imageUrl': 'Image URL',
  'portal.recipes.save': 'Save',
  'portal.recipes.makePublic': 'Make public (visible to all members)',

  // Portal - Weight
  'portal.weight': 'Weight Tracking',
  'portal.weight.add': 'Add entry',
  'portal.weight.current': 'Current weight',
  'portal.weight.progress': 'Progress',
  'portal.weight.kg': 'Weight (kg)',
  'portal.weight.date': 'Date',
  'portal.weight.notes': 'Notes',

  // Portal - Journal
  'portal.journal': 'Wellness Journal',
  'portal.journal.new': 'New Entry',
  'portal.journal.mood': 'Mood',
  'portal.journal.energy': 'Energy',
  'portal.journal.notes': 'Notes',
  'portal.journal.tags': 'Tags',

  // Portal - Workouts
  'portal.workouts': 'Programs',
  'portal.workouts.weeks': 'weeks',
  'portal.workouts.sets': 'sets',
  'portal.workouts.reps': 'reps',
  'portal.workouts.rest': 'rest',
  'portal.workouts.progress': 'Progress',

  // Portal - Coach
  'portal.coach': 'Coach',
  'portal.coach.users': 'Users',
  'portal.coach.programs': 'Programs',
  'portal.coach.users.title': 'User Management',
  'portal.coach.users.search': 'Search users...',
  'portal.coach.users.role': 'Role',
  'portal.coach.users.joined': 'Joined',
  'portal.coach.users.assignedPrograms': 'Assigned programs',
  'portal.coach.users.weightEntries': 'Weight entries',
  'portal.coach.users.moodEntries': 'Journal entries',
  'portal.coach.users.noUsers': 'No users found',
  'portal.coach.users.assignProgram': 'Assign a program',
  'portal.coach.users.removeAssignment': 'Remove',
  'portal.coach.users.message': 'Message (optional)',
  'portal.coach.users.assign': 'Assign',
  'portal.coach.programs.title': 'Program Management',
  'portal.coach.programs.new': 'New Program',
  'portal.coach.programs.edit': 'Edit',
  'portal.coach.programs.delete': 'Delete',
  'portal.coach.programs.deleteConfirm': 'Delete this program?',
  'portal.coach.programs.assignments': 'assigned',
  'portal.coach.programs.public': 'Public',
  'portal.coach.programs.private': 'Private',
  'portal.coach.assignedToYou': 'Assigned to you',

  // Portal - Profile
  'portal.subscription': 'My subscription',
  'portal.profile': 'My Profile',
  'portal.contact': 'Contact Coach',
  'portal.profile.name': 'First Name',
  'portal.profile.email': 'Email',
  'portal.profile.update': 'Update',

  // Cookie consent
  'cookies.text':
    'This site uses cookies to measure audience and improve your experience. You can accept or refuse non-essential cookies.',
  'cookies.learnMore': 'Learn more',
  'cookies.accept': 'Accept',
  'cookies.refuse': 'Refuse',

  // Contact RGPD
  'contact.rgpdConsent':
    'I agree that my data will be processed in accordance with the privacy policy.',

  // Blog
  'blog.title': 'Blog',
  'blog.subtitle':
    'Expert tips on sport, swimming, fitness and nutrition to reach your goals',
  'blog.readingTime': 'read',
  'blog.readArticle': 'Read article →',
  'blog.backToBlog': '← Back to blog',
  'blog.by': 'By Arnaud Chevallier',
  'blog.relatedArticles': 'Related Articles',
  'blog.readMore': 'Read →',
  'blog.cta.title': 'Ready to take action?',
  'blog.cta.subtitle':
    'Get personalized coaching from a certified sports coach in Valbonne.',
  'blog.cta.button': 'Book a discovery session',
};

export default en;
