import 'intl-pluralrules';
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

i18n.use(initReactI18next).init({
  fallbackLng: 'en',
  lng: 'en', // Default language
  resources: {
    en: {
      translation: require('./en.json'),
    },
    zh: {
      translation: require('./zh.json'),
    },
  },
  interpolation: {
    escapeValue: false, // React handles escaping
  },
});

export default i18n;
