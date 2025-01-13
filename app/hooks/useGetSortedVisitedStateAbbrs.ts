import { useMemo } from "react";
import { IState } from "@/app/types";

function getVisitedStateAbbrs(visitedStates: IState[]) {
  return visitedStates.map((state: IState) => state.abbr);
};

export function useGetSortedVisitedStateAbbrs(visitedStates: IState[]) {
  const visitedStateAbbrs = getVisitedStateAbbrs(visitedStates);

  return useMemo(() => visitedStateAbbrs.sort((a, b) => a.localeCompare(b)), [visitedStateAbbrs]);
};
