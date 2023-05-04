import { FormationType } from "./form-type_type";
import { User } from "./user_type";

export interface Fonction {
    id: number;
    name: string;
    isActive: boolean;
    user: User[]
    formationTypes: FormationType[]
}