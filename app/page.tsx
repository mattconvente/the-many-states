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
import IconArrowsRotate from "@/app/components/icons/ArrowsRotate";
import IconFlag from "@/app/components/icons/Flag";

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
            <div className="grid gap-4 @sm:grid-cols-[repeat(auto-fill,minmax(160px,1fr))] grid-cols-[repeat(auto-fill,minmax(144px,1fr))] p-4 rounded-sm bg-(--color-state-selection-container-background) border-2 border-(--color-state-border-resting) inset-shadow-md max-h-72 @sm:max-h-88 @md:max-h-100 @lg:max-h-115 overflow-auto">
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
                className={`w-full @2xs:py-2.5 @2xs:text-sm @2xs:rounded-md @lg:w-1/2 @lg:px-2 @lg:py-4 @lg:text-lg @lg:rounded-lg ${visitedStates.length > 0 ? "opacity-100 pointer-events-auto" : "opacity-33 pointer-events-none"}`}
              >
                <span>Create your flag</span>
                <span className="inline-block h-3 w-[1.36125rem] @lg:h-4 @lg:w-[1.86125rem] text-white">
                  <IconFlag />
                </span>
              </Link>
              <Button
                variant="secondary"
                onClick={handleResetMap}
                className={`w-full @2xs:py-2.5 @2xs:text-sm @2xs:rounded-md @lg:w-1/2 @lg:px-2 @lg:py-4 @lg:text-lg @lg:rounded-lg ${visitedStates.length > 0 ? "opacity-100 pointer-events-auto" : "opacity-33 pointer-events-none"}`}
              >
                <span>Reset map</span>
                <span className="inline-block w-4 h-4 @lg:w-5 @lg:h-5">
                  <IconArrowsRotate />
                </span>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
