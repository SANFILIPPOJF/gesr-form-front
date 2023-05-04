import { FormationType } from "./form-type_type";
import { Salle } from "./salle_type";
import { User } from "./user_type";

export interface Formation {
    id: number;
    date: Date;
    heure: string;
    status: number;
    motifAnnulation: string;
    formationType: FormationType;
    participants: User[];
    formateurs: User[];
    salle: Salle;
}