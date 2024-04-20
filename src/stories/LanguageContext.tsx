import React from 'react';
import { LanguageContextType } from "./LanguageContextType";

// Create the context with default values

export const LanguageContext = React.createContext<LanguageContextType>({
  language: 'ja-jp', // default language
  setLanguage: () => { }, // default function
});
