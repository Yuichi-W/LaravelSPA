import axios from 'axios';
import { User } from '../types/User';

export const getUsers = async () =>{
    const { data } = await axios.get<User>('api/user')
    return data
}

export const login = async ({ email, password }: { email: string, password: string }) =>{
    try {
        const { data } = await axios.post<User>(
            `/api/login`,{ email, password }
        );
        return data;
    } catch (error) {
        console.error(error);
        throw error;
    }
}

export const logout = async () =>{
    const { data } = await axios.post<User>(`/api/logout`)
    return data
}
