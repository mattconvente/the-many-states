"use client"

import React, { useContext } from "react";
import { states } from "./data";
import { State } from "./types";
import { TheManyStatesContext } from './contexts';

export function USMap() {
  const { selectedStates, setSelectedStates } = useContext(TheManyStatesContext);

  const toggleSelectedStates = (state: State) => {
    const checkStateIsSelected =
      selectedStates?.filter((s: State) => s.abbr === state.abbr).length === 1;

    if (!checkStateIsSelected) {
      setSelectedStates([
        ...selectedStates,
        state,
      ]);
    } else {
      const newSelectedStates = selectedStates?.filter((s: State) => s.abbr !== state.abbr);
      setSelectedStates(newSelectedStates);
    }
  };

  const selectedStateAbbrs = selectedStates?.map((state: State) => state.abbr);

  return (
    <svg width="" height="" viewBox="0 0 959 593" fill="none" xmlns="http://www.w3.org/2000/svg">
      <g id="us-map">
        {states.map((state) => {
          const stateStyles = "transition-colors cursor-pointer stroke-[--state-border-resting]";

          return (
            <path
              className={`${stateStyles} ${selectedStateAbbrs.includes(state.abbr) ? "fill-[--state-fill-active]" : "fill-[--state-fill-resting] hover:fill-[--state-fill-hover]"}`}
              key={state.abbr}
              id={state.id}
              name={state.name}
              d={state.pathCoordinates}
              onClick={() => toggleSelectedStates(state)}
            />
          )
        })}
      </g>
    </svg>
  );
}
