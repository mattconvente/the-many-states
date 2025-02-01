"use client"

import React from "react";
import { IState } from "@/app/types";
import clsx from "clsx";

interface StateCheckboxProps {
  isChecked: boolean;
  state: IState;
  onChange: () => void;
}

export default function StateCheckbox({
  state,
  isChecked = false,
  onChange
}: StateCheckboxProps) {
  return (
    <label
      className={clsx("relative transition flex flex-col py-4 px-2 justify-center items-center cursor-pointer border-2 border-(--color-state-checkbox-border-resting) rounded-sm", {
        "bg-(--color-state-checkbox-bg-active) hover:bg-(--color-state-checkbox-bg-hover-active) [&:has(:focus-visible)]:bg-(--color-state-checkbox-bg-hover-active)": isChecked,
        "hover:bg-(--color-state-checkbox-bg-hover) [&:has(:focus-visible)]:bg-(--color-state-checkbox-bg-hover)": !isChecked,
      })}
    >
      <input
        className="absolute opacity-0 -z-1"
        type="checkbox"
        checked={isChecked}
        onChange={onChange}
      />
      <picture className="mb-3">
        <source
          type="image/webp"
          srcSet={`https://flagcdn.com/h20/us-${state.abbr.toLowerCase()}.webp,
          https://flagcdn.com/h40/us-${state.abbr.toLowerCase()}.webp 2x`}
        />
        <source
          type="image/png"
          srcSet={`https://flagcdn.com/h20/us-${state.abbr.toLowerCase()}.png,
          https://flagcdn.com/h40/us-${state.abbr.toLowerCase()}.png 2x`}
        />
        <img
          src={`https://flagcdn.com/h40/us-${state.abbr.toLowerCase()}.png`}
          height="20"
          alt={`Flag of ${state.name}`}
        />
      </picture>
      <span className="text-center leading-5">{state.name}</span>
    </label>
  );
}
