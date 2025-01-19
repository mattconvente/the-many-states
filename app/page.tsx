"use client"

import React from "react";
import { Link } from "next-view-transitions";
import { states } from "@/app/data";
import { IState } from "@/app/types";
import { useTheManyStatesStore } from "@/app/store";
import { useToggleVisitedStates } from "@/app/hooks/useToggleVisitedStates";
import { useGetSortedVisitedStateAbbrs } from "@/app/hooks/useGetSortedVisitedStateAbbrs";
import USMap from "@/app/components/USMap";
import Checkbox from "@/app/components/Checkbox";

export default function Home() {
  const visitedStates = useTheManyStatesStore((state) => state.visitedStates);
  const setVisitedStates = useTheManyStatesStore((state) => state.setVisitedStates);
  const setUnvisitedStates = useTheManyStatesStore((state) => state.setUnvisitedStates);
  const toggleVisitedStates = useToggleVisitedStates();
  const sortedVisitedStateAbbrs = useGetSortedVisitedStateAbbrs(visitedStates);

  const coreCtaClasses = "transition-all inline-flex justify-center items-center gap-3 font-bold py-2.5 px-8 md:py-4 md:px-12 text-sm md:text-lg rounded-md md:rounded-lg outline-none outline-2 outline-offset-2 outline-transparent";
  const createFlagClasses = `${coreCtaClasses} text-white bg-gradient-to-r from-[--color-old-glory-red] to-[--color-old-glory-blue] hover:outline-[--color-old-glory-blue] focus-visible:outline-[--color-old-glory-blue]`;
  const resetMapClasses = `${coreCtaClasses} bg-[--color-state-border-resting] hover:outline-foreground focus-visible:outline-foreground`;

  const handleResetMap = () => {
    setVisitedStates([]);
    setUnvisitedStates([]);
  };

  return (
    <div className="flex flex-col items-center">
      <div className="w-full max-w-5xl items-center lg:-mt-4">
        <h2 className="text-center">Select the states you&apos;ve visited!</h2>
        <USMap />
        <div className="md:hidden grid gap-5 grid-cols-[repeat(auto-fill,minmax(128px,1fr))] sm:grid-cols-[repeat(auto-fill,minmax(160px,1fr))] mt-4 px-2 py-4 rounded border-2 border-slate-400 bg-slate-300 shadow-inner max-h-56 [@media(min-height:720px)]:max-h-64 overflow-auto">
          {states.map((s: IState) => (
            <Checkbox
              key={s.abbr}
              label={s.name}
              isChecked={visitedStates?.includes(s) || false}
              onChange={() => toggleVisitedStates(s)}
            />
          ))}
        </div>
      </div>
      <div className="w-full pt-4 flex flex-col sm:flex-row gap-4 justify-center">
        <Link
          href={`/flag?visitedStates=${encodeURI(sortedVisitedStateAbbrs.join(","))}`}
          className={`${createFlagClasses} ${visitedStates.length > 0 ? "opacity-1 pointer-events-auto" : "opacity-0 pointer-events-none"}`}
        >
          <span>Create your flag</span>
          <span className="inline-block h-3 w-[1.36125rem] md:h-4 md:w-[1.86125rem] text-white">
            <svg viewBox="0 0 900 496" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path fillRule="evenodd" clipRule="evenodd" d="M389.12 0H900V55H389.12V110H900V165H389.12V221H900V276H0V275.692V221V165V110V55V0H389.12ZM900 331H0V386H900V331ZM900 441H0V496H900V441ZM207.048 176.87L194.818 139.232L182.589 176.87H143.012L175.031 200.133L162.801 237.772L194.819 214.51L226.838 237.772L214.607 200.133L246.627 176.87H207.048ZM306.829 44L319.06 81.6384H358.635L326.618 104.9L338.849 142.541L306.829 119.277L274.81 142.541L287.041 104.9L255.023 81.6384H294.599L306.829 44ZM95.0381 81.6384L82.8088 44L70.5786 81.6384H31L63.0195 104.902L50.7893 142.541L82.8076 119.278L114.826 142.541L102.596 104.901L134.615 81.6384H95.0381Z" fill="currentColor"/>
            </svg>
          </span>
        </Link>
        <button
          type="button"
          className={`${resetMapClasses} ${visitedStates.length > 0 ? "opacity-1 pointer-events-auto" : "opacity-0 pointer-events-none"}`}
          onClick={handleResetMap}
        >
          <span>Reset map</span>
          <span className="inline-block w-4 h-4 md:w-5 md:h-5">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
              <path fill="currentColor" d="M94 187.1C120.8 124.1 183.3 80 256 80c39.7 0 77.8 15.8 105.9 43.9L414.1 176 360 176l-24 0 0 48 24 0 112 0 24 0 0-24 0-112 0-24-48 0 0 24 0 54.1L395.9 89.9C358.8 52.8 308.5 32 256 32C163.4 32 83.9 88.2 49.8 168.3L94 187.1zM64 369.9l52.1 52.1C153.2 459.2 203.5 480 256 480c92.5 0 171.8-56 206-135.9l-44.1-18.9C391 388.1 328.6 432 256 432c-39.7 0-77.8-15.8-105.9-43.9L97.9 336l54.1 0 24 0 0-48-24 0L40 288l-24 0 0 24 0 112 0 24 48 0 0-24 0-54.1z"/>
            </svg>
          </span>
        </button>
      </div>
    </div>
  );
}
