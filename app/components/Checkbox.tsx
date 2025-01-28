"use client"

import React from "react";

interface CheckboxProps {
  isChecked: boolean;
  label: string;
  onChange: () => void;
}

export default function Checkbox({
  label,
  isChecked = false,
  onChange
}: CheckboxProps) {
  return (
    <label className="flex flex-row-reverse gap-2 justify-end items-center">
      <span className="leading-none">{label}</span>
      <input
        className="h-[18px] w-[18px] accent-(--color-old-glory-blue)"
        type="checkbox"
        checked={isChecked}
        onChange={onChange}
      />
    </label>
  );
}
