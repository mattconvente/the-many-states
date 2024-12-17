import React from "react";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="flex flex-col gap-0.5 items-center justify-center">
      <div>Copyright &copy; {currentYear} Matt Convente</div>
      <ul className="inline-flex gap-2">
        <li className="after:content-['•'] after:pl-2">
          <a
            href="https://www.mattconvente.com/"
            className="underline underline-offset-2 hover:no-underline focus:no-underline"
          >
            MattConvente.com
          </a>
        </li>
        <li className="after:content-['•'] after:pl-2">
          <a
            href="https://www.linkedin.com/in/mattconvente/"
            className="underline underline-offset-2 hover:no-underline focus:no-underline"
          >
            LinkedIn
          </a>
        </li>
        <li>
          <a
            href="https://github.com/mattconvente/"
            className="underline underline-offset-2 hover:no-underline focus:no-underline"
          >
            GitHub
          </a>
        </li>
      </ul>
    </footer>
  )
};
