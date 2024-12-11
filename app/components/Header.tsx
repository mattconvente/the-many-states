import React from "react";
import Image from "next/image";

export default function Header() {
  return (
    <header className="flex justify-center">
      <Image
        src="/the-many-states-logo.svg"
        alt="The Many States logo"
        width={360}
        height={42}
        sizes="(max-width: 375px) 100vw"
        priority
      />
    </header>
  );
};
