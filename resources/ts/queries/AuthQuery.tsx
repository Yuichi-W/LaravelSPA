import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import * as api from '../api/AuthAPI';
import { toast } from 'react-toastify';
import { AxiosError } from 'axios';

export const useUser = () => {
    return useQuery(['users'], api.getUsers);
};

const useMutationWithToast = (
    mutationFn: (data: any) => Promise<any>,
    successMessage: string,
    errorMessage: string
) => {
    console.log('123456');
    const queryClient = useQueryClient();

    return useMutation(mutationFn, {
        onSuccess: () => {
            queryClient.invalidateQueries(['Users']);
            toast.success(successMessage);
        },
        onError: (error: AxiosError) => {
            try {
                const { data } = error.response!;
                if (data.errors) {
                    Object.values(data.errors).forEach((messages: string[]) => {
                    messages.forEach((message: string) => {
                        toast.error(message);
                    });
                });
                } else {
                    toast.error(errorMessage);
                }
            } catch (e) {
                toast.error(errorMessage);
            }
        },
    });
};

export const useLogin = () => {
    return useMutationWithToast(
        api.login,
        'ログインに成功しました',
        'ログインに失敗しました'
    );
};

export const useLogout = () => {
    return useMutationWithToast(
        api.logout,
        'ログアウトに成功しました',
        'ログアウトに失敗しました'
    );
};

