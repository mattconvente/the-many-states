"use client"

import React from "react";
import Link from "next/link";
// import Button from "@/app/button";
import USMap from "@/app/components/USMap";
import { useTheManyStatesContext } from "@/app/context/TheManyStatesContext";

export default function Home() {
  const { selectedStates } = useTheManyStatesContext();

  return (
    <div className="flex flex-col items-center">
      <div className="w-full max-w-5xl items-center">
        <USMap />
      </div>
      <div className="w-full p-4 flex justify-center">
        {/* {selectedStates.length !== 0 && <Button onClick={() => setIsFlagShown(true)}>Generate your flag</Button>} */}
        {selectedStates.length !== 0 && <Link href="/flag">Generate your flag</Link>}
      </div>
    </div>
  );
}
