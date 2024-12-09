"use client"

import { createContext } from "react";
import { AppContext } from "./types";

export const TheManyStatesContext = createContext<AppContext | null>(null);
