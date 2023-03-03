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
    const { data } = await axios.patch<Task[]>(
        `/api/tasks/update-done/${id}/`,
        { is_done: !is_done }
    )
    return data
}