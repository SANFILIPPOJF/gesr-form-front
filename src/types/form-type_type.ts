import { Fonction } from "./fonction_type";
import { Formation } from "./formation_type";
import { Habilitation } from "./habilitation_type";
import { User } from "./user_type";

export interface FormationType {
    id: number;
    name: string;
    duree: string;
    codeRAF: string;
    isActive: boolean;
    formations: Formation[];
    habilites: Habilitation[];
    concerne: Fonction[];
    formateurs: User[];
}