    export const  login = async (cp: string, password: string): Promise<any> =>{
        const response = await fetch('http://localhost:8000/auth/login', {
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
