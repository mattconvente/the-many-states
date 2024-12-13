"use client"

// import Link from "next/link";
import React from "react";
import clsx from "clsx";
import { useTheManyStatesContext } from "@/app/context/TheManyStatesContext";
import USFlag from "@/app/components/USFlag";

export default function FlagPage() {
  const {
    visitedStates,
    unvisitedStates,
    setHoveredVisitedState,
    setHoveredUnvisitedState,
  } = useTheManyStatesContext();

  const sortedVisitedStatesByName = visitedStates.sort(function(a, b) {
    return a.name.localeCompare(b.name);
  });

  const sortedUnvisitedStatesByName = unvisitedStates.sort(function(a, b) {
    return a.name.localeCompare(b.name);
  });

  // const joinedListOfVisitedStates: string =
  // sortedVisitedStatesByName.map((state) => state.name).join(", ");

  // const joinedListOfUnvisitedStates: string =
  // sortedUnvisitedStatesByName.map((state) => state.name).join(", ");

  const numVisitedStatesText = visitedStates.length === 50
    ? "You've visited all 50 states! Nice work!"
    : `You've visited ${visitedStates.length} of 50 states!`;

  return (
    <div className="grid gap-8 items-start grid-cols-1 lg:grid-cols-[2fr_1fr]">
      <USFlag visitedStates={visitedStates} />
      <div className="flex shrink-0 flex-col gap-6">
        <h2>{numVisitedStatesText}</h2>
        <div>
          <h3 className="mb-1">States you&apos;ve visited</h3>
          <ul className="inline-flex flex-wrap gap-1">
            {/* {joinedListOfVisitedStates} */}
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
        <div>
          <h3 className="mb-1">States left to see</h3>
          <ul className="inline-flex flex-wrap gap-1">
            {/* {joinedListOfUnvisitedStates} */}
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
      </div>
    </div>
  );
}
