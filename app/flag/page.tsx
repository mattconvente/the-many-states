"use client"

// import Link from "next/link";
import React from "react";
import { useTheManyStatesContext } from "@/app/context/TheManyStatesContext";
import USFlag from "@/app/components/USFlag";

export default function FlagPage() {
  const { visitedStates, unvisitedStates } = useTheManyStatesContext();

  const sortedVisitedStatesByName = visitedStates.sort(function(a, b) {
    return a.name.localeCompare(b.name);
  });

  const sortedUnvisitedStatesByName = unvisitedStates.sort(function(a, b) {
    return a.name.localeCompare(b.name);
  });

  const joinedListOfVisitedStates: string =
  sortedVisitedStatesByName.map((state) => state.name).join(", ");

  const joinedListOfUnvisitedStates: string =
  sortedUnvisitedStatesByName.map((state) => state.name).join(", ");

  const numVisitedStatesText = visitedStates.length === 50
    ? "You've visited all 50 states! Nice work!"
    : `You've visited ${visitedStates.length} of 50 states!`;

  return (
    <div className="grid gap-8 items-start grid-cols-1 lg:grid-cols-[2fr_1fr]">
      <USFlag visitedStates={visitedStates} />
      <div className="flex flex-col gap-6">
        <h2>{numVisitedStatesText}</h2>
        <div>
          <h3 className="mb-1">States you&apos;ve visited</h3>
          <p>
            {joinedListOfVisitedStates}
          </p>
        </div>
        <div>
          <h3 className="mb-1">States left to see</h3>
          <p>
            {joinedListOfUnvisitedStates}
          </p>
        </div>
      </div>
    </div>
  );
}
