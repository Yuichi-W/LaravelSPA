import { useTasks } from '../../../queries/TaskQuery';
import { TaskItem } from './TaskItem';

export const TaskList = () => {
    const { data:tasks, status } = useTasks()

    if (status === 'loading') {
        return <div className="loader" />
    } else if (status === 'error') {
        return <div className="align-center">データの読み込みに失敗しました</div>
    } else if (!tasks || tasks.length <= 0) {
        return <div className="align-center">登録されたTodoはありません</div>
    }
    return (
        <div className="inner">
            <ul className="task-list">
                { tasks.map(task => (
                    <TaskItem key={task.id} {...task} />
                ))}
            </ul>
        </div>
    )
}
