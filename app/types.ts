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

export interface AppContext {
  selectedStates: IState[];
  setSelectedStates: Dispatch<SetStateAction<IState[]>>;
}
