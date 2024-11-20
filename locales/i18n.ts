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

export const getLanguageSetting = (language: string) => {
  switch (language) {
    case 'English':
      return 'en';
    case '简体中文':
      return 'zh';
    default:
      return 'en';
  }
};

export default i18n;
