import { useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Link } from "react-router-dom";
import { TaskPage } from "./pages/tasks";
import { LoginPage } from "./pages/login";
import { HelpPage } from "./pages/help";

export const Router = () => {
    return (
        <BrowserRouter>
            <header className="global-head">
                <ul>
                    <li>
                        <Link to="/">ホーム</Link>
                    </li>
                    <li>
                        <Link to="/help">ヘルプ</Link>
                    </li>
                    <li>
                        <Link to="/login">ログイン</Link>
                    </li>
                    <li>
                        <span>ログアウト</span>
                    </li>
                </ul>
            </header>
            {/* <h1 className='text-red'>Laravel React+Typescript環境構築</h1> */}
            <Routes>
                <Route path={`/`} element={<TaskPage />} />
                <Route path={`/login/`} element={<LoginPage />} />
                <Route path={`/help/`} element={<HelpPage />} />
            </Routes>
        </BrowserRouter>
    );
};
