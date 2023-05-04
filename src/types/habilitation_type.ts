import { FormationType } from "./form-type_type";
import { User } from "./user_type";

export interface Habilitation {
    id: number;
    date: Date;
    user: User;
    formationType: FormationType;
}