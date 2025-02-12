"use client"

import React from "react";
// import { Link } from "next-view-transitions";
import { states } from "@/app/data";
import { IState } from "@/app/types";
import { useTheManyStatesStore } from "@/app/store";
import { useToggleVisitedStates } from "@/app/hooks/useToggleVisitedStates";
import { useGetSortedVisitedStateAbbrs } from "@/app/hooks/useGetSortedVisitedStateAbbrs";
import Button from "@/app/components/Button";
import Link from "@/app/components/Link";
import USMap from "@/app/components/USMap";
import StateCheckbox from "@/app/components/StateCheckbox";

export default function Home() {
  const visitedStates = useTheManyStatesStore((state) => state.visitedStates);
  const setVisitedStates = useTheManyStatesStore((state) => state.setVisitedStates);
  const setUnvisitedStates = useTheManyStatesStore((state) => state.setUnvisitedStates);
  const toggleVisitedStates = useToggleVisitedStates();
  const sortedVisitedStateAbbrs = useGetSortedVisitedStateAbbrs(visitedStates);

  const handleResetMap = () => {
    setVisitedStates([]);
    setUnvisitedStates([]);
  };

  return (
    <div className="flex flex-col items-center">
      <h1 className="text-center lg:-mt-4 mb-4">Select the states you&apos;ve&nbsp;visited!</h1>
      <div className="w-full flex flex-col lg:flex-row gap-6 items-center">
        <div className="w-full lg:basis-2/3">
          <USMap />
        </div>
        <div className="w-full flex flex-col-reverse lg:flex-col lg:basis-1/3">
          <div className="@container">
            <div className="grid gap-4 @sm:grid-cols-[repeat(auto-fill,minmax(160px,1fr))] grid-cols-[repeat(auto-fill,minmax(144px,1fr))] p-4 rounded-sm bg-(--color-state-selection-container-background) border-2 border-(--color-state-border-resting) inset-shadow-md max-h-72 @md:max-h-88 @lg:max-h-100 overflow-auto">
              {states.map((state: IState) => (
                <StateCheckbox
                  key={state.abbr}
                  state={state}
                  isChecked={visitedStates?.includes(state) || false}
                  onChange={() => toggleVisitedStates(state)}
                />
              ))}
            </div>
          </div>
          <div className="@container">
            <div className="w-full pb-4 lg:pb-0 lg:pt-4 flex flex-col @lg:flex-row gap-4 justify-center">
              <Link
                href={`/flag?visitedStates=${encodeURI(sortedVisitedStateAbbrs.join(","))}`}
                className={`w-full @lg:w-1/2 @lg:px-2 @lg:py-4 @lg:text-lg @lg:rounded-lg ${visitedStates.length > 0 ? "opacity-100 pointer-events-auto" : "opacity-33 pointer-events-none"}`}
              >
                <span>Create your flag</span>
                <span className="inline-block h-3 w-[1.36125rem] @lg:h-4 @lg:w-[1.86125rem] text-white">
                  <svg viewBox="0 0 900 496" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path fillRule="evenodd" clipRule="evenodd" d="M389.12 0H900V55H389.12V110H900V165H389.12V221H900V276H0V275.692V221V165V110V55V0H389.12ZM900 331H0V386H900V331ZM900 441H0V496H900V441ZM207.048 176.87L194.818 139.232L182.589 176.87H143.012L175.031 200.133L162.801 237.772L194.819 214.51L226.838 237.772L214.607 200.133L246.627 176.87H207.048ZM306.829 44L319.06 81.6384H358.635L326.618 104.9L338.849 142.541L306.829 119.277L274.81 142.541L287.041 104.9L255.023 81.6384H294.599L306.829 44ZM95.0381 81.6384L82.8088 44L70.5786 81.6384H31L63.0195 104.902L50.7893 142.541L82.8076 119.278L114.826 142.541L102.596 104.901L134.615 81.6384H95.0381Z" fill="currentColor"/>
                  </svg>
                </span>
              </Link>
              <Button
                variant="secondary"
                onClick={handleResetMap}
                className={`w-full @lg:w-1/2 @lg:px-2 @lg:py-4 @lg:text-lg @lg:rounded-lg ${visitedStates.length > 0 ? "opacity-100 pointer-events-auto" : "opacity-33 pointer-events-none"}`}
              >
                <span>Reset map</span>
                <span className="inline-block w-4 h-4 @lg:w-5 @lg:h-5">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                    <path fill="currentColor" d="M94 187.1C120.8 124.1 183.3 80 256 80c39.7 0 77.8 15.8 105.9 43.9L414.1 176 360 176l-24 0 0 48 24 0 112 0 24 0 0-24 0-112 0-24-48 0 0 24 0 54.1L395.9 89.9C358.8 52.8 308.5 32 256 32C163.4 32 83.9 88.2 49.8 168.3L94 187.1zM64 369.9l52.1 52.1C153.2 459.2 203.5 480 256 480c92.5 0 171.8-56 206-135.9l-44.1-18.9C391 388.1 328.6 432 256 432c-39.7 0-77.8-15.8-105.9-43.9L97.9 336l54.1 0 24 0 0-48-24 0L40 288l-24 0 0 24 0 112 0 24 48 0 0-24 0-54.1z"/>
                  </svg>
                </span>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
