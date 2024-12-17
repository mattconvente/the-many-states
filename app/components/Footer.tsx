import React from "react";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="flex flex-col gap-0.5 items-center justify-center text-sm md:text-base">
      <div>Copyright &copy; {currentYear} Matt Convente</div>
      <ul className="inline-flex gap-2">
        <li className="after:content-['•'] after:pl-2">
          <a
            href="https://www.mattconvente.com/"
            className="underline underline-offset-2 outline-none hover:no-underline focus:no-underline focus-visible:outline-black focus-visible:rounded-sm"
          >
            MattConvente.com
          </a>
        </li>
        <li className="after:content-['•'] after:pl-2">
          <a
            href="https://www.linkedin.com/in/mattconvente/"
            className="underline underline-offset-2 outline-none hover:no-underline focus:no-underline focus-visible:outline-black focus-visible:rounded-sm"
          >
            LinkedIn
          </a>
        </li>
        <li>
          <a
            href="https://github.com/mattconvente/"
            className="underline underline-offset-2 outline-none hover:no-underline focus:no-underline focus-visible:outline-black focus-visible:rounded-sm"
          >
            GitHub
          </a>
        </li>
      </ul>
    </footer>
  )
};
