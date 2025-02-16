"use client"

import React from "react";
import { usePathname } from "next/navigation";
import { Link } from "next-view-transitions";

export default function Footer() {
  const pathname = usePathname();
  const currentYear = new Date().getFullYear();
  const footerLinkClasses = "outline-hidden outline-black hover:no-underline focus:no-underline focus-visible:outline-2 focus-visible:rounded-xs";

  return (
    <footer className="flex flex-col gap-0.5 items-center justify-center lg:mt-8 text-sm md:text-base">
      <div>Copyright &copy; {currentYear} Matt Convente</div>
      <ul className="inline-flex gap-2">
        <li className="after:content-['•'] after:pl-2">
          <a
            href="https://www.mattconvente.com/"
            className={`${footerLinkClasses} underline underline-offset-2`}
          >
            MattConvente.com
          </a>
        </li>
        <li className="after:content-['•'] after:pl-2">
          <a
            href="https://www.linkedin.com/in/mattconvente/"
            className={`${footerLinkClasses} underline underline-offset-2`}
          >
            LinkedIn
          </a>
        </li>
        <li>
          <a
            href="https://github.com/mattconvente/the-many-states"
            className={`${footerLinkClasses} underline underline-offset-2`}
          >
            GitHub
          </a>
        </li>
      </ul>
      <ul className="text-sm text-stone-600 inline-flex gap-2 mt-4">
        <li className="after:content-['•'] after:pl-2">
          <Link
            href="/privacy"
            className={`${footerLinkClasses} ${pathname === "/privacy" ? "bg-slate-50" : "underline underline-offset-2"}`}
          >
            Privacy Policy
          </Link>
        </li>
        <li>
          <Link
            href="/terms"
            className={`${footerLinkClasses} ${pathname === "/terms" ? "bg-slate-50" : "underline underline-offset-2"}`}
          >
            Terms of Service
          </Link>
        </li>
      </ul>
    </footer>
  )
};
