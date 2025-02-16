import React from "react";

export default function Footer() {
  const currentYear = new Date().getFullYear();
  const footerLinkClasses = "underline underline-offset-2 outline-hidden outline-black hover:no-underline focus:no-underline focus-visible:outline-2 focus-visible:rounded-xs";

  return (
    <footer className="flex flex-col gap-0.5 items-center justify-center lg:mt-8 text-sm md:text-base">
      <div>Copyright &copy; {currentYear} Matt Convente</div>
      <ul className="inline-flex gap-2">
        <li className="after:content-['•'] after:pl-2">
          <a
            href="https://www.mattconvente.com/"
            className={footerLinkClasses}
          >
            MattConvente.com
          </a>
        </li>
        <li className="after:content-['•'] after:pl-2">
          <a
            href="https://www.linkedin.com/in/mattconvente/"
            className={footerLinkClasses}
          >
            LinkedIn
          </a>
        </li>
        <li>
          <a
            href="https://github.com/mattconvente/the-many-states"
            className={footerLinkClasses}
          >
            GitHub
          </a>
        </li>
      </ul>
    </footer>
  )
};
