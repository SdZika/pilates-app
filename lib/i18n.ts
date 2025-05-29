import { Locale } from './i18n-config';

export const getDictionary = async (locale: Locale) => {
  return import(`../locales/${locale}.json`).then((module) => module.default);
};
