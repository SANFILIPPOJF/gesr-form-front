import { createContext } from "react";
import { User } from "../types/user_type";
import { DEFAULT_USER } from "../constants/default_user";
import { DEFAULT_RESIDENCE } from "../constants/default_residence";
import { Residence } from "../types/residence_type";
import { DEFAULT_FONCTION } from "../constants/default_fonction";
import { Fonction } from "../types/fonction_type";

export const AuthContext = createContext({
    user: DEFAULT_USER,
    users: [DEFAULT_USER],
    residence: DEFAULT_RESIDENCE,
    residences: [DEFAULT_RESIDENCE],
    fonction: DEFAULT_FONCTION,
    fonctions: [DEFAULT_FONCTION],
    reload: false,
    setReload: (value: boolean) => {},
    setFonction: (value: Fonction) => {},
    setFonctions: (value: Fonction[]) => {},
    setResidence: (value: Residence) => {},
    setResidences: (value: Residence[]) => {},
    setUsers: (value: User[]) => {},
    setUser: (value: User) => {}
});