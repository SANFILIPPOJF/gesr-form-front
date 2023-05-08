import { User } from "../types/user_type";
import { DEFAULT_FONCTION } from "./default_fonction";
import { DEFAULT_RESIDENCE } from "./default_residence";

export const DEFAULT_USER: User = {
    cp: "",
    name: "",
    isActive: false,
    id: 0,
    token: "",
    fonction: DEFAULT_FONCTION,
    residence: DEFAULT_RESIDENCE,
    habilitations: [],
    formations: [],
    forme: [],
    habFormateurs: []
}