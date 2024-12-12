"use client"

import React from "react";
import { IState, IStar } from "../types";
import { stars } from "../data";

interface USFlagProps {
  visitedStates: IState[];
}

export default function USFlag({ visitedStates = [] }: USFlagProps) {
  const selectedStateAbbrs = visitedStates.map((state: IState) => state.abbr);

  return (
    <div className="flag-container w-full">
      <svg
        width=""
        height=""
        viewBox="0 0 1235 650"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g>
          <path id="white-bg" d="M1235 0H0V650H1235V0Z" fill="var(--color-white)" />
          <path id="stripe-1" d="M1235 0H0V50H1235V0Z" fill="var(--color-old-glory-red)" />
          <path id="stripe-3" d="M1235 100H0V150H1235V100Z" fill="var(--color-old-glory-red)" />
          <path id="stripe-5" d="M1235 200H0V250H1235V200Z" fill="var(--color-old-glory-red)" />
          <path id="stripe-7" d="M1235 300H0V350H1235V300Z" fill="var(--color-old-glory-red)" />
          <path id="stripe-9" d="M1235 400H0V450H1235V400Z" fill="var(--color-old-glory-red)" />
          <path id="stripe-11" d="M1235 500H0V550H1235V500Z" fill="var(--color-old-glory-red)" />
          <path id="stripe-13" d="M1235 600H0V650H1235V600Z" fill="var(--color-old-glory-red)" />
          <g id="union">
            <path id="union-bg" d="M494 0H0V350H494V0Z" fill="var(--color-old-glory-blue)" />
            <g id="stars">
              {stars.map((star: IStar) => (
                <path
                  className={`transition-colors ${selectedStateAbbrs.includes(star.abbr) ? "fill-[--color-star-fill-active]" : "fill-[--color-star-fill-resting]"}`}
                  key={star.abbr}
                  id={star.id}
                  d={star.pathCoordinates}
                />
              ))}
            </g>
          </g>
        </g>
      </svg>
    </div>
  );
}
