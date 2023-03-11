import { createContext, useContext, useEffect, useState } from 'react';

type AuthContextProps = {
    isAuth: boolean;
    setIsAuth: React.Dispatch<React.SetStateAction<boolean>>;
};

const AuthContext = createContext<AuthContextProps>({
    isAuth: false,
    setIsAuth: () => {},
});

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    // 認証状態を管理するためのステートフック
    const [isAuth, setIsAuth] = useState<boolean>(() => {
        // ローカルストレージから認証状態を取得
        const value = localStorage.getItem('isAuth');
        // ログイン状態の場合その値を、ない場合はfalseを返す
        return value ? JSON.parse(value) : false;
    });

    // 認証状態が変更されるたびにローカルストレージに保存
    useEffect(() => {
        localStorage.setItem('isAuth', JSON.stringify(isAuth));
    }, [isAuth]);

    // 認証情報を提供するコンテキストを作成し、子要素に渡す
    return <AuthContext.Provider value={{ isAuth, setIsAuth }}>{children}</AuthContext.Provider>;
};

export const useAuth = () => useContext(AuthContext);