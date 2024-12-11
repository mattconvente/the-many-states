"use client"

import { createContext } from "react";
import { ITheManyStatesContext } from "@/app/types";

export const TheManyStatesContext = createContext<ITheManyStatesContext | null>(null);
