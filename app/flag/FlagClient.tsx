"use client"

import React, { Suspense, useEffect, useRef, useMemo, useState } from "react";
import clsx from "clsx";
import { useSearchParams } from "next/navigation";
import { useTheManyStatesStore } from "@/app/store";
import { states } from "@/app/data";
import { IState } from "@/app/types";
import { useGetSortedVisitedStateAbbrs } from "@/app/hooks/useGetSortedVisitedStateAbbrs";
import Button from "@/app/components/Button";
import Link from "@/app/components/Link";
import USFlag from "@/app/components/USFlag";
import { Tooltip } from "react-tooltip";

function FlagPageContent() {
  const visitedStates = useTheManyStatesStore((state) => state.visitedStates);
  const unvisitedStates = useTheManyStatesStore((state) => state.unvisitedStates);
  const setVisitedStates = useTheManyStatesStore((state) => state.setVisitedStates);
  const setUnvisitedStates = useTheManyStatesStore((state) => state.setUnvisitedStates);
  const setHoveredVisitedState = useTheManyStatesStore((state) => state.setHoveredVisitedState);
  const setHoveredUnvisitedState = useTheManyStatesStore((state) => state.setHoveredUnvisitedState);

  const [isSocialShareUrlCopied, setIsSocialShareUrlCopied] = useState(false);
  const copySocialShareUrlTimeoutRef = useRef<NodeJS.Timeout | null>(null);

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
      <React.Fragment>
        <h2 className="mb-4">Looks like you haven&apos;t selected any states.</h2>
        <h3 className="font-normal mb-4">Head back to the US map and select the states you&apos;ve&nbsp;visited.</h3>
        <p className="text-center">
          <Link
            href="/"
          >
            Return to the US map
          </Link>
        </p>
      </React.Fragment>
    )
      : visitedStates.length === 50
        ? <h2>You&apos;ve visited all 50 states! Awesome!</h2>
        : <h2>{`You've visited ${visitedStates.length} of 50 states!`}</h2>;

  const hoverStatesMarkup = visitedStates.length === 0
    ? null
    : (
      <div className="flex mt-2 gap-2 justify-start">
        <span className="w-4">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
            <path className="fill-(--color-old-glory-blue)" d="M0 312c0 8.4 2.6 16.8 8 24l72 96c33.7 45 84.6 73.4 140 79c4.8 .7 9.7 1 14.7 1l5.2 0 64.1 0 16 0c70.7 0 128-57.3 128-128l0-48 0-16 0-48c0-26.5-21.5-48-48-48c-12.4 0-23.6 4.7-32.1 12.3C366 211.5 345.3 192 320 192c-13.8 0-26.3 5.8-35 15.2C278.2 189 260.6 176 240 176c-12.3 0-23.5 4.6-32 12.2L208 40c0-22.1-17.9-40-40-40s-40 17.9-40 40l0 322.7L72 288c-13.3-17.7-38.3-21.3-56-8C5.5 287.9 0 299.9 0 312zm208-8c0-8.8 7.2-16 16-16c4.4 0 8.4 1.8 11.3 4.7c1.4 1.4 2.6 3.2 3.4 5.1c.4 1 .7 2 .9 3c.1 .5 .2 1.1 .2 1.6s.1 1.1 .1 1.6c0 32 0 64 0 96.1c0 .4 0 1-.1 1.5s-.1 1.1-.2 1.6c-.2 1-.5 2-.9 3c-.8 1.9-2 3.6-3.4 5.1c-2.9 2.9-6.9 4.7-11.3 4.7c-8.8 0-16-7.2-16-16c0-32 0-64 0-96zm64 0c0-8.8 7.2-16 16-16c4.4 0 8.4 1.8 11.3 4.7c1.4 1.4 2.6 3.2 3.4 5.1c.4 1 .7 2 .9 3c.1 .5 .2 1.1 .2 1.6s.1 1.1 .1 1.6c0 32 0 64 0 96.1c0 .4 0 1-.1 1.5s-.1 1.1-.2 1.6c-.2 1-.5 2-.9 3c-.8 1.9-2 3.6-3.4 5.1c-2.9 2.9-6.9 4.7-11.3 4.7c-8.8 0-16-7.2-16-16c0-32 0-64 0-96zm64 0c0-8.8 7.2-16 16-16s16 7.2 16 16l0 96c0 8.8-7.2 16-16 16s-16-7.2-16-16l0-96z"/>
            <path className="fill-white" d="M224 288c8.8 0 16 7.2 16 16l0 96c0 8.8-7.2 16-16 16s-16-7.2-16-16l0-96c0-8.8 7.2-16 16-16zm64 0c8.8 0 16 7.2 16 16l0 96c0 8.8-7.2 16-16 16s-16-7.2-16-16l0-96c0-8.8 7.2-16 16-16zm80 16l0 96c0 8.8-7.2 16-16 16s-16-7.2-16-16l0-96c0-8.8 7.2-16 16-16s16 7.2 16 16z"/>
          </svg>
        </span>
        <small className="leading-5">Hover the state names to see their stars highlighted in the&nbsp;canton.</small>
      </div>
    );

  const statesVisitedMarkup = visitedStates.length === 0
    ? null
    : (
    <div>
        <h3 className="mb-1">States you&apos;ve visited</h3>
        <ul className="inline-flex flex-wrap gap-1">
          {sortedVisitedStatesByName.map((visitedState, index) => (
            <li
              key={visitedState.abbr}
              role="button"
              tabIndex={0}
              className={clsx(
                "inline-flex cursor-default transition-colors outline-hidden hover:bg-yellow-400 focus:bg-yellow-400",
                {
                  "after:content-[',']": index !== sortedVisitedStatesByName.length - 1
                }
              )}
              onMouseOver={() => setHoveredVisitedState(visitedState)}
              onFocus={() => setHoveredVisitedState(visitedState)}
              onMouseLeave={() => setHoveredVisitedState(null)}
              onBlur={() => setHoveredVisitedState(null)}
            >
              {visitedState.name}
            </li>
          ))}
        </ul>
      </div>
    );

  const statesLeftToSeeMarkup = unvisitedStates.length === 0 || (visitedStates.length === 0 && unvisitedStates.length === 50)
    ? null
    : (
      <div>
        <h3 className="mb-1">States left to see</h3>
        <ul className="inline-flex flex-wrap gap-1">
          {sortedUnvisitedStatesByName.map((unvisitedState, index) => (
            <li
              key={unvisitedState.abbr}
              role="button"
              tabIndex={0}
              className={clsx(
                "inline-flex cursor-default transition-colors outline-hidden hover:bg-slate-50 focus:bg-slate-50",
                {
                  "after:content-[',']": index !== sortedUnvisitedStatesByName.length - 1
                }
              )}
              onMouseOver={() => setHoveredUnvisitedState(unvisitedState)}
              onFocus={() => setHoveredUnvisitedState(unvisitedState)}
              onMouseLeave={() => setHoveredUnvisitedState(null)}
              onBlur={() => setHoveredUnvisitedState(null)}
            >
              {unvisitedState.name}
            </li>
          ))}
        </ul>
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

  const linkIcon = (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512">
      <path d="M59.7 244.8C3.5 301 3.5 392.1 59.7 448.2c53.6 53.6 139.5 56.4 196.5 6.5l6.1-5.4-31.6-36.1-6.1 5.4c-38 33.2-95.2 31.3-130.9-4.4c-37.4-37.4-37.4-98.1 0-135.6L207 165.4c37.4-37.4 98.1-37.4 135.6 0c35.7 35.7 37.6 92.9 4.4 130.9l-5.4 6.1L377.7 334l5.4-6.1c49.9-57 47-142.9-6.5-196.5c-56.2-56.2-147.3-56.2-203.5 0L59.7 244.8zm520.6 22.4c56.2-56.2 56.2-147.3 0-203.5C526.8 10.2 440.9 7.3 383.9 57.2l-6.1 5.4 31.6 36.1 6.1-5.4c38-33.2 95.2-31.3 130.9 4.4c37.4 37.4 37.4 98.1 0 135.6L433.1 346.6c-37.4 37.4-98.2 37.4-135.6 0c-35.7-35.7-37.6-92.9-4.4-130.9l4.7-5.4-36.1-31.6-4.7 5.4c-49.8 57-46.9 142.9 6.6 196.4c56.2 56.2 147.3 56.2 203.5 0L580.3 267.2z" fill="currentColor" />
    </svg>
  );

  const circleCheckIcon = (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
      <path d="M0 256a256 256 0 1 0 512 0A256 256 0 1 0 0 256zm126.1 0L160 222.1c.3 .3 .6 .6 1 1c5.3 5.3 10.7 10.7 16 16c15.7 15.7 31.4 31.4 47 47c37-37 74-74 111-111c5.3-5.3 10.7-10.7 16-16c.3-.3 .6-.6 1-1L385.9 192c-.3 .3-.6 .6-1 1l-16 16L241 337l-17 17-17-17-64-64c-5.3-5.3-10.7-10.7-16-16l-1-1z" className="fill-emerald-600"/>
      <path d="M385 193L241 337l-17 17-17-17-80-80L161 223l63 63L351 159 385 193z" fill="white"/>
    </svg>
  );

  const socialSharingMarkup = visitedStates.length > 0
    ? (
    <div>
      <h3 className="mb-1">Share on social media</h3>
      <div className="flex gap-3 items-center">
        <Link
          href={fbShareLink}
          variant="facebook"
          size="square"
          external
        >
          <span className="w-6 h-6">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
              <path d="M512 256C512 114.6 397.4 0 256 0S0 114.6 0 256C0 376 82.7 476.8 194.2 504.5V334.2H141.4V256h52.8V222.3c0-87.1 39.4-127.5 125-127.5c16.2 0 44.2 3.2 55.7 6.4V172c-6-.6-16.5-1-29.6-1c-42 0-58.2 15.9-58.2 57.2V256h83.6l-14.4 78.2H287V510.1C413.8 494.8 512 386.9 512 256h0z" fill="currentColor" />
            </svg>
          </span>
        </Link>
        <Link
          href={xShareLink}
          variant="x"
          size="square"
          external
        >
          <span className="w-6 h-6">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
              <path d="M389.2 48h70.6L305.6 224.2 487 464H345L233.7 318.6 106.5 464H35.8L200.7 275.5 26.8 48H172.4L272.9 180.9 389.2 48zM364.4 421.8h39.1L151.1 88h-42L364.4 421.8z" fill="currentColor" />
            </svg>
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
            {isSocialShareUrlCopied ? circleCheckIcon : linkIcon}
          </span>
        </Button>
      </div>
      <Tooltip id="copySocialShareUrl" />
    </div>
  ) : null;

  return (
    <div className="grid gap-4 md:gap-6 lg:gap-8 items-start grid-cols-1 md:grid-cols-2 lg:grid-cols-[2fr_1fr]">
      <USFlag visitedStates={visitedStates} />
      <div className="flex shrink-0 flex-col gap-6">
        <div>
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
