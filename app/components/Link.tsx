"use client"

import React from "react";
import clsx from "clsx";
import { Link as NextLink } from "next-view-transitions";

type LinkVariants = "primary" | "secondary" | "facebook" | "x";

interface LinkProps {
  children: React.ReactNode;
  className?: string;
  href: string;
  variant?: LinkVariants;
  external?: boolean;
}

export default function Link({
  children,
  className,
  external = false,
  href,
  variant = "primary",
  ...rest
}: LinkProps) {
  const coreLinkClasses = "transition inline-flex justify-center items-center gap-3 cursor-pointer font-bold py-2.5 px-8 lg:py-4 lg:px-12 text-sm lg:text-lg rounded-md lg:rounded-lg outline-hidden outline-2 outline-offset-2 outline-transparent";
  const linkClasses = clsx(coreLinkClasses, {
    "text-white bg-linear-to-r from-(--color-old-glory-red) to-(--color-old-glory-blue) hover:outline-(--color-old-glory-blue) focus-visible:outline-(--color-old-glory-blue)": variant === "primary",
    "bg-(--color-state-border-resting) hover:outline-foreground focus-visible:outline-foreground": variant === "secondary",
    "text-white": variant === "facebook" || variant === "x",
  }, className);

  const externalAttrs = external
    ? {
      target: "_blank",
      rel: "noopener noreferrer"
    } : null;

  return (
    <NextLink
      href={href}
      className={linkClasses}
      {...externalAttrs}
      {...rest}
    >
      {children}
    </NextLink>
  )
};
