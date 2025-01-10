import { create } from "zustand";
import { IState } from "@/app/types";

interface TheManyStatesState {
  visitedStates: IState[];
  unvisitedStates: IState[];
  setVisitedStates: (visitedStates: IState[]) => void;
  setUnvisitedStates: (unvisitedStates: IState[]) => void;
  hoveredVisitedState: IState | null;
  hoveredUnvisitedState: IState | null;
  setHoveredVisitedState: (hoveredVisitedState: IState | null) => void;
  setHoveredUnvisitedState: (hoveredUnvisitedState: IState | null) => void;
}

export const useTheManyStatesStore = create<TheManyStatesState>((set) => ({
  visitedStates: [],
  unvisitedStates: [],
  setVisitedStates: (visitedStates) => set({ visitedStates: [...visitedStates] }),
  setUnvisitedStates: (unvisitedStates) => set({ unvisitedStates: [...unvisitedStates] }),
  hoveredVisitedState: null,
  hoveredUnvisitedState: null,
  setHoveredVisitedState: (hoveredVisitedState) => set({ hoveredVisitedState }),
  setHoveredUnvisitedState: (hoveredUnvisitedState) => set({ hoveredUnvisitedState }),
}));
