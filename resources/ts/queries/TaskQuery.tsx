import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import * as api from '../api/TaskAPI';

export const useTasks = () => {
    return useQuery(['tasks'],async () => api.getTasks())
}

export const useUpdateDoneTask = () => {
    const queryClient = useQueryClient();
    // 第一引数：API
    // 第二引数：コールバックの処理
    return useMutation(api.updateDoneTask, {
        onSuccess: () => {
            // コンポーネントの再描画,引数はkeyとなる文字列
            queryClient.invalidateQueries(['tasks']);
        }
    });
}
