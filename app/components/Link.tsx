"use client"

import React from "react";
import clsx from "clsx";
import { Link as NextLink } from "next-view-transitions";
import {
  ctaCoreClasses,
  ctaSizeDefaultClasses,
  ctaSizeSquareClasses,
  ctaVariantPrimaryClasses,
  ctaVariantSecondaryClasses,
  ctaVariantFacebookClasses,
  ctaVariantXClasses,
} from "@/app/components/sharedClasses";
import { CtaSizes, CtaVariants } from "@/app/types";

interface LinkProps {
  children: React.ReactNode;
  className?: string;
  external?: boolean;
  href: string;
  size?: CtaSizes;
  variant?: CtaVariants;
}

export default function Link({
  children,
  className,
  external = false,
  href,
  size = "default",
  variant = "primary",
  ...rest
}: LinkProps) {
  const linkClasses = clsx(ctaCoreClasses, {
    [`${ctaSizeDefaultClasses}`]: size === "default",
    [`${ctaSizeSquareClasses}`]: size === "square",
    [`${ctaVariantPrimaryClasses}`]: variant === "primary",
    [`${ctaVariantSecondaryClasses}`]: variant === "secondary",
    [`${ctaVariantFacebookClasses}`]: variant === "facebook",
    [`${ctaVariantXClasses}`]: variant === "x",
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
