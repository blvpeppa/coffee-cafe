import React, { createContext, useState, useEffect } from 'react';

const translations = {
  en: {
    navbar: {
      home: "Home",
      about: "About",
      products: "Services & Products",
      visits: "Visits",
      training: "Training",
      archive: "Archive",
      contact: "Contact",
      callUs: "Call us",
      emailUs: "Email us"
    },
    hero: {
      titlePart1: "RABBIT",
      titlePart2: "GENETIC CENTER",
      subtitle: "Leading innovation in sustainable rabbit farming & genetics.",
      cta: "Learn More"
    },
    banner: {
      title: "Why Choose Kigali Rabbit Center?",
      description: "We are the first company to introduce Rabbit Artificial Insemination system in East African Community. Since 2018, we have been a leading force in sustainable rabbit farming, genetics, training, and innovation.",
      careAdvice: "Care Advices",
      customerSupport: "Customer Supports",
      emergencyServices: "Emergency Services",
      vetHelp: {
        title: "Veterinary",
        subtitle: "Help",
        description: "Our experienced team provides expert veterinary assistance to ensure optimal health and breeding of rabbits using the latest technologies."
      },
      moreAbout: "More About"
    }
  },
  fr: {
    navbar: {
      home: "Accueil",
      about: "À propos",
      products: "Services & Produits",
      visits: "Visites",
      training: "Formation",
      archive: "Archives",
      contact: "Contact",
      callUs: "Appelez-nous",
      emailUs: "Envoyez-nous un email"
    },
    hero: {
      titlePart1: "CENTRE DE",
      titlePart2: "GÉNÉTIQUE LAPIN",
      subtitle: "Leader de l'innovation dans l'élevage durable de lapins et la génétique.",
      cta: "En savoir plus"
    },
    banner: {
      title: "Pourquoi choisir le Centre de Lapins de Kigali?",
      description: "Nous sommes la première entreprise à introduire le système d'insémination artificielle pour lapins dans la Communauté d'Afrique de l'Est. Depuis 2018, nous sommes un leader dans l'élevage durable de lapins, la génétique, la formation et l'innovation.",
      careAdvice: "Conseils de soins",
      customerSupport: "Support client",
      emergencyServices: "Services d'urgence",
      vetHelp: {
        title: "Aide",
        subtitle: "Vétérinaire",
        description: "Notre équipe expérimentée fournit une assistance vétérinaire experte pour assurer une santé et une reproduction optimales des lapins en utilisant les dernières technologies."
      },
      moreAbout: "En savoir plus"
    }
  },
  rw: {
    navbar: {
      home: "Ahabanza",
      about: "Ibyerekeye",
      products: "Serivisi & Ibicuruzwa",
      visits: "Gusura",
      training: "Amahugurwa",
      archive: "Ibyabitswe",
      contact: "Twandikire",
      callUs: "Duhamagara",
      emailUs: "Tungura email"
    },
    hero: {
      titlePart1: "IKIGO CY'",
      titlePart2: "UBWOKO B'URUBYO",
      subtitle: "Kuyobora imikoranire myiza mu buhinzi n'ubwoko bw'urubyaro.",
      cta: "Menya byinshi"
    },
    banner: {
      title: "Kuki guhitamo Kigali Rabbit Center?",
      description: "Turibo isosiyete ya mbere gutanga sisitemu yo gutera urubyaro rw'urubyaro rw'inkeri mu karere ka Afurika y'Iburasirazuba. Kuva mu 2018, turi imbaraga zihangana mu buhinzi bw'inkeri, ubwoko, amahugurwa, no guteza imbere.",
      careAdvice: "Inama zo kwita",
      customerSupport: "Inkunga z'abakiriya",
      emergencyServices: "Serivisi z'ihutirwa",
      vetHelp: {
        title: "Ubuvuzi",
        subtitle: "bw'inkeri",
        description: "Itsinda ryacu rifite ubuhanga riha inkunga y'ubuvuzi bw'inkeri bwiza kugirango dushobore kugira ubuzima bwiza no guteza imbere urubyaro rw'inkeri dukoresha ibikoresho bya vuba aha."
      },
      moreAbout: "Menya byinshi"
    }
  }
};

export const TranslationContext = createContext();

export const TranslationProvider = ({ children }) => {
  const [language, setLanguage] = useState('en');
  const [t, setT] = useState(translations[language]);

  useEffect(() => {
    const savedLang = localStorage.getItem('preferredLanguage');
    if (savedLang && translations[savedLang]) {
      setLanguage(savedLang);
      setT(translations[savedLang]);
    }
  }, []);

  const changeLanguage = (lang) => {
    setLanguage(lang);
    setT(translations[lang]);
    localStorage.setItem('preferredLanguage', lang);
  };

  return (
    <TranslationContext.Provider value={{ t, changeLanguage, language }}>
      {children}
    </TranslationContext.Provider>
  );
};