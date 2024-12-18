"use client"

import React from "react";
import Image from 'next/image';
import USFlagCanton from "@/app/components/USFlagCanton";

export default function AboutPage() {
  const textLinkClasses = "underline underline-offset-2 outline-none hover:no-underline focus:no-underline focus-visible:outline-black focus-visible:rounded-sm";

  return (
    <div className="max-w-prose m-auto flex flex-col gap-4 lg:gap-8">
      <div>
        <h2 className="mb-2 lg:mb-4">About</h2>
        <p className="mb-3 lg:mb-4 text-base md:text-xl lg:text-2xl leading-normal">The Many States is a web application where people can generate a personalized United States flag based on the States they&apos;ve visited.</p>
        <p className="mb-3 lg:mb-4 text-base md:text-xl lg:text-2xl leading-normal">Each visible star in the flag&apos;s blue canton represents a visited state, and the stars are ordered based on each State&apos;s admission to the Union.</p>
        <USFlagCanton />
      </div>
      <div>
        <h2 className="mb-2 lg:mb-4">Inspiration</h2>
        <p className="text-base md:text-xl lg:text-2xl leading-normal">During my senior year at design school, one of my class projects was to design a personal narrative poster. Inspired by cross-country road trips with my long-haul trucker Dad and twin brother Mike, I wanted to represent the States I had visited in each year of my life.</p>
        <div className="grid grid-flow-col grid-rows-4 grid-cols-2 gap-4 md:gap-6 md:-mx-12 my-4 md:my-8">
          <div className="row-span-2 self-start">
            <Image
              src="/matt-mike-in-dads-truck.jpg"
              alt="Matt Convente and Mike Convente at around age four in their Dad's 18 wheeler truck cab."
              width={979}
              height={695}
            />
          </div>
          <div className="row-span-2 self-end">
            <Image
              src="/matt-mike-power-wheels.jpg"
              alt="Matt Convente and Mike Convente as toddlers in their driveway driving a Power Wheels 18 wheeler truck cab."
              width={915}
              height={650}
            />
          </div>
          <div className="col-start-2 row-span-4">
            <Image
              src="/the-many-states-of-matt-convente.jpg"
              alt="The Many States of Matt Convente personal narrative poster."
              width={1600}
              height={2400}
            />
          </div>
        </div>
        <p className="mb-3 lg:mb-4 text-base md:text-xl lg:text-2xl leading-normal">With help from my parents, I was able to recollect the States I had visited during the earliest years of my life.</p>
        <p className="mb-3 lg:mb-4 text-base md:text-xl lg:text-2xl leading-normal">Rather than highlight visited States on a geographic map like already-existing apps, as a creative twist, I chose to represent visited states as illuminated stars in the flag&apos;s blue canton.</p>
        <p className="text-base md:text-xl lg:text-2xl leading-normal">I wanted others to be able to create their own flag, so I built The Many States. I have such fond memories of my childhood road trips and continue to enjoy exploring everything the United States has to offer.</p>
      </div>
      <div>
        <h2 className="mb-2 lg:mb-4">Colophon</h2>
        <p className="mb-3 lg:mb-4 text-base md:text-xl lg:text-2xl leading-normal">The Many States is set in <a href="https://fonts.google.com/specimen/Libre+Caslon+Text" className={textLinkClasses}>Libre Caslon Text</a>, a Google Fonts version of Caslon, originally designed by <a href="https://en.wikipedia.org/wiki/William_Caslon" className={textLinkClasses}>William Caslon I.</a></p>
        <p className="mb-3 lg:mb-4 text-base md:text-xl lg:text-2xl leading-normal">According to <a href="https://fonts.adobe.com/fonts/adobe-caslon#about-section" className={textLinkClasses}>Adobe Fonts</a>, &ldquo;the first printings of the American Declaration of Independence and the Constitution were set in Caslon.&rdquo;</p>
        <p className="mb-3 lg:mb-4 text-base md:text-xl lg:text-2xl leading-normal">For the logo, red stripes, and blue canton, I referenced the&nbsp;colors <em>Old Glory Red</em> and <em>Old Glory Blue</em> from the <a href="https://eca.state.gov/files/bureau/eca_design_guide.pdf" className={textLinkClasses}>United&nbsp;States Bureau of Educational and Culture Affairs Design Guide</a> (PDF).</p>
        <div className="grid grid-cols-2 gap-4 lg:mt-6">
          <div>
            <h3 className="mb-2">Old Glory Red</h3>
            <div className="flex gap-2 md:gap-4 items-center">
              <div className="w-8 h-8 md:w-16 md:h-16 lg:w-24 lg:h-24 bg-[--color-old-glory-red]"></div>
              <ul className="text-sm md:text-base">
                <li><strong>RGB:</strong> 179, 25, 66</li>
                <li><strong>Hex:</strong> #B31942</li>
              </ul>
            </div>
          </div>
          <div>
            <h3 className="mb-2">Old Glory Blue</h3>
            <div className="flex gap-2 md:gap-4 items-center">
              <div className="w-8 h-8 md:w-16 md:h-16 lg:w-24 lg:h-24 bg-[--color-old-glory-blue]"></div>
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
