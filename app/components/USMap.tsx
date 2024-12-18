"use client"

import React, { KeyboardEvent } from "react";
import clsx from "clsx";
import { Tooltip } from "react-tooltip";
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

  const handleOnKeyDown = (event: KeyboardEvent<SVGPathElement>, state: IState) => {
    if (event.key === "Enter" || event.key === " ") {
      toggleVisitedStates(state);
    }
  }

  const selectedStateAbbrs = visitedStates.map((state) => state.abbr);

  return (
    <div>
      <svg className="-mt-2 lg:-mt-6" width="" height="" viewBox="0 0 959 593" fill="none" xmlns="http://www.w3.org/2000/svg">
        <g id="us-map">
          {states.map((state) => (
              <path
                className={clsx("transition-colors cursor-pointer stroke-[--color-state-border-resting] outline-none", {
                  "fill-[--color-state-fill-active] hover:fill-[--color-state-fill-hover-active] focus-visible:fill-[--color-state-fill-hover-active]": selectedStateAbbrs.includes(state.abbr),
                  "fill-[--color-state-fill-resting] hover:fill-[--color-state-fill-hover] focus-visible:fill-[--color-state-fill-hover]": !selectedStateAbbrs.includes(state.abbr),
                })}
                key={state.abbr}
                role="checkbox"
                aria-label={state.name}
                aria-checked={selectedStateAbbrs.includes(state.abbr)}
                tabIndex={0}
                id={state.id}
                name={state.name}
                d={state.pathCoordinates}
                data-tooltip-id={state.abbr}
                data-tooltip-content={state.name}
                data-tooltip-place="top"
                data-tooltip-variant="light"
                data-tooltip-offset={0}
                onClick={() => toggleVisitedStates(state)}
                onKeyDown={(event) => handleOnKeyDown(event, state)}
              />
            )
          )}
        </g>
      </svg>
      {states.map((state) => <Tooltip key={state.abbr} id={state.abbr} />)}
    </div>
  );
}
