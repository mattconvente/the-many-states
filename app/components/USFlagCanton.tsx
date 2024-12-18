"use client"

import React, { useEffect, useState, useRef } from "react";
import { IAnimatedStar } from "../types";
import { starsForAnimatedCanton } from "../data";

export default function USFlagCanton() {
  const cantonRef = useRef<SVGPathElement>(null);
  const stateDataRef = useRef<HTMLUListElement>(null);
  const [isAnimating, setIsAnimating] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [canResetAnimation, setCanResetAnimation] = useState(false);
  const [numCompleteAnimations, setNumCompleteAnimations] = useState(0);

  const buttonClasses = "transition-colors bg-slate-100 hover:bg-amber-200 focus-visible:bg-amber-200 outline-none border-2 border-slate-500 hover:border-[--color-old-glory-blue] focus-visible:border-[--color-old-glory-blue] py-1 px-2 rounded-md text-xs md:text-sm";

  const handleIsAnimating = () => {
    setIsAnimating(true);
    setCanResetAnimation(false);
  };

  const handleResetAnimation = () => {
    setIsAnimating(false);
    setCanResetAnimation(false);
    setNumCompleteAnimations(0);
  };

  const handlePauseAnimation = () => {
    if (cantonRef.current) {
      cantonRef.current.style.animationPlayState = "paused";
    }
    if (stateDataRef.current) {
      stateDataRef.current.style.animationPlayState = "paused";
    }
    setIsPaused(true);
  };

  const handleResumeAnimation = () => {
    if (cantonRef.current) {
      cantonRef.current.style.animationPlayState = "running";
    }
    if (stateDataRef.current) {
      stateDataRef.current.style.animationPlayState = "running";
    }
    setIsPaused(false);
  };

  const handleAnimationEnd = () => {
    setNumCompleteAnimations(numCompleteAnimations + 1);
  }

  useEffect(() => {
    /**
     * `handleAnimationEnd` applies to each individual animation rather than the parent containers.
     *
     * We start with the star and info for Delaware visible, so the entire canton is finished animating
     * when we count 49 completed animations. 50 states - 1 for Delaware already visible.
     */
    if (numCompleteAnimations === 49) {
      setCanResetAnimation(true);
    }
  }, [numCompleteAnimations]);

  const renderAnimationButton = () => {
    let buttonText = "Start animation";
    let buttonOnClick = handleIsAnimating;

    if (isAnimating && canResetAnimation) {
      buttonText = "Reset animation";
      buttonOnClick = handleResetAnimation;
    } else if (isAnimating && !isPaused && !canResetAnimation) {
      buttonText = "Pause animation";
      buttonOnClick = handlePauseAnimation;
    } else if (isAnimating && isPaused && !canResetAnimation) {
      buttonText = "Resume animation";
      buttonOnClick = handleResumeAnimation;
    }

    return (
      <button
        className={buttonClasses}
        type="button"
        onClick={buttonOnClick}
      >
        {buttonText}
      </button>
    );
  };

  return (
    <div className="p-4 bg-slate-300">
      <div className="grid grid-cols-2 gap-4 items-center">
        <svg width="" height="" viewBox="0 0 494 350" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M494 0H0V350H494V0Z" className="fill-[--color-old-glory-blue]"/>
          <g id="stars" ref={cantonRef} onAnimationEnd={handleAnimationEnd} className={`canton ${isAnimating ? "animating" : ""}`}>
            <path
              className="fill-white delaware"
              id={starsForAnimatedCanton[0].abbr}
              d={starsForAnimatedCanton[0].pathCoordinates}
            />
            {starsForAnimatedCanton.slice(1).map((star: IAnimatedStar, index) => (
              <path
                key={star.abbr}
                className="fill-white"
                id={star.abbr}
                d={star.pathCoordinates}
                style={{["--animation-order"]: index + 1} as React.CSSProperties}
              />
            ))}
          </g>
        </svg>
        <div className="relative h-full">
          <ul ref={stateDataRef} className={`state-name flex justify-center items-center text-center h-full ${isAnimating ? "animating" : ""}`}>
            <li className="delaware">
              <div className="text-base md:text-xl lg:text-2xl font-bold">{starsForAnimatedCanton[0].name}</div>
              <div className="text-sm md:text-lg lg:text-xl">{starsForAnimatedCanton[0].admissionDate}</div>
            </li>
            {starsForAnimatedCanton.slice(1).map((star: IAnimatedStar, index) => (
              <li
                key={star.abbr}
                className={star.abbr === "HI" ? "hawaii" : ""}
                style={{["--animation-order"]: index + 1} as React.CSSProperties}
              >
                <div className="text-base md:text-xl lg:text-2xl font-bold">{star.name}</div>
                <div className="text-sm md:text-lg lg:text-xl">{star.admissionDate}</div>
              </li>
            ))}
          </ul>
          <div className="absolute w-full bottom-0 text-center">
            {renderAnimationButton()}
          </div>
        </div>
      </div>
    </div>
  );
}
