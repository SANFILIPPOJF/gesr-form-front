
import { BASEURL } from "../constants/base_url";
import { NewUser } from "../types/newuser_type";
import { TResponse } from "../types/response_type";


export const login = async (cp: string, password: string): Promise<TResponse> => {
    const response = await fetch(`${BASEURL}/auth/login`, {
        method: "POST",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            cp: cp,
            password: password
        })
    });
    return await response.json();
}

export const getActiveUsers = async (token: string): Promise<TResponse> => {
    const options = { method: 'GET', headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` } };
    const response = await fetch(`${BASEURL}/users/`, options);
    return await response.json();
}

export const getUserByCp = async (cp: string, token: string): Promise<TResponse> => {
    const options = { method: 'GET', headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` } };
    const response = await fetch(`${BASEURL}/users/cp/${cp}`, options)
    return await response.json();
}

export const addUser = async (userInput: NewUser): Promise<TResponse> => {    
    const options = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: `{"cp":"${userInput.cp}",
        "password":"${userInput.password}",
        "passwordConfirm":"${userInput.passwordConfirm}",
        "name":"${userInput.name}",
        "residenceId": ${userInput.residenceId},
        "fonctionId": ${userInput.fonctionId}}`
    };
    const response = await fetch(`${BASEURL}/users/`, options)
    return await response.json();
}
