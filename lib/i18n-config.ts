export const locales = ['en', 'sr'] as const;
export const defaultLocale = 'sr';

export type Locale = (typeof locales)[number];
