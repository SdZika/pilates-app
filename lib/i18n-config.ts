export const locales = ['en', 'sr'] as const;
export const defaultLocale = 'en';

export type Locale = (typeof locales)[number];
