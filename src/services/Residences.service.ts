import { BASEURL } from "../constants/base_url";
import { TResponse } from "../types/response_type";


export const getResidences = async (token: string): Promise<TResponse> => {
    const options = { method: 'GET', headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` } };
    const response = await fetch(`${BASEURL}/residences/`, options);
    return await response.json();
}