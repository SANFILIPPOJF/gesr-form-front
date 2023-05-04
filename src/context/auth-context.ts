import { createContext } from "react";
import { User } from "../types/user_type";
import { DEFAULT_USER } from "../constants/default_user";

export const AuthContext = createContext({
    user: DEFAULT_USER,
    setUser: (value: User) => {}
});