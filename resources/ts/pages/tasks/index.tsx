import { TaskInput } from './components/TaskInput';
import { TaskList } from './components/TaskList';
import { QueryClientProvider, QueryClient } from '@tanstack/react-query';

const queryClient = new QueryClient();

export const TaskPage = () => {
    return (
        <QueryClientProvider client={queryClient}>
            <TaskInput />
            <TaskList />
        </QueryClientProvider>
    );
};

