"use client"

import React, { useState } from "react";
import { IAnimatedStar } from "../types";
import { starsForAnimatedCanton } from "../data";
import Image from 'next/image';

export default function USFlagCanton() {
  const [currentFlagIndex, setCurrentFlagIndex] = useState(0);
  const maxFlagIndex = starsForAnimatedCanton.length - 1;

  const buttonClasses = "absolute transition-colors inline-flex justify-center items-center z-10 top-1/2 -mt-4 w-8 h-8 bg-slate-100 hover:bg-amber-200 focus-visible:bg-amber-200 outline-none border-2 border-slate-500 hover:border-[--color-old-glory-blue] focus-visible:border-[--color-old-glory-blue] rounded-full"

  const incrementFlagIndex = () => {
    if (currentFlagIndex === maxFlagIndex) {
      setCurrentFlagIndex(0);
    } else {
      setCurrentFlagIndex(currentFlagIndex + 1);
    }
  };

  const decrementFlagIndex = () => {
    if (currentFlagIndex === 0) {
      setCurrentFlagIndex(maxFlagIndex);
    } else {
      setCurrentFlagIndex(currentFlagIndex - 1);
    }
  };

  return (
    <div className="flex flex-col sm:flex-row gap-4 p-4 bg-slate-300 w-full max-w-full">
      <div className="w-full sm:w-1/2">
        <svg width="" height="" viewBox="0 0 494 350" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M494 0H0V350H494V0Z" className="fill-[--color-old-glory-blue]"/>
          <g id="stars" className="canton">
            {starsForAnimatedCanton.map((star: IAnimatedStar, index) => (
              <path
                key={star.abbr}
                className={`transition ${index <= currentFlagIndex ? "fill-white opacity-100" : "opacity-0"}`}
                id={star.abbr}
                d={star.pathCoordinates}
              />
            ))}
          </g>
        </svg>
      </div>
      <div className="relative overflow-x-hidden w-full sm:w-1/2">
        <button type="button" className={`${buttonClasses} left-0`} onClick={decrementFlagIndex}>
          <Image src="/arrow-left-sharp-regular.svg" width={16} height={14} alt={`Go to the previous state`} />
        </button>
        <button type="button" className={`${buttonClasses} right-0`} onClick={incrementFlagIndex}>
          <Image src="/arrow-right-sharp-regular.svg" width={16} height={14} alt={`Go to the next state`} />
        </button>
        <ul
          className="state-name relative transition flex items-center text-center h-full w-full"
          style={{ transform: `translateX(-${currentFlagIndex * 100}%)` }}
        >
          {starsForAnimatedCanton.map((star: IAnimatedStar) => (
            <li
              key={star.abbr}
              className="flex-[0_0_100%] relative max-w-full"
            >
              <picture
                className="inline-flex mb-2 sm:mb-3"
              >
                <source
                  type="image/webp"
                  srcSet={`https://flagcdn.com/h60/us-${star.abbr.toLowerCase()}.webp,
                  https://flagcdn.com/h120/us-${star.abbr.toLowerCase()}.webp 2x`}
                />
                <source
                  type="image/png"
                  srcSet={`https://flagcdn.com/h60/us-${star.abbr.toLowerCase()}.png,
                  https://flagcdn.com/h120/us-${star.abbr.toLowerCase()}.png 2x`}
                />
                <img
                  src={`https://flagcdn.com/h40/us-${star.abbr.toLowerCase()}.png`}
                  height="60"
                  alt={`Flag of ${star.name}`}
                />
              </picture>
              <div className="text-base md:text-xl lg:text-2xl font-bold">{star.name}</div>
              <div className="text-sm md:text-lg lg:text-xl">{star.admissionDate}</div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
