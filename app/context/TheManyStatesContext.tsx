"use client"

import React, { createContext, useContext, useState } from "react";
import { IState, ITheManyStatesContext } from "@/app/types";

export const TheManyStatesContext = createContext<ITheManyStatesContext | null>(null);

export function useTheManyStatesContext() {
  const context = useContext(TheManyStatesContext);
  if (!context) {
    throw new Error("TheManyStatesContext must be used within a TheManyStatesContext.Provider");
  }
  return context;
}

export function TheManyStatesProvider({ children }: { children: React.ReactNode }) {
  const [selectedStates, setSelectedStates] = useState<IState[]>([]);

  return (
    <TheManyStatesContext.Provider value={{ selectedStates, setSelectedStates }}>
      {children}
    </TheManyStatesContext.Provider>
  );
}
