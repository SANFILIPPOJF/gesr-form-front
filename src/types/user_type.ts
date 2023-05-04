import { Fonction } from "./fonction_type";
import { FormationType } from "./form-type_type";
import { Formation } from "./formation_type";
import { Habilitation } from "./habilitation_type";
import { Residence } from "./residence_type";

export interface User {
    cp: string;
    name: string;
    id: number;
    isActive: boolean;
    token: string;
    fonction: Fonction;
    residence: Residence;
    habilitations: Habilitation[];
    formations: Formation[];
    habFormations: FormationType[];
    forme: Formation[]
}