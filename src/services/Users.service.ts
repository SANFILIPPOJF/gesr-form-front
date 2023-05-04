import { BASEURL } from "../constants/base_url";

    export const  login = async (cp: string, password: string): Promise<any> =>{
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

    export const  getByCp = async (cp: string, token: string): Promise<any> =>{
        const options = { method: 'GET', headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` }};
        const response = await fetch(`${BASEURL}/users/cp/${cp}`, options)
        return await response.json();
    }
