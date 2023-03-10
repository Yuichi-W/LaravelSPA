import { createContext, useState, useContext, ReactNode } from "react";

type AuthContextProps = {
    isAuth: boolean,
    setIsAuth: React.Dispatch<React.SetStateAction<boolean>>
}

const AuthContext = createContext<AuthContextProps>({
    isAuth: false,
    setIsAuth: () => {}
})
// AuthProvider内で、useStateフックを使用して、認証の状態を管理
export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [isAuth, setIsAuth] = useState(false);

    return (
        <AuthContext.Provider value={{ isAuth, setIsAuth }} >
            { children }
        </AuthContext.Provider>
    )
}

export const useAuth = () => useContext(AuthContext);