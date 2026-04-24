import React, { createContext, useContext, useState } from 'react';

type DateRangeContextType = {
  startDate: string;
  endDate: string;
  label: string;
  setDateRange: (start: string, end: string, label: string) => void;
};

const DateContext = createContext<DateRangeContextType | undefined>(undefined);

export function DateProvider({ children }: { children: React.ReactNode }) {
  // Default to last 30 days
  const today = new Date();
  const past30 = new Date(today);
  past30.setDate(past30.getDate() - 30);
  
  const formatDate = (d: Date) => {
    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, '0');
    const day = String(d.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  const [startDate, setStartDate] = useState(formatDate(past30));
  const [endDate, setEndDate] = useState(formatDate(today));
  const [label, setLabel] = useState('Last 30 Days');

  const setDateRange = (start: string, end: string, newLabel: string) => {
    setStartDate(start);
    setEndDate(end);
    setLabel(newLabel);
  };

  return (
    <DateContext.Provider value={{ startDate, endDate, label, setDateRange }}>
      {children}
    </DateContext.Provider>
  );
}

export function useDateRange() {
  const context = useContext(DateContext);
  if (context === undefined) {
    throw new Error('useDateRange must be used within a DateProvider');
  }
  return context;
}
