import { Task } from '../../../types/Task';
import { useUpdateDoneTask } from '../../../queries/TaskQuery';


export const TaskItem = (task: Task): JSX.Element => {
    const updateDoneTaskMutation = useUpdateDoneTask();

    // チェック押下時にタスク完了処理を行う
    const handleCheckboxClick = () => {
        updateDoneTaskMutation.mutate(task);　
    }

    return (
        <li key={task.id} className={task.is_done ? 'done' : ''} >
            <label className="checkbox-label">
                <input 
                    type="checkbox" 
                    className="checkbox-input" 
                    onClick={handleCheckboxClick}
                />
            </label>
            <div><span>{task.title}</span></div>
        </li>
    );
}
