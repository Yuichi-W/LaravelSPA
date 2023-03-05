import { useState } from 'react';
import { Task } from '../../../types/Task';
import { useUpdateDoneTask, useUpdateTask, useDeleteTask } from '../../../queries/TaskQuery';
import { toast } from 'react-toastify';

export const TaskItem = (task: Task): JSX.Element => {
    const updateDoneTaskMutation = useUpdateDoneTask();
    const updateTask = useUpdateTask();
    const deleteTask = useDeleteTask();
    // 編集中のタイトルの状態
    const [editTitle, setEditTitle] = useState<string|undefined>(undefined);

    // チェック押下時にタスク完了処理を行う
    const handleCheckboxClick = () => {
        updateDoneTaskMutation.mutate(task);
    }

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setEditTitle(event.target.value);
    }

    const handleUpdate = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (!editTitle) {
            toast.error('タイトルが未入力です');
            return
        }
        const newTask = {...task};
        newTask.title = editTitle
        updateTask.mutate({
            id: task.id,
            task: newTask
        });
        setEditTitle(undefined);
    }

    // タイトル押下時に編集モードに切り替え
    const handleToggleEdit = () => {
        setEditTitle(task.title);
    }
    // 編集モード終了切り替え(esc,tabキー押下時)
    const handleOnKey = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (['Escape', 'Tab'].includes(event.key)) {
            setEditTitle(undefined);
        }
    }

    const itemInput = () => {
        return (
            <>
            <form onSubmit={handleUpdate}>
                <input
                    type="text"
                    className="input"
                    defaultValue={editTitle}
                    onChange={handleInputChange}
                    onKeyDown={handleOnKey}
                />
            </form>
            <button className="btn" onClick={handleUpdate}>更新</button>
            </>
        )
    }

    const itemText = () => {
        return (
            <>
                <div onClick={handleToggleEdit}>
                    <span>{ task.title }</span>
                </div>
                <button 
                    className="btn is_delete" 
                    onClick={() => deleteTask.mutate(task.id)}
                >
                    削除
                </button>
            </>
        )
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
            { editTitle === undefined ? itemText() : itemInput() }
        </li>
    );
}
