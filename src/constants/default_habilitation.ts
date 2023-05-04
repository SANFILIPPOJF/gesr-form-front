import { Habilitation } from "../types/habilitation_type";
import { DEFAULT_FORMTYPE } from "./default_formtype";
import { DEFAULT_USER } from "./default_user";

export const DEFAULT_HABILITATION: Habilitation = {
    id: 0,
    date: new Date(0),
    user: DEFAULT_USER,
    formationType: DEFAULT_FORMTYPE
}