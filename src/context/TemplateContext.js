'use client';
import { createContext, useContext, useState } from 'react';

const TemplateContext = createContext(null);

export function TemplateProvider({ children }) {
  const [selectedTemplate, setSelectedTemplate] = useState(null);

  return (
    <TemplateContext.Provider
      value={{ selectedTemplate, setSelectedTemplate }}
    >
      {children}
    </TemplateContext.Provider>
  );
}

export const useTemplate = () => useContext(TemplateContext);
