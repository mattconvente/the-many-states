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

export type CtaSizes = "default" | "square";
export type CtaVariants = "primary" | "secondary" | "facebook" | "x";
