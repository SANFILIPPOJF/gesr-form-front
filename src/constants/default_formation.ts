import { Formation } from "../types/formation_type";
import { DEFAULT_FORMTYPE } from "./default_formtype";
import { DEFAULT_SALLE } from "./default_salle";

export const DEFAULT_FORMATION: Formation = {
    id: 0,
    date: new Date(0),
    heure: "",
    status: 0,
    motifAnnulation: "",
    formationType: DEFAULT_FORMTYPE,
    participants: [],
    formateurs: [],
    salle: DEFAULT_SALLE
}