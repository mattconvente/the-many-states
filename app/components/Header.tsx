import React from "react";
import Image from "next/image";
import Link from 'next/link';

export default function Header() {
  return (
    <header className="flex justify-center">
      <Link
        href="/"
        className="focus-visible:rounded-xl focus-visible:outline-none focus-visible:outline-2 focus-visible:outline-offset-8 focus-visible:outline-[--color-old-glory-blue]"
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
    </header>
  );
};
