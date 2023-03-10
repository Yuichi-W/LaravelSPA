import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import * as api from '../api/AuthAPI';
import { toast } from 'react-toastify';
import { AxiosError } from 'axios';
import { useAuth } from '../hooks/AuthContext'

// ユーザー情報を取得するためのReact Queryフックを定義
export const useUser = () => {
    return useQuery(['users'], api.getUser);
};

// React QueryのuseMutationフックと、React Toastifyを使用して、APIとの相互作用をカスタマイズするためのカスタムフック
const useMutationWithToast = (
    mutationFn: (data: any) => Promise<any>, // APIを呼び出すための関数
    successMessage: string,                  // 成功時のメッセージ
    errorMessage: string,                    // 失敗時のメッセージ
    AuthType: string,                        // ログインorログアウト
    setIsAuth: (value: boolean) => void,     // 認証状態(ログインの時のみ)
) => {
    // useQueryClientフックを使用して、React Queryのクエリキャッシュにアクセス
    const queryClient = useQueryClient();
    
    return useMutation(mutationFn, {
        // 成功時の処理
        onSuccess: () => {
            // ログイン成功時、認証状態をTRUEに変更
            if (AuthType === 'login') {
                setIsAuth(true);
            } else if(AuthType === 'logout') {
                setIsAuth(false);
            }
            // クエリキャッシュを無効化
            queryClient.invalidateQueries(['Users']);
            toast.success(successMessage);
        },
        // 失敗時の処理
        onError: (error: AxiosError) => {
            // エラーメッセージを取得
            const { data } = error.response!;
            if (data.errors) {
                // エラーメッセージがある場合エラーメッセージを表示する
                Object.values(data.errors).forEach((messages: string[]) => {
                    messages.forEach((message: string) => {
                        toast.error(message);
                    });
                });
            } else {
                toast.error(errorMessage);
            }
        },
    });
};

// ログインAPIを呼び出すためのカスタムフック
export const useLogin = () => {
    const { setIsAuth } = useAuth();
    const AuthType = 'login';
    return useMutationWithToast(
        // login関数を引数に渡す
        api.login,
        'ログインに成功しました',
        'ログインに失敗しました',
        AuthType,
        setIsAuth,
    );
};

// ログアウトAPIを呼び出すためのカスタムフック
export const useLogout = () => {
    const { setIsAuth } = useAuth();
    const AuthType = 'logout';
    return useMutationWithToast(
        // logout関数を引数に渡す
        api.logout,
        'ログアウトに成功しました',
        'ログアウトに失敗しました',
        AuthType,
        setIsAuth,
    );
};
