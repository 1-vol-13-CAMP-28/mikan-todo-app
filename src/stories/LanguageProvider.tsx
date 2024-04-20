import React from 'react';
import { useState } from 'react';
import { LanguageContext } from "./LanguageContext";


export const LanguageProvider: React.FC = ({ children }: any) => {
  const [language, setLanguage] = useState('en-us');

  return (
    <LanguageContext.Provider value={{ language, setLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
};
