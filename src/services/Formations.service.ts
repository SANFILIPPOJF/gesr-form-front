import { BASEURL } from "../constants/base_url";
import { Fonction } from "../types/fonction_type";
import { NewFormation } from "../types/newformation_type";
import { TResponse } from "../types/response_type";


export const getFormations = async (token: string): Promise<TResponse> => {
    const options = { method: 'GET', headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` } };
    const response = await fetch(`${BASEURL}/formations/`, options);
    return await response.json();
}

export const addFormation = async (formationInput: NewFormation): Promise<TResponse> => {
    const options = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: `{
            "formTypeId":${formationInput.typeId},
            "date":"${formationInput.date}",
            "salleId":${formationInput.salleId},
            "heure":"${formationInput.heure}"}`
    };
    const response = await fetch(`${BASEURL}/formations/`, options)
    return await response.json();
}

export const updateFonction = async (fonction: Fonction): Promise<TResponse> => {
    const options = {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: `{"name":"${fonction.name}"}`
    };
    const response = await fetch(`${BASEURL}/fonctions/${fonction.id}`, options)
    return await response.json();
}

export const inactiveFonction = async (fonctionId: number): Promise<TResponse> => {
    const options = {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' }
    };
    const response = await fetch(`${BASEURL}/residences/${fonctionId}`, options)
    return await response.json();
}