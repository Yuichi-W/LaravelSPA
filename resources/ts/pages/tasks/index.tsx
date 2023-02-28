import { TaskInput } from './components/TaskInput';
import { TaskList } from './components/TaskList';

export const TaskPage = (): JSX.Element => {
    return (
        <>
            <TaskInput />
            <TaskList />
        </>
    );
}

