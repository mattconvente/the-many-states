"use client"

import React, { Suspense, useEffect, useMemo } from "react";
import clsx from "clsx";
import { useSearchParams } from "next/navigation";
import { useTheManyStatesStore } from "@/app/store";
import { states } from "@/app/data";
import { IState } from "@/app/types";
import Link from "@/app/components/Link";
import USFlag from "@/app/components/USFlag";

function FlagPageContent() {
  const visitedStates = useTheManyStatesStore((state) => state.visitedStates);
  const unvisitedStates = useTheManyStatesStore((state) => state.unvisitedStates);
  const setVisitedStates = useTheManyStatesStore((state) => state.setVisitedStates);
  const setUnvisitedStates = useTheManyStatesStore((state) => state.setUnvisitedStates);
  const setHoveredVisitedState = useTheManyStatesStore((state) => state.setHoveredVisitedState);
  const setHoveredUnvisitedState = useTheManyStatesStore((state) => state.setHoveredUnvisitedState);

  const searchParams = useSearchParams();
  const visitedStatesParams = useMemo(
    () => searchParams.get("visitedStates")?.split(",").sort((a, b) => a.localeCompare(b)),
    [searchParams]
  );

  useEffect(() => {
    if (!visitedStatesParams || visitedStates.length > 0) return;

    const tempVisitedStates: IState[] = [];
    const tempUnvisitedStates: IState[] = [];

    states.forEach((state) => {
      if (visitedStatesParams.includes(state.abbr)) {
        tempVisitedStates.push(state);
      } else {
        tempUnvisitedStates.push(state);
      }
    });

    setVisitedStates(tempVisitedStates);
    setUnvisitedStates(tempUnvisitedStates);
  }, [visitedStatesParams, visitedStates.length, setVisitedStates, setUnvisitedStates]);

  const sortedVisitedStatesByName = useMemo(
    () => [...visitedStates].sort((a, b) => a.name.localeCompare(b.name)),
    [visitedStates]
  );

  const sortedUnvisitedStatesByName = useMemo(
    () => [...unvisitedStates].sort((a, b) => a.name.localeCompare(b.name)),
    [unvisitedStates]
  );

  const numVisitedStatesMarkup = visitedStates.length === 0
    ? (
      <React.Fragment>
        <h2 className="mb-4">Looks like you haven&apos;t selected any states.</h2>
        <h3 className="font-normal mb-4">Head back to the US map and select the states you&apos;ve&nbsp;visited.</h3>
        <p className="text-center">
          <Link
            href="/"
          >
            Return to the US map
          </Link>
        </p>
      </React.Fragment>
    )
      : visitedStates.length === 50
        ? <h2>You&apos;ve visited all 50 states! Awesome!</h2>
        : <h2>{`You've visited ${visitedStates.length} of 50 states!`}</h2>;

  const hoverStatesMarkup = visitedStates.length === 0
    ? null
    : (
      <div className="flex mt-2 gap-2 justify-start">
        <span className="w-4">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
            <path className="fill-(--color-old-glory-blue)" d="M0 312c0 8.4 2.6 16.8 8 24l72 96c33.7 45 84.6 73.4 140 79c4.8 .7 9.7 1 14.7 1l5.2 0 64.1 0 16 0c70.7 0 128-57.3 128-128l0-48 0-16 0-48c0-26.5-21.5-48-48-48c-12.4 0-23.6 4.7-32.1 12.3C366 211.5 345.3 192 320 192c-13.8 0-26.3 5.8-35 15.2C278.2 189 260.6 176 240 176c-12.3 0-23.5 4.6-32 12.2L208 40c0-22.1-17.9-40-40-40s-40 17.9-40 40l0 322.7L72 288c-13.3-17.7-38.3-21.3-56-8C5.5 287.9 0 299.9 0 312zm208-8c0-8.8 7.2-16 16-16c4.4 0 8.4 1.8 11.3 4.7c1.4 1.4 2.6 3.2 3.4 5.1c.4 1 .7 2 .9 3c.1 .5 .2 1.1 .2 1.6s.1 1.1 .1 1.6c0 32 0 64 0 96.1c0 .4 0 1-.1 1.5s-.1 1.1-.2 1.6c-.2 1-.5 2-.9 3c-.8 1.9-2 3.6-3.4 5.1c-2.9 2.9-6.9 4.7-11.3 4.7c-8.8 0-16-7.2-16-16c0-32 0-64 0-96zm64 0c0-8.8 7.2-16 16-16c4.4 0 8.4 1.8 11.3 4.7c1.4 1.4 2.6 3.2 3.4 5.1c.4 1 .7 2 .9 3c.1 .5 .2 1.1 .2 1.6s.1 1.1 .1 1.6c0 32 0 64 0 96.1c0 .4 0 1-.1 1.5s-.1 1.1-.2 1.6c-.2 1-.5 2-.9 3c-.8 1.9-2 3.6-3.4 5.1c-2.9 2.9-6.9 4.7-11.3 4.7c-8.8 0-16-7.2-16-16c0-32 0-64 0-96zm64 0c0-8.8 7.2-16 16-16s16 7.2 16 16l0 96c0 8.8-7.2 16-16 16s-16-7.2-16-16l0-96z"/>
            <path className="fill-white" d="M224 288c8.8 0 16 7.2 16 16l0 96c0 8.8-7.2 16-16 16s-16-7.2-16-16l0-96c0-8.8 7.2-16 16-16zm64 0c8.8 0 16 7.2 16 16l0 96c0 8.8-7.2 16-16 16s-16-7.2-16-16l0-96c0-8.8 7.2-16 16-16zm80 16l0 96c0 8.8-7.2 16-16 16s-16-7.2-16-16l0-96c0-8.8 7.2-16 16-16s16 7.2 16 16z"/>
          </svg>
        </span>
        <small className="leading-5">Hover the state names to see their stars highlighted in the&nbsp;canton.</small>
      </div>
    );

  const statesVisitedMarkup = visitedStates.length === 0
    ? null
    : (
    <div>
        <h3 className="mb-1">States you&apos;ve visited</h3>
        <ul className="inline-flex flex-wrap gap-1">
          {sortedVisitedStatesByName.map((visitedState, index) => (
            <li
              key={visitedState.abbr}
              role="button"
              tabIndex={0}
              className={clsx(
                "inline-flex cursor-default transition-colors outline-hidden hover:bg-yellow-400 focus:bg-yellow-400",
                {
                  "after:content-[',']": index !== sortedVisitedStatesByName.length - 1
                }
              )}
              onMouseOver={() => setHoveredVisitedState(visitedState)}
              onFocus={() => setHoveredVisitedState(visitedState)}
              onMouseLeave={() => setHoveredVisitedState(null)}
              onBlur={() => setHoveredVisitedState(null)}
            >
              {visitedState.name}
            </li>
          ))}
        </ul>
      </div>
    );

  const statesLeftToSeeMarkup = unvisitedStates.length === 0 || (visitedStates.length === 0 && unvisitedStates.length === 50)
    ? null
    : (
      <div>
        <h3 className="mb-1">States left to see</h3>
        <ul className="inline-flex flex-wrap gap-1">
          {sortedUnvisitedStatesByName.map((unvisitedState, index) => (
            <li
              key={unvisitedState.abbr}
              role="button"
              tabIndex={0}
              className={clsx(
                "inline-flex cursor-default transition-colors outline-hidden hover:bg-slate-50 focus:bg-slate-50",
                {
                  "after:content-[',']": index !== sortedUnvisitedStatesByName.length - 1
                }
              )}
              onMouseOver={() => setHoveredUnvisitedState(unvisitedState)}
              onFocus={() => setHoveredUnvisitedState(unvisitedState)}
              onMouseLeave={() => setHoveredUnvisitedState(null)}
              onBlur={() => setHoveredUnvisitedState(null)}
            >
              {unvisitedState.name}
            </li>
          ))}
        </ul>
      </div>
    );

  return (
    <div className="grid gap-4 md:gap-6 lg:gap-8 items-start grid-cols-1 md:grid-cols-2 lg:grid-cols-[2fr_1fr]">
      <USFlag visitedStates={visitedStates} />
      <div className="flex shrink-0 flex-col gap-6">
        <div>
          {numVisitedStatesMarkup}
          {hoverStatesMarkup}
        </div>
        {statesVisitedMarkup}
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
