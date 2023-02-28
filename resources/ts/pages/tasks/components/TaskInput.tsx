export const TaskInput = () => {
    return (
        <form className="input-form">
            <div className="inner">
                <input type="text" className="input" placeholder="TODOを入力してください。" defaultValue="" />
                <button className="btn is-primary">追加</button>
            </div>
        </form>
    )
}
