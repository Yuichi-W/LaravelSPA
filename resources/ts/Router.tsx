import { useEffect } from "react";
import { Link, Routes, Route, RouteProps, useNavigate, Navigate } from "react-router-dom";
import { TaskPage } from "./pages/tasks";
import { LoginPage } from "./pages/login";
import { NotFoundPage } from "./pages/error";
import { HelpPage } from "./pages/help";
import { useLogout, useUser } from './queries/AuthQuery';
import { useAuth } from './hooks/AuthContext';

export const Router = () => {
    const logout = useLogout();
    const { isAuth, setIsAuth } = useAuth();
    const { isLoading, data: authUser } = useUser();
    const navigate = useNavigate();

    // ログイン済みであればsetIsAuthをTRUEそうでなければfalseでログイン画面にリダイレクト
    useEffect(() => {
        if (authUser) {
            setIsAuth(true);
        }
        if (!isAuth && !isLoading) {
            navigate("/login");
        }
    }, [authUser]);

    const navigation = (
        <header className="global-head">
        <ul>
            <li><Link to="/">ホーム</Link></li>
            <li><Link to="/help">ヘルプ</Link></li>
            <li onClick={() => logout.mutate()}><span>ログアウト</span></li>
        </ul>
        </header>
    )
    const loginNavigation = (
        <header className="global-head">
        <ul>
            <li><Link to="/help">ヘルプ</Link></li>
            <li><Link to="/login">ログイン</Link></li>
        </ul>
        </header>
    )

    if (isLoading) return <div className="loader"></div>

    return (
        <>
        {/* ログイン済みであればnavigation表示 */}
        { isAuth ? navigation : loginNavigation }
        <Routes>
            <Route path={`/`} element={<TaskPage />} />
            <Route path={`/login/`} element={<LoginPage />} />
            <Route path={`/help/`} element={<HelpPage />} />
            <Route path="*" element={<NotFoundPage />} />
        </Routes>
        </>
    );
};
