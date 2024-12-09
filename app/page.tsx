"use client"

import React, { useState } from "react";
import Image from "next/image";
import Footer from "./footer";
import { USMap } from "./us-map";
// import { USFlag } from "./us-flag";
import { IState } from "./types";
import { TheManyStatesContext } from './contexts';

export default function Home() {
  const [selectedStates, setSelectedStates] = useState<IState[]>([]);

  return (
    <TheManyStatesContext.Provider value={{
        selectedStates,
        setSelectedStates
      }}>
      <div className="min-h-screen p-0 m-0 font-[family-name:var(--font-nunito-sans)]">
        <header className="flex justify-center px-8 pt-8">
          <Image
            src="/the-many-states-logo.svg"
            alt="The Many States logo"
            width={275}
            height={32}
            priority
          />
        </header>
        <main className="flex flex-col p-8 items-center">
          <p className="font-normal max-w-5xl text-center">The Many States is a web application that generates a United States flag where the visible stars in the blue canton represent which States someone has visited. The stars are ordered based on each State&apos;s admission to the Union.</p>
          <div className="w-full max-w-5xl">
            <USMap />
            {/* <USFlag selectedStates={selectedStates} /> */}
          </div>
          <Footer />
        </main>
      </div>
    </TheManyStatesContext.Provider>
  );
}
