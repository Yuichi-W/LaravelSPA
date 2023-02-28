import { useQuery } from '@tanstack/react-query';
import * as api from '../api/TaskAPI';

export const useTasks = () => {
    return useQuery(['tasks'],async () => api.getTasks())
}
