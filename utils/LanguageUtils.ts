
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

export const fileMap: Record<string, any> = {
  en: require('@/assets/questions/Questions-en.txt'),
  zh: require('@/assets/questions/Questions-zh.txt'),
};
