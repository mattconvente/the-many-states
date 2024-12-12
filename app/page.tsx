"use client"

import React from "react";
import Link from "next/link";
// import Button from "@/app/button";
import USMap from "@/app/components/USMap";
import { useTheManyStatesContext } from "@/app/context/TheManyStatesContext";

export default function Home() {
  const { visitedStates } = useTheManyStatesContext();

  return (
    <div className="flex flex-col items-center">
      <div className="w-full max-w-5xl items-center">
        <USMap />
      </div>
      <div className="w-full pt-4 flex justify-center">
        {visitedStates.length !== 0 && (
          <Link
            href="/flag"
            className="transition-shadow py-4 px-20 font-bold	text-lg text-white rounded-xl bg-gradient-to-r from-[--color-old-glory-red] to-[--color-old-glory-blue] hover:shadow-xl focus-visible:shadow-xl focus-visible:outline-none focus-visible:outline-2 focus-visible:outline-offset-2	focus-visible:outline-[--color-old-glory-blue]"
          >
            Generate your flag
          </Link>
        )}
      </div>
    </div>
  );
}
