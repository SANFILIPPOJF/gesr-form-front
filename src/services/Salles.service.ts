import { BASEURL } from "../constants/base_url";
import { NewSalle } from "../types/newsalle _type";
import { TResponse } from "../types/response_type";
import { Salle } from "../types/salle_type";


export const getSalles = async (token: string): Promise<TResponse> => {
    const options = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
        }
    };
    const response = await fetch(`${BASEURL}/salles/`, options);
    return await response.json();
}

export const addSalle = async (newSalle: NewSalle): Promise<TResponse> => {
    const options = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: `{
            "name":"${newSalle.name}",
            "capacite":${newSalle.capacite},
            "adresse":"${newSalle.adresse}"
    }`
    };
    const response = await fetch(`${BASEURL}/salles/`, options)
    return await response.json();
}

export const updateSalle = async (salle: Salle): Promise<TResponse> => {
    const options = {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: `{
            "name":"${salle.name}",
            "capacite":${salle.capacite},
            "adresse":"${salle.adresse}"
    }`
    };
    const response = await fetch(`${BASEURL}/salles/${salle.id}`, options)
    return await response.json();
}

export const inactiveSalle = async (salleId: number): Promise<TResponse> => {
    const options = {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' }
    };
    const response = await fetch(`${BASEURL}/salles/${salleId}`, options)
    return await response.json();
}