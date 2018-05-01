import Boat from "./class_boat";
import Shot from "./class_shot";

export interface ICoords {
    x: number;
    y: number;
    direction?: {
        x?: 1 | -1,
        y?: 1 | -1,
    };
}

export interface IBoat {
    len: 2 | 3 | 4 | 5;
    name: "carrier" | "battleship" | "cruiser" | "submarine" | "destroyer";
}

export interface ICell {
    boat: null | string;
    shot: null | Shot;
}
