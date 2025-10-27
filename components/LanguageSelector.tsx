'use client';

import { useState, useRef, useEffect } from 'react';
import { useLanguage, Locale, localeNames } from '@/contexts/LanguageContext';
import { ChevronDownIcon, LanguageIcon } from '@heroicons/react/24/outline';

export default function LanguageSelector() {
  const { locale, setLocale } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLocaleChange = (newLocale: Locale) => {
    setLocale(newLocale);
    setIsOpen(false);
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-3 py-2 text-gray-700 hover:text-amber-600 transition-colors"
        aria-label="Select language"
      >
        <LanguageIcon className="w-5 h-5" />
        <span className="text-sm font-medium">{locale.toUpperCase()}</span>
        <ChevronDownIcon
          className={`w-4 h-4 transition-transform ${isOpen ? 'rotate-180' : ''}`}
        />
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50">
          {Object.entries(localeNames).map(([code, name]) => (
            <button
              key={code}
              onClick={() => handleLocaleChange(code as Locale)}
              className={`w-full text-left px-4 py-2 text-sm hover:bg-amber-50 transition-colors ${
                locale === code ? 'bg-amber-50 text-amber-700 font-medium' : 'text-gray-700'
              }`}
            >
              <div className="flex items-center justify-between">
                <span>{name}</span>
                {locale === code && (
                  <span className="text-amber-600">✓</span>
                )}
              </div>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
