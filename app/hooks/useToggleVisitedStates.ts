"use client";

import { states } from "@/app/data";
import { IState } from "@/app/types";
import { useTheManyStatesContext } from "@/app/context/TheManyStatesContext";

export const useToggleVisitedStates = () => {
  const {
    visitedStates,
    unvisitedStates,
    setVisitedStates,
    setUnvisitedStates,
  } = useTheManyStatesContext();

  const toggleVisitedStates = (state: IState) => {
    const checkStateIsSelected =
      visitedStates.some((s: IState) => s.abbr === state.abbr);

    if (!checkStateIsSelected) {
      const newVisitedStates = [
        ...visitedStates,
        {
          abbr: state.abbr,
          name: state.name,
          pathCoordinates: state.pathCoordinates,
        },
      ];
      setVisitedStates(newVisitedStates);

      const newUnvisitedStates = states.filter((s: IState) =>
        !newVisitedStates.some((visited) => visited.abbr === s.abbr)
      );
      setUnvisitedStates(newUnvisitedStates);
    } else {
      const newVisitedStates = visitedStates.filter((s: IState) => s.abbr !== state.abbr);
      setVisitedStates(newVisitedStates);

      const newUnvisitedStates = [...unvisitedStates, state];
      setUnvisitedStates(newUnvisitedStates);
    }
  };

  return toggleVisitedStates;
};
