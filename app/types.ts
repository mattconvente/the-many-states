import { Dispatch, SetStateAction} from "react";

export interface IState {
  id: string;
  abbr: string;
  name: string;
  pathCoordinates: string;
}

export interface IStar {
  id: string;
  abbr: string;
  name: string;
  pathCoordinates: string;
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
