import { createContext } from "react";
import { DEFAULT_USER } from "../constants/default_user";

export const AuthContext = createContext({
    token: "",
    isUserLogged: false,
    user: DEFAULT_USER
});