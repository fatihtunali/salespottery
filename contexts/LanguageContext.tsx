'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

type Locale = 'en' | 'tr' | 'de' | 'fr';

type Messages = {
  [key: string]: any;
};

interface LanguageContextType {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  messages: Messages;
  t: (key: string, params?: Record<string, any>) => string;
}

const LanguageContext = createContext<LanguageContextType>({
  locale: 'en',
  setLocale: () => {},
  messages: {},
  t: (key: string) => key,
});

export const useLanguage = () => useContext(LanguageContext);

const localeNames: Record<Locale, string> = {
  en: 'English',
  tr: 'Türkçe',
  de: 'Deutsch',
  fr: 'Français',
};

export { localeNames };
export type { Locale };

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>('en');
  const [messages, setMessages] = useState<Messages>({});

  useEffect(() => {
    // Load saved locale from localStorage
    const savedLocale = localStorage.getItem('selected_locale') as Locale | null;
    if (savedLocale && ['en', 'tr', 'de', 'fr'].includes(savedLocale)) {
      setLocaleState(savedLocale);
    }
  }, []);

  useEffect(() => {
    // Load messages for current locale
    const loadMessages = async () => {
      try {
        const msgs = await import(`@/messages/${locale}.json`);
        setMessages(msgs.default);
      } catch (error) {
        console.error(`Failed to load messages for locale: ${locale}`, error);
      }
    };

    loadMessages();
  }, [locale]);

  const setLocale = (newLocale: Locale) => {
    setLocaleState(newLocale);
    localStorage.setItem('selected_locale', newLocale);
  };

  // Simple translation function that supports nested keys
  const t = (key: string, params?: Record<string, any>): string => {
    const keys = key.split('.');
    let value: any = messages;

    for (const k of keys) {
      if (value && typeof value === 'object' && k in value) {
        value = value[k];
      } else {
        return key; // Return key if translation not found
      }
    }

    if (typeof value !== 'string') {
      return key;
    }

    // Replace parameters like {count}, {name}, etc.
    if (params) {
      return value.replace(/\{(\w+)\}/g, (match, paramKey) => {
        return params[paramKey] !== undefined ? String(params[paramKey]) : match;
      });
    }

    return value;
  };

  return (
    <LanguageContext.Provider value={{ locale, setLocale, messages, t }}>
      {children}
    </LanguageContext.Provider>
  );
}
