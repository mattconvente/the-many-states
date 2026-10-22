"use client"

import React, { useLayoutEffect, useRef, useState } from "react";
import { IAnimatedStar } from "../types";
import { starsForAnimatedCanton } from "../data";
import IconArrowLeft from "@/app/components/icons/ArrowLeft";
import IconArrowRight from "@/app/components/icons/ArrowRight";

const stateCount = starsForAnimatedCanton.length;
const stateIndex = (position: number) => ((position % stateCount) + stateCount) % stateCount;

export default function USFlagCanton() {
  const [position, setPosition] = useState(0);
  const currentFlagIndex = stateIndex(Math.round(position));
  const centerSlide = Math.round(position);
  const slides = Array.from({ length: 5 }, (_, offset) => centerSlide + offset - 2);
  const listRef = useRef<HTMLUListElement>(null);
  const moveSlideRef = useRef<(direction: number) => void>(() => {});

  useLayoutEffect(() => {
    const list = listRef.current;
    if (!list) return;
    let actualPosition = 0;
    let targetPosition = 0;
    let frame = 0;
    let lastFrameTime = 0;
    let wheelTimer: ReturnType<typeof setTimeout>;
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

    const animate = (time: number) => {
      const elapsed = lastFrameTime ? Math.min(time - lastFrameTime, 64) : 16;
      lastFrameTime = time;
      const distance = targetPosition - actualPosition;
      actualPosition = reducedMotion.matches || Math.abs(distance) < 0.001
        ? targetPosition
        : actualPosition + distance * (1 - Math.exp(-elapsed / 65));
      setPosition(actualPosition);
      if (actualPosition !== targetPosition) {
        frame = requestAnimationFrame(animate);
      } else {
        frame = 0;
        lastFrameTime = 0;
      }
    };

    const startAnimation = () => {
      if (!frame) frame = requestAnimationFrame(animate);
    };

    moveSlideRef.current = (direction) => {
      clearTimeout(wheelTimer);
      targetPosition = Math.round(targetPosition) + direction;
      startAnimation();
    };

    const onWheel = (event: WheelEvent) => {
      const delta = event.shiftKey && !event.deltaX ? event.deltaY : event.deltaX;
      // Leave vertical page scrolling alone.
      if (!delta || (!event.shiftKey && Math.abs(event.deltaY) > Math.abs(delta))) return;
      const width = list.getBoundingClientRect().width;
      if (!width) return;
      event.preventDefault();
      cancelAnimationFrame(frame);
      frame = 0;
      lastFrameTime = 0;
      const pixels = delta * (event.deltaMode === 1 ? 16 : event.deltaMode === 2 ? width : 1);
      actualPosition += pixels / width;
      targetPosition = actualPosition;
      setPosition(actualPosition);
      clearTimeout(wheelTimer);
      wheelTimer = setTimeout(() => {
        targetPosition = Math.round(actualPosition);
        startAnimation();
      }, 120);
    };

    let pointerX: number | null = null;
    const onPointerDown = (event: PointerEvent) => {
      if (event.pointerType === "mouse") return;
      clearTimeout(wheelTimer);
      cancelAnimationFrame(frame);
      frame = 0;
      lastFrameTime = 0;
      pointerX = event.clientX;
      list.setPointerCapture(event.pointerId);
    };
    const onPointerMove = (event: PointerEvent) => {
      if (pointerX === null) return;
      const width = list.getBoundingClientRect().width;
      if (!width) return;
      actualPosition += (pointerX - event.clientX) / width;
      pointerX = event.clientX;
      targetPosition = actualPosition;
      setPosition(actualPosition);
    };
    const onPointerEnd = () => {
      if (pointerX === null) return;
      pointerX = null;
      targetPosition = Math.round(actualPosition);
      startAnimation();
    };
    list.addEventListener("pointerdown", onPointerDown);
    list.addEventListener("pointermove", onPointerMove);
    list.addEventListener("pointerup", onPointerEnd);
    list.addEventListener("pointercancel", onPointerEnd);
    list.addEventListener("wheel", onWheel, { passive: false });
    return () => {
      clearTimeout(wheelTimer);
      cancelAnimationFrame(frame);
      moveSlideRef.current = () => {};
      list.removeEventListener("wheel", onWheel);
      list.removeEventListener("pointerdown", onPointerDown);
      list.removeEventListener("pointermove", onPointerMove);
      list.removeEventListener("pointerup", onPointerEnd);
      list.removeEventListener("pointercancel", onPointerEnd);
    };
  }, []);

  const buttonClasses = "absolute transition-colors inline-flex justify-center items-center cursor-pointer z-10 top-1/2 -mt-4 w-8 h-8 bg-slate-100 hover:bg-amber-200 focus-visible:bg-amber-200 outline-hidden border-2 border-slate-500 hover:border-(--color-old-glory-blue) focus-visible:border-(--color-old-glory-blue) rounded-full"

  const moveSlide = (direction: number) => moveSlideRef.current(direction);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-4 bg-slate-300 w-full max-w-full">
      <div className="min-w-0 w-full">
        <svg width="" height="" viewBox="0 0 494 350" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M494 0H0V350H494V0Z" className="fill-(--color-old-glory-blue)"/>
          <g id="stars" className="canton">
            {starsForAnimatedCanton.map((star: IAnimatedStar, index) => (
              <path
                key={star.abbr}
                className={`fill-white transition-opacity motion-reduce:transition-none ${index <= currentFlagIndex ? "fill-white opacity-100" : "opacity-0"}`}
                id={star.abbr}
                d={star.pathCoordinates}
              />
            ))}
          </g>
        </svg>
      </div>
      <div className="relative min-w-0 overflow-x-hidden w-full">
        <button type="button" className={`${buttonClasses} left-0`} aria-label="Previous state" onClick={() => moveSlide(-1)}>
          <span className="w-4">
            <IconArrowLeft />
          </span>
        </button>
        <button type="button" className={`${buttonClasses} right-0`} aria-label="Next state" onClick={() => moveSlide(1)}>
          <span className="w-4">
            <IconArrowRight />
          </span>
        </button>
        <ul
          ref={listRef}
          aria-label="States in admission order"
          tabIndex={0}
          onKeyDown={(event) => {
            if (event.key === "ArrowLeft" || event.key === "ArrowRight") {
              event.preventDefault();
              moveSlide(event.key === "ArrowLeft" ? -1 : 1);
            }
          }}
          className="state-name relative flex touch-pan-y items-center overflow-hidden text-center h-full min-h-32 sm:min-h-48 w-full"
        >
          {slides.map((slidePosition) => {
            const star = starsForAnimatedCanton[stateIndex(slidePosition)];
            return (
            <li
              key={slidePosition}
              aria-hidden={slidePosition !== centerSlide}
              className="absolute w-full max-w-full px-8"
              style={{ transform: `translateX(${(slidePosition - position) * 100}%)` }}
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
          );
          })}
        </ul>
      </div>
    </div>
  );
}
