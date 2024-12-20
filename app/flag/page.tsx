"use client"

import React, { Suspense, useEffect } from "react";
import clsx from "clsx";
import { useSearchParams } from "next/navigation";
import { useTheManyStatesContext } from "@/app/context/TheManyStatesContext";
import { states } from "@/app/data";
import { IState } from "@/app/types";
import USFlag from "@/app/components/USFlag";

function FlagPageContent() {
  const {
    visitedStates,
    unvisitedStates,
    setVisitedStates,
    setUnvisitedStates,
    setHoveredVisitedState,
    setHoveredUnvisitedState,
  } = useTheManyStatesContext();

  const searchParams = useSearchParams();

  useEffect(() => {
    const visitedStatesParams = searchParams.get("visitedStates");

    if (!visitedStatesParams) return;

    const sortedVisitedStatesParams = visitedStatesParams?.split(",").sort(function(a, b) {
      return a.localeCompare(b);
    });

    if (visitedStates.length === 0 && sortedVisitedStatesParams && sortedVisitedStatesParams.length > 0) {
      const tempVisitedStates: IState[] = [];
      states.map((state: IState) => {
        if (sortedVisitedStatesParams.includes(state.abbr)) {
          tempVisitedStates.push(state);
        }
      });
      const tempUnvisitedStates: IState[] = states.filter((state: IState) =>
        !tempVisitedStates.some((visited) => visited.abbr === state.abbr));
      setVisitedStates(tempVisitedStates);
      setUnvisitedStates(tempUnvisitedStates);
    }
  }, [visitedStates, searchParams, setUnvisitedStates, setVisitedStates]);

  const sortedVisitedStatesByName = visitedStates.sort(function(a, b) {
    return a.name.localeCompare(b.name);
  });

  const sortedUnvisitedStatesByName = unvisitedStates.sort(function(a, b) {
    return a.name.localeCompare(b.name);
  });

  const numVisitedStatesText = visitedStates.length === 50
    ? "You've visited all 50 states! Awesome!"
    : `You've visited ${visitedStates.length} of 50 states!`;

  const statesLeftToSeeMarkup = unvisitedStates.length === 0
    ? null
    : (
      <div>
        <h3 className="mb-1">States left to see</h3>
        <ul className="inline-flex flex-wrap gap-1">
          {sortedUnvisitedStatesByName.map((us, index) => (
            <li
              key={us.abbr}
              role="button"
              tabIndex={0}
              className={clsx(
                "inline-flex cursor-default transition-colors outline-none hover:bg-slate-50 focus:bg-slate-50",
                {
                  "after:content-[',']": index !== sortedUnvisitedStatesByName.length - 1
                }
              )}
              onMouseOver={() => setHoveredUnvisitedState(us)}
              onFocus={() => setHoveredUnvisitedState(us)}
              onMouseLeave={() => setHoveredUnvisitedState(null)}
              onBlur={() => setHoveredUnvisitedState(null)}
            >
              {us.name}
            </li>
          ))}
        </ul>
      </div>
    );


  return (
    <div className="grid gap-8 items-start grid-cols-1 lg:grid-cols-[2fr_1fr]">
      <USFlag visitedStates={visitedStates} />
      <div className="flex shrink-0 flex-col gap-6">
        <h2>{numVisitedStatesText}</h2>
        <div>
          <h3 className="mb-1">States you&apos;ve visited</h3>
          <ul className="inline-flex flex-wrap gap-1">
            {sortedVisitedStatesByName.map((vs, index) => (
              <li
                key={vs.abbr}
                role="button"
                tabIndex={0}
                className={clsx(
                  "inline-flex cursor-default transition-colors outline-none hover:bg-yellow-400 focus:bg-yellow-400",
                  {
                    "after:content-[',']": index !== sortedVisitedStatesByName.length - 1
                  }
                )}
                onMouseOver={() => setHoveredVisitedState(vs)}
                onFocus={() => setHoveredVisitedState(vs)}
                onMouseLeave={() => setHoveredVisitedState(null)}
                onBlur={() => setHoveredVisitedState(null)}
              >
                {vs.name}
              </li>
            ))}
          </ul>
        </div>
        {statesLeftToSeeMarkup}
      </div>
    </div>
  );
}

export default function FlagPage() {
  return (
    // TODO: make Loading component
    <Suspense name="Flag Page" fallback={<div>Loading...</div>}>
      <FlagPageContent />
    </Suspense>
  );
}
