import axios from 'axios';
import { User } from '../types/User';

// getUser 関数の宣言、非同期関数として定義される
export const getUser = async () =>{
    // api/userからUser型のレスポンスを受け取る
    const { data } = await axios.get<User>('api/user');
    // 取得したデータを返す
    return data;
}

// login 関数の宣言、非同期関数として定義される。引数には email と password の文字列型を指定する
export const login = async ({ email, password }: { email: string, password: string }) =>{
    try {
        // /api/loginにemailとpasswordのデータを送信しUser型のレスポンスを受け取る
        const { data } = await axios.post<User>(
            `/api/login`,{ email, password }
        );
        return data;
    } catch (error) {
        // エラーログを出力し、エラーを投げる
        console.error(error);
        throw error;
    }
}

// logout 関数の宣言、非同期関数として定義される
export const logout = async () =>{
    // /api/logoutにリクエストを送信しUser型のレスポンスを受け取る
    const { data } = await axios.post<User>(`/api/logout`);
    return data;
}