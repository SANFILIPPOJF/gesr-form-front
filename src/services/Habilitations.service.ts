import { BASEURL } from "../constants/base_url";
import { Habilitation } from "../types/habilitation_type";
import { NewHabilitation } from "../types/newhabilitation _type";
import { TResponse } from "../types/response_type";


export const getHabilitations = async (token: string, userId: number): Promise<TResponse> => {
    const options = { method: 'GET', headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` } };
    const response = await fetch(`${BASEURL}/habilitations/user/${userId}`, options);
    return await response.json();
}

export const addHabilitation = async (habilitationInput: NewHabilitation): Promise<TResponse> => {
    console.log(habilitationInput);
    
    const options = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: `{"userId":${habilitationInput.userId},
        "date":"${habilitationInput.date}",
        "formationTypeId":${habilitationInput.typeId}}`
    };
    const response = await fetch(`${BASEURL}/habilitations/`, options)
    return await response.json();
}

export const updateHabilitation = async (habilitationId: number, habilitationDate: Date): Promise<TResponse> => {
    const options = {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: `{"date":"${habilitationDate}"}`
    };
    const response = await fetch(`${BASEURL}/habilitations/${habilitationId}`, options)
    return await response.json();
}

export const deleteHabilitation = async (habilitationId: number): Promise<TResponse> => {
    const options = {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' }
    };
    const response = await fetch(`${BASEURL}/habilitations/${habilitationId}`, options)
    return await response.json();
}