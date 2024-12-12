"use client"

import React from "react";
import { states } from "@/app/data";
import { IState } from "@/app/types";
import { useTheManyStatesContext } from '@/app/context/TheManyStatesContext';

export default function USMap() {
  const {
    visitedStates,
    unvisitedStates,
    setVisitedStates,
    setUnvisitedStates,
  } = useTheManyStatesContext();

  const toggleVisitedStates = (state: IState) => {
    const checkStateIsSelected =
      visitedStates.filter((s: IState) => s.abbr === state.abbr).length === 1;

    if (!checkStateIsSelected) {
      const newVisitedStates = [
        ...visitedStates,
        {
          id: state.id,
          abbr: state.abbr,
          name: state.name,
          pathCoordinates: state.pathCoordinates,
        }
      ];
      setVisitedStates(newVisitedStates);

      const newUnvisitedStates = states.filter((s: IState) =>
        !newVisitedStates.some((visited) => visited.abbr === s.abbr));
      setUnvisitedStates(newUnvisitedStates);
    } else {
      const newVisitedStates = visitedStates.filter((s: IState) => s.abbr !== state.abbr);
      setVisitedStates(newVisitedStates);

      const newUnvisitedStates = [
        ...unvisitedStates,
        state
      ];
      setUnvisitedStates(newUnvisitedStates);
    }
  };

  const selectedStateAbbrs = visitedStates.map((state) => state.abbr);

  return (
    <svg className="-mt-2 lg:-mt-6" width="" height="" viewBox="0 0 959 593" fill="none" xmlns="http://www.w3.org/2000/svg">
      <g id="us-map">
        {states.map((state) => {
          const stateStyles = "transition-colors cursor-pointer stroke-[--color-state-border-resting]";

          return (
            <path
              className={`${stateStyles} ${selectedStateAbbrs.includes(state.abbr) ? "fill-[--color-state-fill-active]" : "fill-[--color-state-fill-resting] hover:fill-[--color-state-fill-hover]"}`}
              key={state.abbr}
              id={state.id}
              name={state.name}
              d={state.pathCoordinates}
              onClick={() => toggleVisitedStates(state)}
            />
          )
        })}
      </g>
    </svg>
  );
}
