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
  setVisitedStates: Dispatch<SetStateAction<IState[]>>;
  setUnvisitedStates: Dispatch<SetStateAction<IState[]>>;
}
