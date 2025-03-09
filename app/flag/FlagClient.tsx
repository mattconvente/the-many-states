"use client"

import React, { Suspense, useEffect, useRef, useMemo, useState } from "react";
import clsx from "clsx";
import { useSearchParams } from "next/navigation";
import { useTheManyStatesStore } from "@/app/store";
import { states } from "@/app/data";
import { IState } from "@/app/types";
import { useGetSortedVisitedStateAbbrs } from "@/app/hooks/useGetSortedVisitedStateAbbrs";
import { Tooltip } from "react-tooltip";
import Button from "@/app/components/Button";
import Link from "@/app/components/Link";
import USFlag from "@/app/components/USFlag";
import IconCircleCheck from "@/app/components/icons/CircleCheck";
import IconFacebook from "@/app/components/icons/Facebook";
import IconHandPointer from "@/app/components/icons/HandPointer";
import IconLink from "@/app/components/icons/Link";
import IconX from "@/app/components/icons/X";

function FlagPageContent() {
  const visitedStates = useTheManyStatesStore((state) => state.visitedStates);
  const unvisitedStates = useTheManyStatesStore((state) => state.unvisitedStates);
  const setVisitedStates = useTheManyStatesStore((state) => state.setVisitedStates);
  const setUnvisitedStates = useTheManyStatesStore((state) => state.setUnvisitedStates);
  const setHoveredVisitedState = useTheManyStatesStore((state) => state.setHoveredVisitedState);
  const setHoveredUnvisitedState = useTheManyStatesStore((state) => state.setHoveredUnvisitedState);

  const [isSocialShareUrlCopied, setIsSocialShareUrlCopied] = useState(false);
  const copySocialShareUrlTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const numVisistedStatesContainerClasses = clsx("num-visited-states-container relative", {
    "has-visited-states lg:sticky bg-background border-b border-stone-400 pb-3 md:top-0 md:pb-6 md:pt-8 md:-mt-6 lg:pt-12 lg:-mt-12": visitedStates.length > 0,
  });

  const searchParams = useSearchParams();
  const visitedStatesParams = useMemo(
    () => searchParams.get("visitedStates")?.split(",").sort((a, b) => a.localeCompare(b)),
    [searchParams]
  );

  useEffect(() => {
    if (!visitedStatesParams || visitedStates.length > 0) return;

    const tempVisitedStates: IState[] = [];
    const tempUnvisitedStates: IState[] = [];

    states.forEach((state) => {
      if (visitedStatesParams.includes(state.abbr)) {
        tempVisitedStates.push(state);
      } else {
        tempUnvisitedStates.push(state);
      }
    });

    setVisitedStates(tempVisitedStates);
    setUnvisitedStates(tempUnvisitedStates);
  }, [visitedStatesParams, visitedStates.length, setVisitedStates, setUnvisitedStates]);

  const sortedVisitedStatesByName = useMemo(
    () => [...visitedStates].sort((a, b) => a.name.localeCompare(b.name)),
    [visitedStates]
  );

  const sortedUnvisitedStatesByName = useMemo(
    () => [...unvisitedStates].sort((a, b) => a.name.localeCompare(b.name)),
    [unvisitedStates]
  );

  const sortedVisitedStateAbbrs = useGetSortedVisitedStateAbbrs(visitedStates);

  const numVisitedStatesMarkup = visitedStates.length === 0
    ? (
      <div className="flex flex-col items-center">
        <h2 className="mb-4">Looks like you haven&apos;t selected any states.</h2>
        <h3 className="font-normal text-center lg:text-left mb-4">Head back to the US map and select the states you&apos;ve&nbsp;visited.</h3>
        <p className="text-center">
          <Link
            href="/"
          >
            Return to the US map
          </Link>
        </p>
      </div>
    )
      : visitedStates.length === 50
        ? (
            <h2 className="flex justify-center lg:justify-start">
              You&apos;ve visited all 50 states! Awesome!
            </h2>
          )
        : (
          <h2 className="flex justify-center lg:justify-start">
            {`You've visited ${visitedStates.length} of 50 states!`}
          </h2>
        );

  const hoverStatesMarkup = visitedStates.length === 0
    ? null
    : (
      <div className="flex mt-2 gap-2 justify-center lg:justify-start">
        <span className="w-4">
          <IconHandPointer />
        </span>
        <small className="leading-5">Hover the state names to see their stars highlighted in the&nbsp;canton.</small>
      </div>
    );

  const statesVisitedMarkup = visitedStates.length === 0
    ? null
    : (
    <div>
        <h3 className="mb-1">States you&apos;ve visited</h3>
        <div className="grid gap-1 grid-cols-[repeat(auto-fill,minmax(160px,1fr))] md:grid-cols-[repeat(auto-fill,minmax(192px,1fr))] lg:grid-cols-[repeat(auto-fill,minmax(144px,1fr))]">
          {sortedVisitedStatesByName.map((visitedState) => (
            <div
              key={visitedState.abbr}
              role="button"
              tabIndex={0}
              className="inline-flex items-center p-1 cursor-default transition-colors outline-hidden hover:bg-yellow-400 focus:bg-yellow-400"
              onMouseOver={() => setHoveredVisitedState(visitedState)}
              onFocus={() => setHoveredVisitedState(visitedState)}
              onMouseLeave={() => setHoveredVisitedState(null)}
              onBlur={() => setHoveredVisitedState(null)}
            >
              <picture className="inline-flex shrink-0 justify-center w-8 me-2">
                <source
                  type="image/webp"
                  srcSet={`https://flagcdn.com/h20/us-${visitedState.abbr.toLowerCase()}.webp,
                  https://flagcdn.com/h40/us-${visitedState.abbr.toLowerCase()}.webp 2x`}
                />
                <source
                  type="image/png"
                  srcSet={`https://flagcdn.com/h20/us-${visitedState.abbr.toLowerCase()}.png,
                  https://flagcdn.com/h40/us-${visitedState.abbr.toLowerCase()}.png 2x`}
                />
                <img
                  src={`https://flagcdn.com/h40/us-${visitedState.abbr.toLowerCase()}.png`}
                  height="20"
                  alt={`Flag of ${visitedState.name}`}
                />
              </picture>
              <span className="underline underline-offset-2 decoration-1 decoration-dotted">{visitedState.name}</span>
            </div>
          ))}
        </div>
      </div>
    );

  const statesLeftToSeeMarkup = unvisitedStates.length === 0 || (visitedStates.length === 0 && unvisitedStates.length === 50)
    ? null
    : (
      <div>
        <h3 className="mb-1">States left to see</h3>
        <div className="grid gap-1 grid-cols-[repeat(auto-fill,minmax(160px,1fr))] md:grid-cols-[repeat(auto-fill,minmax(192px,1fr))] lg:grid-cols-[repeat(auto-fill,minmax(144px,1fr))]">
          {sortedUnvisitedStatesByName.map((unvisitedState) => (
            <div
              key={unvisitedState.abbr}
              role="button"
              tabIndex={0}
              className="inline-flex items-center p-1 cursor-default transition-colors outline-hidden hover:bg-slate-50 focus:bg-slate-50"
              onMouseOver={() => setHoveredUnvisitedState(unvisitedState)}
              onFocus={() => setHoveredUnvisitedState(unvisitedState)}
              onMouseLeave={() => setHoveredUnvisitedState(null)}
              onBlur={() => setHoveredUnvisitedState(null)}
            >
              <picture className="inline-flex shrink-0 justify-center w-8 me-2">
                <source
                  type="image/webp"
                  srcSet={`https://flagcdn.com/h20/us-${unvisitedState.abbr.toLowerCase()}.webp,
                  https://flagcdn.com/h40/us-${unvisitedState.abbr.toLowerCase()}.webp 2x`}
                />
                <source
                  type="image/png"
                  srcSet={`https://flagcdn.com/h20/us-${unvisitedState.abbr.toLowerCase()}.png,
                  https://flagcdn.com/h40/us-${unvisitedState.abbr.toLowerCase()}.png 2x`}
                />
                <img
                  src={`https://flagcdn.com/h40/us-${unvisitedState.abbr.toLowerCase()}.png`}
                  height="20"
                  alt={`Flag of ${unvisitedState.name}`}
                />
              </picture>
              <span className="underline underline-offset-2 decoration-1 decoration-dotted">{unvisitedState.name}</span>
            </div>
          ))}
        </div>
      </div>
    );

  const socialShareCTAText = "Check out my personalized United States flag from The Many States.";
  const socialShareText = visitedStates.length === 50
    ? encodeURIComponent(`I've visited all 50 states! ${socialShareCTAText}`)
    : encodeURIComponent(`I've visited ${visitedStates.length} of 50 states! ${socialShareCTAText}`);
  const rawShareUrl = `https://www.themanystates.com/flag?visitedStates=${sortedVisitedStateAbbrs.join(",")}`;
  const socialShareUrl = encodeURIComponent(rawShareUrl);
  const fbShareLink = `https://www.facebook.com/sharer/sharer.php?u=${socialShareUrl}`;
  const xShareLink = `https://x.com/intent/post?text=${socialShareText}&url=${socialShareUrl}`;

  const copyToClipboard = async (clip: string) => {
    try {
      await navigator.clipboard.writeText(clip);
      setIsSocialShareUrlCopied(true);

      if (copySocialShareUrlTimeoutRef.current) {
        clearTimeout(copySocialShareUrlTimeoutRef.current);
      }

      copySocialShareUrlTimeoutRef.current = setTimeout(() => {
        setIsSocialShareUrlCopied(false);
      }, 2000);
    } catch (err) {
      console.error("Error copying social share URL", err);
    }
  }

  const socialShareUrlTooltipText = isSocialShareUrlCopied
      ? "Link copied!"
      : "Copy link";

  const socialSharingMarkup = visitedStates.length > 0
    ? (
    <div>
      <h3 className="mb-1">Share your flag</h3>
      <div className="flex gap-3 items-center">
        <Link
          href={fbShareLink}
          variant="facebook"
          size="square"
          external
        >
          <span className="w-6 h-6">
            <IconFacebook />
          </span>
        </Link>
        <Link
          href={xShareLink}
          variant="x"
          size="square"
          external
        >
          <span className="w-6 h-6">
            <IconX />
          </span>
        </Link>
        <Button
          onClick={() => copyToClipboard(rawShareUrl)}
          variant="secondary"
          size="square"
          data-tooltip-id="copySocialShareUrl"
          data-tooltip-content={socialShareUrlTooltipText}
          data-tooltip-place="top"
          data-tooltip-variant="light"
          data-tooltip-offset={8}
        >
          <span className="w-6">
            {isSocialShareUrlCopied ? <IconCircleCheck /> : <IconLink />}
          </span>
        </Button>
      </div>
      <Tooltip id="copySocialShareUrl" />
    </div>
  ) : null;

  return (
    <div className="grid gap-4 md:gap-6 lg:gap-8 items-start grid-cols-1 lg:grid-cols-[2fr_1fr]">
      <USFlag visitedStates={visitedStates} className="w-full md:mx-auto md:max-w-3xl lg:max-w-full lg:sticky lg:top-12" />
      <div className="flex shrink-0 flex-col gap-6">
        <div className={numVisistedStatesContainerClasses}>
          {numVisitedStatesMarkup}
          {hoverStatesMarkup}
        </div>
        {statesVisitedMarkup}
        {statesLeftToSeeMarkup}
        {socialSharingMarkup}
      </div>
    </div>
  );
}

export default function FlagPage() {
  return (
    // TODO: make Loading component
    <Suspense name="Flag Page" fallback={<div>Loading...</div>}>
      <FlagPageContent />
    </Suspense>
  );
}
