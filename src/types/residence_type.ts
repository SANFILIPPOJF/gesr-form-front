import { User } from "./user_type";

export interface Residence {
    id: number;
    name: string;
    isActive: boolean;
    users: User[];
}