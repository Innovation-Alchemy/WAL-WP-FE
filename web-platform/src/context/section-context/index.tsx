import React, { createContext, useContext, useState, ReactNode } from 'react';

interface SectionStates {
  section1: boolean;
  section2: boolean;
  section3: boolean;
  seats: string[];
  s1Value: number; // Add s1Value
  s2Value: number; // Add s2Value
}

interface SectionContextType {
  sectionStates: SectionStates;
  setSectionStates: React.Dispatch<React.SetStateAction<SectionStates>>;
}

const SectionContext = createContext<SectionContextType | undefined>(undefined);

export const SectionProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [sectionStates, setSectionStates] = useState<SectionStates>({
    section1: false,
    section2: false,
    section3: false,
    seats: [],
    s1Value: 0, // Initialize s1Value
    s2Value: 0, // Initialize s2Value
  });

  return (
    <SectionContext.Provider value={{ sectionStates, setSectionStates }}>
      {children}
    </SectionContext.Provider>
  );
};

export const useSection = (): SectionContextType => {
  const context = useContext(SectionContext);
  if (!context) {
    throw new Error('useSection must be used within a SectionProvider');
  }
  return context;
};
