import { BASEURL } from "../constants/base_url";

    export const  login = async (cp: string, password: string): Promise<any> =>{
        const response = await fetch(`${BASEURL}/auth/login`, {
            method: "POST",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(
                {
                    cp: cp,
                    password: password
                }
            )
        });        
        return await response.json();
    }
