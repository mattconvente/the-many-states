"use client"

import React from "react";
import Image from "next/image";
import { Link } from "next-view-transitions";
import { usePathname } from "next/navigation";
import { useTheManyStatesStore } from "@/app/store";
import { useGetSortedVisitedStateAbbrs } from "@/app/hooks/useGetSortedVisitedStateAbbrs";

export default function Header() {
  const pathname = usePathname();
  const visitedStates = useTheManyStatesStore((state) => state.visitedStates);
  const sortedVisitedStateAbbrs = useGetSortedVisitedStateAbbrs(visitedStates);
  const flagHref = visitedStates.length > 0
    ? `/flag?visitedStates=${encodeURI(sortedVisitedStateAbbrs.join(","))}`
    : "/flag";
  const navClasses = "outline-none hover:no-underline focus:no-underline focus-visible:outline-black focus-visible:rounded-sm";

  return (
    <header className="flex flex-col gap-2 md:gap-none md:flex-row items-center justify-between">
      <Link
        href="/"
        className="focus-visible:rounded-sm focus-visible:outline-none focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-black"
      >
        <div className="w-[275px] md:w-[360px]">
          <Image
            src="/the-many-states-logo.svg"
            alt="The Many States logo"
            width={275}
            height={32}
            style={{ width: "100%", height: "auto" }}
            priority
          />
        </div>
      </Link>
      <nav className="flex gap-4 md:gap-6 text-base md:text-xl">
        <Link
          href="/"
          className={`${navClasses} ${pathname === "/" ? "bg-slate-50" : "underline underline-offset-2"}`}
        >
          My Map
        </Link>
        <Link
          href={flagHref}
          className={`${navClasses} ${pathname === "/flag" ? "bg-slate-50" : "underline underline-offset-2"}`}
        >
          My Flag
        </Link>
        <Link
          href="/about"
          className={`${navClasses} ${pathname === "/about" ? "bg-slate-50" : "underline underline-offset-2"}`}
        >
          About
        </Link>
      </nav>
    </header>
  );
};
