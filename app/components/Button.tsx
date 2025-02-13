"use client"

import React from "react";
import clsx from "clsx";

type ButtonVariants = "primary" | "secondary" | "facebook" | "x";

interface ButtonProps {
  children: React.ReactNode;
  className: string;
  onClick: () => void;
  variant?: ButtonVariants;
}

export default function Button({
  children,
  className,
  onClick,
  variant = "primary",
  ...rest
}: ButtonProps) {
  const coreButtonClasses = "transition inline-flex justify-center items-center gap-3 cursor-pointer font-bold py-2.5 px-8 lg:py-4 lg:px-12 text-sm lg:text-lg rounded-md lg:rounded-lg outline-hidden outline-2 outline-offset-2 outline-transparent";
  const buttonClasses = clsx(coreButtonClasses, {
    "text-white bg-linear-to-r from-(--color-old-glory-red) to-(--color-old-glory-blue) hover:outline-(--color-old-glory-blue) focus-visible:outline-(--color-old-glory-blue)": variant === "primary",
    "bg-(--color-state-border-resting) hover:outline-foreground focus-visible:outline-foreground": variant === "secondary",
    "text-white": variant === "facebook" || variant === "x",
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
