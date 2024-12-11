"use client"

import React, { useState } from "react";
import Image from "next/image";
import Footer from "./footer";
import Button from "./button";
import { USMap } from "./us-map";
import { USFlag } from "./us-flag";
import { IState } from "./types";
import { TheManyStatesContext } from './contexts';

export default function Home() {
  const [selectedStates, setSelectedStates] = useState<IState[]>([]);
  const [isFlagShown, setIsFlagShown] = useState<boolean>(false);

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
            width={360}
            height={42}
            priority
          />
        </header>
        <main className="flex flex-col p-8 items-center">
          <div className="w-full max-w-5xl items-center">
            <USMap />
          </div>
          <div className="w-full p-4 flex justify-center">
            {selectedStates.length !== 0 && <Button onClick={() => setIsFlagShown(true)}>Generate your flag</Button>}
          </div>
          <div className="w-full max-w-4xl p-4 justify-center">
            {isFlagShown && <USFlag selectedStates={selectedStates} />}
          </div>
          <Footer />
        </main>
      </div>
    </TheManyStatesContext.Provider>
  );
}
