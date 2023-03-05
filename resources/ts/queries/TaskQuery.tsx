import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import * as api from '../api/TaskAPI';
import { toast } from 'react-toastify';
import { AxiosError } from 'axios';

export const useTasks = () => {
    return useQuery(['tasks'], api.getTasks);
};

const useMutationWithToast = (
    mutationFn: (data: any) => Promise<any>,
    successMessage: string,
    errorMessage: string
) => {
    const queryClient = useQueryClient();
    return useMutation(mutationFn, {
        onSuccess: () => {
            queryClient.invalidateQueries(['tasks']);
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

export const useCreateTask = () => {
    return useMutationWithToast(
        api.createTask,
        'タスクを登録しました',
        'タスクの登録に失敗しました'
    );
};

export const useUpdateDoneTask = () => {
    return useMutationWithToast(
        api.updateDoneTask,
        'タスクを完了しました',
        'タスクの完了に失敗しました'
    );
};

export const useUpdateTask = () => {
    return useMutationWithToast(
        api.updateTask,
        'タスクを更新しました',
        'タスクの更新に失敗しました'
    );
};

export const useDeleteTask = () => {
    return useMutationWithToast(
        api.deleteTask,
        'タスクを削除しました',
        'タスクの削除に失敗しました'
    );
};
