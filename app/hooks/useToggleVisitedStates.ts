"use client";

import { states } from "@/app/data";
import { IState } from "@/app/types";
import { useTheManyStatesStore } from "@/app/store";

export const useToggleVisitedStates = () => {
  const visitedStates = useTheManyStatesStore((state) => state.visitedStates);
  const setVisitedStates = useTheManyStatesStore((state) => state.setVisitedStates);
  const setUnvisitedStates = useTheManyStatesStore((state) => state.setUnvisitedStates);

  const visitedStateAbbrSet = new Set(visitedStates.map((s) => s.abbr));

  const toggleVisitedStates = (state: IState) => {
    const isVisited = visitedStateAbbrSet.has(state.abbr);

    let newVisitedStates: IState[] = [];
    if (isVisited) {
      newVisitedStates = visitedStates.filter((s) => s.abbr !== state.abbr);
    } else {
      newVisitedStates = [...visitedStates, state];
    }

    setVisitedStates(newVisitedStates);

    const newUnvisitedStates = states.filter(
      (s) => !newVisitedStates.some((vs) => vs.abbr === s.abbr)
    );
    setUnvisitedStates(newUnvisitedStates);
  };

  return toggleVisitedStates;
}
