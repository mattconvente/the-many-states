"use client"

import React from "react";
import clsx from "clsx";
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

interface ButtonProps {
  children: React.ReactNode;
  className?: string;
  onClick: () => void;
  size?: CtaSizes;
  variant?: CtaVariants;
}

export default function Button({
  children,
  className,
  onClick,
  size = "default",
  variant = "primary",
  ...rest
}: ButtonProps) {
  const buttonClasses = clsx(ctaCoreClasses, {
    [`${ctaSizeDefaultClasses}`]: size === "default",
    [`${ctaSizeSquareClasses}`]: size === "square",
    [`${ctaVariantPrimaryClasses}`]: variant === "primary",
    [`${ctaVariantSecondaryClasses}`]: variant === "secondary",
    [`${ctaVariantFacebookClasses}`]: variant === "facebook",
    [`${ctaVariantXClasses}`]: variant === "x",
  }, className);

  return (
    <button
      type="button"
      className={buttonClasses}
      onClick={onClick}
      {...rest}
    >
      {children}
    </button>
  )
};
