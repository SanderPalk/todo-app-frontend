import { useState } from "react";
import axios from "axios";

const TodoItem = ({task, theme}) => {

    const api = process.env['REACT_APP_SERVER_URL']
    const [status, setStatus] = useState(task.status);

    const handleCompleteCheck = async () => {
        const newStatus = status === 0 ? 1 : 0;
        setStatus(newStatus)
        await axios.put(api + "/" + task.id, {status: newStatus})
    }


    return (
        <div className={`todo-item-container ${theme ? '' : 'light-container'}`}>
            <div className="checkbox-container" onClick={handleCompleteCheck}>
                <div className={`checkbox ${status === 1 ? 'checked' : ''}`}>
                    {status === 1 ? <img alt='' className='icon-checked'/> : ''}
                </div>
            </div>
            <div className={`todo-content-container`}>
                <p className={status === 1 ? 'checked': ''}>{task.activity}</p>
            </div>
        </div>
    )
}

export default TodoItem;
