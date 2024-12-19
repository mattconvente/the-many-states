"use client"

import React from "react";
import Link from "next/link";
// import Button from "@/app/button";
import USMap from "@/app/components/USMap";
import { useTheManyStatesContext } from "@/app/context/TheManyStatesContext";

export default function Home() {
  const { visitedStates } = useTheManyStatesContext();

  const generateFlagClasses = "transition-all font-bold py-2.5 px-8 md:py-4 md:px-20 text-sm md:text-lg text-white rounded-md md:rounded-lg bg-gradient-to-r from-[--color-old-glory-red] to-[--color-old-glory-blue] outline-none outline-2 outline-offset-2 outline-transparent hover:outline-[--color-old-glory-blue] focus-visible:outline-[--color-old-glory-blue]"

  return (
    <div className="flex flex-col items-center">
      <div className="w-full max-w-5xl items-center lg:-mt-4">
        <h2 className="text-center">Select the states you&apos;ve visited!</h2>
        <USMap />
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
