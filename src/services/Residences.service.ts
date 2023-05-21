import { BASEURL } from "../constants/base_url";
import { Residence } from "../types/residence_type";
import { TResponse } from "../types/response_type";


export const getResidences = async (token: string): Promise<TResponse> => {
    const options = { method: 'GET', headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` } };
    const response = await fetch(`${BASEURL}/residences/`, options);
    return await response.json();
}

export const addResidence = async (name: string): Promise<TResponse> => {
    const options = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: `{"name":"${name}"}`
    };
    const response = await fetch(`${BASEURL}/residences/`, options)
    return await response.json();
}

export const updateResidence = async (residence: Residence): Promise<TResponse> => {
    const options = {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: `{"name":"${residence.name}"}`
    };
    const response = await fetch(`${BASEURL}/residences/${residence.id}`, options)
    return await response.json();
}

export const inactiveResidence = async (residenceId: number): Promise<TResponse> => {
    const options = {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' }
    };
    const response = await fetch(`${BASEURL}/residences/${residenceId}`, options)
    return await response.json();
}