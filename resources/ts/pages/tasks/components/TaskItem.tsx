import { Task } from '../../../types/Task';

export const TaskItem = (task: Task): JSX.Element => {
    return (
        <li key={task.id}>
            <label className="checkbox-label">
                <input type="checkbox" className="checkbox-input" />
            </label>
            <div><span>{task.title}</span></div>
            <button className="btn is-delete">削除</button>
        </li>
    );
}