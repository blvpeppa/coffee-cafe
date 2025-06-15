import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import translationEN from './locales/en/translation.json';
import translationFR from './locales/fr/translation.json';
import translationRW from './locales/rw/translation.json';

const resources = {
  en: { translation: translationEN },
  fr: { translation: translationFR },
  rw: { translation: translationRW },
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: 'en', // default language
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;

export const languages = [
  { code: 'en', name: 'English' },
  { code: 'fr', name: 'Français' },
  { code: 'rw', name: 'Kinyarwanda' },
];