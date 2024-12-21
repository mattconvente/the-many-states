"use client"

import React from "react";
import { Link } from "next-view-transitions";
import { states } from "@/app/data";
import { IState } from "@/app/types";
import { useTheManyStatesContext } from "@/app/context/TheManyStatesContext";
import { useToggleVisitedStates } from '@/app/hooks/useToggleVisitedStates';
import USMap from "@/app/components/USMap";
import Checkbox from "@/app/components/Checkbox";

export default function Home() {
  const { visitedStates } = useTheManyStatesContext();
  const toggleVisitedStates = useToggleVisitedStates();

  const generateFlagClasses = "transition-all font-bold py-2.5 px-8 md:py-4 md:px-20 text-sm md:text-lg text-white rounded-md md:rounded-lg bg-gradient-to-r from-[--color-old-glory-red] to-[--color-old-glory-blue] outline-none outline-2 outline-offset-2 outline-transparent hover:outline-[--color-old-glory-blue] focus-visible:outline-[--color-old-glory-blue]"

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
      <div className="w-full pt-4 flex justify-center">
        <Link
          href="/flag"
          className={`${generateFlagClasses} ${visitedStates.length > 0 ? "opacity-1 pointer-events-auto" : "opacity-0 pointer-events-none"}`}
        >
          Generate your flag
        </Link>
      </div>
    </div>
  );
}
