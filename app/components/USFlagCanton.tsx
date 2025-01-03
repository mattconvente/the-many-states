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
      <div className="flex flex-col sm:flex-row gap-2 lg:gap-4">
        <div className="w-full sm:w-1/2">
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
        </div>
        <div className="relative w-full sm:w-1/2">
          <ul ref={stateDataRef} className={`state-name flex min-h-[132px] md:min-h-0 justify-center pt-4 sm:pt-5 md:pt-8 text-center h-full ${isAnimating ? "animating" : ""}`}>
            <li className="delaware">
              <picture
                className="inline-flex mb-2 sm:mb-3"
              >
                <source
                  type="image/webp"
                  srcSet={`https://flagcdn.com/h60/us-${starsForAnimatedCanton[0].abbr.toLowerCase()}.webp,
                  https://flagcdn.com/h120/us-${starsForAnimatedCanton[0].abbr.toLowerCase()}.webp 2x`}
                />
                <source
                  type="image/png"
                  srcSet={`https://flagcdn.com/h60/us-${starsForAnimatedCanton[0].abbr.toLowerCase()}.png,
                  https://flagcdn.com/h120/us-${starsForAnimatedCanton[0].abbr.toLowerCase()}.png 2x`}
                />
                <img
                  src={`https://flagcdn.com/h60/us-${starsForAnimatedCanton[0].abbr.toLowerCase()}.png`}
                  height="60"
                  alt={`Flag of ${starsForAnimatedCanton[0].name}`}
                />
              </picture>
              <div className="text-base sm:text-2xl font-bold">{starsForAnimatedCanton[0].name}</div>
              <div className="text-sm sm:text-xl">{starsForAnimatedCanton[0].admissionDate}</div>
            </li>
            {starsForAnimatedCanton.slice(1).map((star: IAnimatedStar, index) => (
              <li
                key={star.abbr}
                className={star.abbr === "HI" ? "hawaii" : ""}
                style={{["--animation-order"]: index + 1} as React.CSSProperties}
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
          <div className="mt-4 sm:mt-none sm:absolute sm:bottom-0 w-full text-center">
            {renderAnimationButton()}
          </div>
        </div>
      </div>
    </div>
  );
}
