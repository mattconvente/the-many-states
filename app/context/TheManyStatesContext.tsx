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
  const [visitedStates, setVisitedStates] = useState<IState[]>([]);
  const [unvisitedStates, setUnvisitedStates] = useState<IState[]>([]);

  return (
    <TheManyStatesContext.Provider
      value={{
        visitedStates,
        unvisitedStates,
        setVisitedStates,
        setUnvisitedStates,
      }}
    >
      {children}
    </TheManyStatesContext.Provider>
  );
}
