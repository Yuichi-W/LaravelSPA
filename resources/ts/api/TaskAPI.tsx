import axios from 'axios';
import { Task } from '../types/Task';

export const getTasks = async () =>{
    // 第一引数：キーとなる文字列
    // 第二引数：非同期の処理
    // useQueryから受け取るのはdate(APIから取得したタスクの一覧)とstatus(エラーやローディング情報)
    const { data } = await axios.get<Task[]>('api/tasks')
    return data
}

export const updateDoneTask = async ({ id, is_done }: Task) =>{
    const { data } = await axios.patch<Task>(
        `/api/tasks/update-done/${id}/`,
        { is_done: !is_done }
    )
    return data
}

export const createTask = async (title: string) =>{
    const { data } = await axios.post<Task>(
        `/api/tasks`,{ title: title }
    )
    return data
}

export const updateTask = async ({ id, task }: { id: number, task:Task }) =>{
    const { data } = await axios.put<Task>(
        `/api/tasks/${id}/`,
        task
    )
    return data
}

export const deleteTask = async ( id : number ) =>{
    const { data } = await axios.delete<Task>(
        `/api/tasks/${id}/`
    )
    return data
}