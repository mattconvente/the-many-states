import { Dispatch, SetStateAction} from "react";

export interface IState {
  abbr: string;
  name: string;
  pathCoordinates: string;
}

export interface IStar {
  abbr: string;
  name: string;
  pathCoordinates: string;
}

export interface IAnimatedStar {
  abbr: string;
  name: string;
  pathCoordinates: string;
  admissionDate: string;
}

export interface ITheManyStatesContext {
  visitedStates: IState[];
  unvisitedStates: IState[];
  hoveredVisitedState?: IState | null;
  hoveredUnvisitedState?: IState | null;
  setVisitedStates: Dispatch<SetStateAction<IState[]>>;
  setUnvisitedStates: Dispatch<SetStateAction<IState[]>>;
  setHoveredVisitedState: Dispatch<SetStateAction<IState | null>>;
  setHoveredUnvisitedState: Dispatch<SetStateAction<IState | null>>;
}
