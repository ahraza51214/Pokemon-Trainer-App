import { Pokemon } from "./pokemon.model";
/*
export interface User {
    id: number;
    username: string;
    pokemon: Pokemon[];
}*/


export interface User {
    id: number;
    username: string;
    pokemon: string[]; // This should be an array of strings, as per the given API data.
}

