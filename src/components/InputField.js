import { useState } from 'react';

const InputField = ({ theme, addTask }) => {
    const [task, setTask] = useState({ activity: '' });

    const handleAddTask = () => {
        if (!task.activity) return;

        addTask(task);

        setTask({ activity: '' });
    };

    const handleChange = (e) => {
        setTask({ ...task, activity: e.target.value });
    };

    return (
        <div className={`input-box ${theme ? '' : 'light-box'}`}>
            <input
                className={`${theme ? '' : 'input-light'}`}
                onChange={handleChange}
                name="todo"
                type="text"
                placeholder="Create a new todo..."
                value={task.activity}
            />
            <button onClick={handleAddTask}> Add task</button>
        </div>
    );
};


export default InputField;
