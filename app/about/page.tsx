"use client"

import React from "react";
import Image from 'next/image';
import USFlagCanton from "@/app/components/USFlagCanton";

export default function AboutPage() {
  const textLinkClasses = "underline underline-offset-2 outline-hidden outline-black hover:no-underline focus:no-underline focus-visible:outline-2 focus-visible:rounded-xs";

  return (
    <div className="grid grid-cols-1 gap-4 lg:gap-8 justify-items-center">
      <div className="max-w-prose mx-auto">
        <h2 className="mb-2 lg:mb-4">About</h2>
        <p className="mb-3 lg:mb-4 text-base md:text-xl lg:text-2xl leading-normal">The Many States is a web application where people can create a personalized United States flag based on the states they&apos;ve visited.</p>
        <p className="text-base md:text-xl lg:text-2xl leading-normal">Each visible star in the flag&apos;s blue canton represents a visited state, and the stars are ordered based on each state&apos;s admission to the Union.</p>
      </div>
      <div className="max-w-full sm:max-w-xl md:max-w-[665px]">
        <USFlagCanton />
      </div>
      <div className="max-w-prose mx-auto">
        <h2 className="mb-2 lg:mb-4">Inspiration</h2>
        <p className="text-base md:text-xl lg:text-2xl leading-normal">During my senior year at design school, one of my class projects was to design a personal narrative poster. Inspired by cross-country road trips with my long-haul trucker Dad and twin brother Mike, I wanted to represent the states I had visited in each year of my life.</p>
      </div>
      <div className="col-span-full w-full">
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 lg:grid-rows-4 gap-2 sm:gap-4 xl:gap-6">
          <Image
            width={915}
            height={650}
            src="/power-wheels-teamtwin.jpg"
            alt="Matt Convente and Mike Convente as toddlers in their driveway driving a Power Wheels 18 wheeler truck cab."
            className="aspect-[1.39130435/1] w-full h-full object-cover col-start-1"
          />
          <Image
            width={979}
            height={695}
            src="/teamtwin-in-dads-truck.jpg"
            alt="Matt Convente and Mike Convente at around age four in their Dad's 18 wheeler truck cab."
            className="aspect-[1.39130435/1] w-full h-full object-cover col-start-1"
          />
          <Image
            width={1154}
            height={1749}
            src="/treasure-coast-thumbs-up.jpeg"
            alt="One of the Convente twins sitting in his Dad's 18 wheeler truck cab. The door window is down, and the twin is giving a thumb's up gesture. The door graphics read Treasure Coast Auto Transport, Stuart, Florida and have art of a purple hot rod car in front of a sunset."
            className="aspect-[0.65306122/1] w-full object-cover col-start-2 row-start-1 row-span-2"
          />
          <Image
            width={1736}
            height={1152}
            src="/eisenhower-tunnel.jpeg"
            alt="Doug Convente's Kenworth truck cab in front of the Eisenhower Tunnel on US Interstate 70."
            className="aspect-[1.39130435/1] w-full h-full object-cover col-start-2 row-start-3 md:col-start-3 md:row-start-1"
          />
          <Image
            width={1736}
            height={1154}
            src="/loveland-pass-continental-divide-teamtwin.jpeg"
            alt="Matt Convente and Mike Convente posing next to the Loveland Pass Continental Divide sign."
            className="aspect-[1.39130435/1] w-full h-full object-cover col-start-2 row-start-4 md:col-start-3 md:row-start-2"
          />
          <Image
            width={1149}
            height={1743}
            src="/loveland-pass-pikes-peak-teamtwin.jpeg"
            alt="Matt Convente and Mike Convente standing in and playing with snow on July 4, 1999 on Pikes Peak, Colorado."
            className="aspect-[0.65306122/1] w-full h-full object-cover col-start-1 row-start-3 md:col-start-4 md:row-start-1 row-span-2"
          />
          <Image
            width={1740}
            height={1148}
            src="/four-corners-dad.jpeg"
            alt="Doug Convente posing at Four Corners Monument."
            className="aspect-[1.39130435/1] w-full h-full object-cover col-start-1 md:col-start-2 row-start-5 md:row-start-3 lg:col-start-5 lg:row-start-1"
          />
          <Image
            width={1721}
            height={1202}
            src="/four-corners-postcard.jpeg"
            alt="Postcard of Four Corners Monument."
            className="aspect-[1.39130435/1] w-full h-full object-cover col-start-1 md:col-start-2 row-start-6 md:row-start-4 lg:col-start-5 lg:row-start-2"
          />
          <Image
            width={1156}
            height={1745}
            src="/four-corners-teamtwin.jpeg"
            alt="Matt Convente and Mike Convente posting at Four Corners Monument."
            className="aspect-[0.65306122/1] w-full h-full object-cover col-start-2 md:col-start-1 row-start-5 md:row-start-3 lg:col-start-6 lg:row-start-1 row-span-2"
          />
          <Image
            width={1156}
            height={1745}
            src="/grand-canyon-teamtwin.jpeg"
            alt="Matt Convente and Mike Convente posting at the Grand Canyon."
            className="aspect-[0.65306122/1] w-full h-full object-cover object-left col-start-1 row-start-7 md:col-start-3 md:row-start-3 lg:col-start-1 lg:row-start-3 row-span-2"
          />
          <Image
            width={1708}
            height={1195}
            src="/grand-canyon-postcard.jpeg"
            alt="Postcard of the Grand Canyon."
            className="aspect-[1.39130435/1] w-full h-full object-cover object-right-top col-start-2 row-start-7 md:col-start-4 md:row-start-3 lg:col-start-2 lg:row-start-3"
          />
          <Image
            width={1744}
            height={1153}
            src="/mt-lemmon-az-teamtwin.jpeg"
            alt="Matt Convente and Mike Convente posing next to the Ski Valley, Mount Lemmon, Arizona sign."
            className="aspect-[1.39130435/1] w-full h-full object-cover object-right col-start-2 row-start-8 md:col-start-4 md:row-start-4 lg:col-start-2 lg:row-start-4"
          />
          <Image
            width={1165}
            height={1755}
            src="/mt-lemmon-az-postcard.jpeg"
            alt="Postcard of Ski Valley in Mount Lemmon, Arizona."
            className="aspect-[0.65306122/1] w-full h-full object-cover object-left col-start-2 row-start-9 md:row-start-5 lg:col-start-3 lg:row-start-3 row-span-2"
          />
          <Image
            width={1768}
            height={1160}
            src="/pima-air-museum-postcard.jpeg"
            alt="Postcard of the Pima Air and Space Museum in Tuscon, Arizona. The postcard shows an old propeller variant of Air Force One, a Douglas VC-118A Liftmaster."
            className="aspect-[1.39130435/1] w-full h-full object-cover col-start-1 row-start-9 md:row-start-5 lg:col-start-4 lg:row-start-3"
          />
          <Image
            width={1744}
            height={1153}
            src="/pima-air-museum-teamtwin.jpeg"
            alt="Matt Convente and Mike Conventte at the Pima Air and Space Museum in Tuscon, Arizona posing in front of the Douglas VC-118A Liftmaster version of Air Force One."
            className="aspect-[1.39130435/1] w-full h-full object-cover object-left col-start-1 row-start-10 md:row-start-6 lg:col-start-4 lg:row-start-4"
          />
          <Image
            width={1132}
            height={2448}
            src="/arches-national-park-map-and-guide.jpeg"
            alt="Scan of Arches National Park Official Map and Guide. A receipt is taped to the front of the guide showing a date and time of July 6, 1999 at 7:31 AM and entry price of $10."
            className="aspect-[0.65306122/1] w-full h-full object-cover object-top col-start-1 row-start-11 md:col-start-4 md:row-start-5 lg:col-start-5 lg:row-start-3 row-span-2"
          />
          <Image
            width={1749}
            height={1149}
            src="/pikes-peak-mercury.jpeg"
            alt="Doug Convente's Mercury Mystique sedan on Pikes Peak Highway."
            className="aspect-[1.39130435/1] w-full h-full object-cover col-start-2 row-start-11 md:col-start-3 md:row-start-5 lg:col-start-6 lg:row-start-3"
          />
          <Image
            width={1741}
            height={1154}
            src="/nogales-az-teamtwin.jpeg"
            alt="Matt Convente and Mike Convente at the US–Mexico border in Nogales, Arizona posing in front of a sign that says To Mexico with an arrow pointing left."
            className="aspect-[1.39130435/1] w-full h-full object-cover col-start-2 row-start-12 md:col-start-3 md:row-start-6 lg:col-start-6 lg:row-start-4"
          />
        </div>
      </div>
      <div className="max-w-prose mx-auto">
        <p className="mb-3 lg:mb-4 text-base md:text-xl lg:text-2xl leading-normal">With help from my parents, I was able to recollect the states I had visited during the earliest years of my life.</p>
        <p className="mb-3 lg:mb-4 text-base md:text-xl lg:text-2xl leading-normal">Rather than highlight visited states on a geographic map like existing apps, as a creative twist, I chose to represent visited states as illuminated stars in the flag&apos;s blue canton.</p>
        <div className="my-4 lg:my-6 md:max-w-md lg:max-w-lg mx-auto">
          <Image
            src="/the-many-states-of-matt-convente.jpg"
            alt="The Many States of Matt Convente personal narrative poster."
            width={1600}
            height={2400}
          />
        </div>
        <p className="text-base md:text-xl lg:text-2xl leading-normal">I wanted others to be able to create their own flag, so I built The Many States. I have such fond memories of my childhood road trips and continue to enjoy exploring everything the United States has to offer.</p>
      </div>
      <div className="max-w-prose mx-auto">
        <h2 className="mb-2 lg:mb-4">Colophon</h2>
        <p className="mb-3 lg:mb-4 text-base md:text-xl lg:text-2xl leading-normal">The Many States is set in <a href="https://fonts.google.com/specimen/Libre+Caslon+Text" className={textLinkClasses}>Libre Caslon Text</a>, a Google Fonts version of Caslon, originally designed by <a href="https://en.wikipedia.org/wiki/William_Caslon" className={textLinkClasses}>William Caslon I.</a></p>
        <p className="mb-3 lg:mb-4 text-base md:text-xl lg:text-2xl leading-normal">According to <a href="https://fonts.adobe.com/fonts/adobe-caslon#about-section" className={textLinkClasses}>Adobe Fonts</a>, &ldquo;the first printings of the American Declaration of Independence and the Constitution were set in Caslon.&rdquo;</p>
        <p className="mb-3 lg:mb-4 text-base md:text-xl lg:text-2xl leading-normal">For the logo, red stripes, and blue canton, I referenced the&nbsp;colors <em>Old Glory Red</em> and <em>Old Glory Blue</em> from the <a href="https://eca.state.gov/files/bureau/eca_design_guide.pdf" className={textLinkClasses}>United&nbsp;States Bureau of Educational and Culture Affairs Design Guide</a> (PDF).</p>
        <div className="grid grid-cols-2 gap-4 lg:mt-6">
          <div>
            <h3 className="mb-2">Old Glory Red</h3>
            <div className="flex gap-2 md:gap-4 items-center">
              <div className="w-8 h-8 md:w-16 md:h-16 lg:w-24 lg:h-24 bg-(--color-old-glory-red)"></div>
              <ul className="text-sm md:text-base">
                <li><strong>RGB:</strong> 179, 25, 66</li>
                <li><strong>Hex:</strong> #B31942</li>
              </ul>
            </div>
          </div>
          <div>
            <h3 className="mb-2">Old Glory Blue</h3>
            <div className="flex gap-2 md:gap-4 items-center">
              <div className="w-8 h-8 md:w-16 md:h-16 lg:w-24 lg:h-24 bg-(--color-old-glory-blue)"></div>
              <ul className="text-sm md:text-base">
                <li><strong>RGB:</strong> 10, 49, 97</li>
                <li><strong>Hex:</strong> #0A3161</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
