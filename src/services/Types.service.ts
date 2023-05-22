import { BASEURL } from "../constants/base_url";
import { FormationType } from "../types/form-type_type";
import { NewType } from "../types/newtype _type";
import { TResponse } from "../types/response_type";

export const getTypes = async (token: string): Promise<TResponse> => {
    const options = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
        }
    };
    const response = await fetch(`${BASEURL}/formation-types/`, options);
    return await response.json();
}

export const addType = async (newType: NewType): Promise<TResponse> => {
    const options = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: `{
            "name":"${newType.name}",
            "duree":"${newType.duree}",
            "codeRAF":"${newType.codeRAF}"
    }`
    };
    const response = await fetch(`${BASEURL}/formation-types/`, options)
    return await response.json();
}

export const updateType = async (type: FormationType): Promise<TResponse> => {
    const options = {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: `{
            "name":"${type.name}",
            "duree":"${type.duree}",
            "codeRAF":"${type.codeRAF}"
    }`
    };
    const response = await fetch(`${BASEURL}/formation-types/${type.id}`, options)
    return await response.json();
}

export const inactiveType = async (typeId: number): Promise<TResponse> => {
    const options = {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' }
    };
    const response = await fetch(`${BASEURL}/formation-types/${typeId}`, options)
    return await response.json();
}