import { Formation } from "./formation_type";

export interface Salle {
    id: number;
    name: string;
    adresse: string;
    capacite: number;
    isActive: boolean;
    utilisations: Formation[];
}