"use client"

// import Link from "next/link";
import { useTheManyStatesContext } from "@/app/context/TheManyStatesContext";
import USFlag from "@/app/components/USFlag";

export default function FlagPage() {
  const { selectedStates } = useTheManyStatesContext();
  const sortedSelectedStatesByName = selectedStates.sort(function(a, b) {
    return a.name.localeCompare(b.name);
  });

  return (
    <div className="grid gap-8 grid-cols-2">
      <USFlag selectedStates={selectedStates} />
      <div>
        <h2>You&apos;ve visited {selectedStates?.length} {selectedStates?.length === 1 ? "state" : "states"}!</h2>
        {sortedSelectedStatesByName.map((state, index) => {
          return (
           <span
            key={state.name}
          >
            {state.name}{index === sortedSelectedStatesByName.length - 1 ? "" : ", "}
          </span>
          );
        })}
      </div>
    </div>
  );
}
