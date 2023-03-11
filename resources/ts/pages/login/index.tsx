import { useState } from 'react';
import { useLogin } from '../../queries/AuthQuery';
import { useNavigate } from 'react-router-dom';

export const LoginPage = () => {
    const login = useLogin();
    const navigate = useNavigate(); // useNavigateフックを呼び出す
    const [email, setEmail] = useState('admin@example.com');
    const [password, setPassword] = useState('password1234');

    const handleLogin = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        console.log('ログインを開始します',email,password);
        login.mutate({ email, password }, {
            onSuccess: () => {
                navigate('/');
            }
        });
    }

    return (
        <>
            <div className="login-page">
                <div className="login-panel">
                    <form onSubmit={handleLogin}>
                        <div className="input-group">
                            <label>メールアドレス</label>
                            <input
                                type="email"
                                className="input" 
                                value={email}
                                onChange={e => setEmail(e.target.value)}
                            />
                        </div>
                        <div className="input-group">
                            <label>パスワード</label>
                            <input
                                type="password"
                                className="input"
                                value={password}
                                onChange={e => setPassword(e.target.value)}
                            />
                        </div>
                        <button type="submit" className="btn">ログイン</button>
                    </form>
                </div>
                <div className="links"><a href="#">ヘルプ</a></div>
            </div>
        </>
    );
}