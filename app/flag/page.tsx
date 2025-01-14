import { Metadata } from "next";
import { states } from "@/app/data";
import { defaultOpenGraphMetadata, defaultTwitterMetadata } from "@/app/metadata/metadata";
import { IState } from '@/app/types';
import FlagClient from "./FlagClient";

export async function generateMetadata(
  { searchParams }: { searchParams: Promise<{ [key: string]: string }> }
): Promise<Metadata> {
  const stateAbbrsSet = new Set(states.map((s: IState) => s.abbr));
  const resolvedSearchParams = await searchParams;

  const visitedStatesAbbrs = resolvedSearchParams.visitedStates ?? "";
  const filteredVisitedStatesAbbrs = visitedStatesAbbrs
    .split(",")
    .filter((abbr: string) => stateAbbrsSet.has(abbr))
    .join(",");

  const numVisitedStates = filteredVisitedStatesAbbrs.split(",")
    .filter((visitedState) => visitedState !== "")
    .length;

  const baseURL = new URL('https://www.themanystates.com');
  const canonicalUrl = `${baseURL.origin}/flag/visitedStates?=${encodeURI(filteredVisitedStatesAbbrs)}`;
  const dynamicOGImage = `${baseURL.origin}/api/og?visitedStates=${encodeURI(filteredVisitedStatesAbbrs)}`;

  const numVisitedStatesText =
    numVisitedStates === 50
      ? "I've visited all 50 states!"
      : `I've visited ${numVisitedStates} of 50 states!`;

  const flagPageMetadata = numVisitedStates === 0
    ? {
      alternates: {
        canonical: "https://www.themanystates.com",
      },
      openGraph: defaultOpenGraphMetadata,
      twitter: defaultTwitterMetadata,
    } : {
      alternates: {
        canonical: canonicalUrl,
      },
      openGraph: {
        title: "The Many States",
        description: numVisitedStatesText,
        url: canonicalUrl,
        siteName: "The Many States",
        images: [
          {
            url: dynamicOGImage,
            width: 1200,
            height: 630,
            alt: numVisitedStatesText,
          },
        ],
      },
      twitter: {
        card: "summary_large_image",
        title: "The Many States",
        description: numVisitedStatesText,
        images: dynamicOGImage,
      },
    };

  return flagPageMetadata;
}

export default function Page() {
  return <FlagClient />;
}
