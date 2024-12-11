"use client"

import React from "react";

interface ButtonProps {
  children: React.ReactNode;
  onClick: () => void;
}

export default function Button({ children, onClick }: ButtonProps) {
  return (
    <button
      className="py-4 px-20 font-bold	text-lg text-white rounded-xl bg-gradient-to-r from-[--color-old-glory-red] to-[--color-old-glory-blue]"
      type="button"
      onClick={onClick}
    >
      {children}
    </button>
  )
};
