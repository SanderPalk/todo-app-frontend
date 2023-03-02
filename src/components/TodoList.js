import TodoItem from "./TodoItem";
import { useEffect, useState } from "react";

const TodoList = ({ taskList, theme, getTaskList, handleDelete }) => {
    const [filterStatus, setFilterStatus] = useState("all");

    useEffect(() => {
        getTaskList();
    }, []);

    const filteredTaskList = taskList.filter((task) => {
        if (filterStatus === "active") {
            return task.status === 0;
        } else if (filterStatus === "completed") {
            return task.status === 1;
        } else {
            return true;
        }
    });

    const itemCounter = filteredTaskList.filter((task) => task.status === 0 || task.status === 1)
        .length;

    const handleFilterClick = (status) => {
        getTaskList()
        setFilterStatus(status);
    };

    return (
        <div className="todo-list-container">
            {filteredTaskList.map((item) => (
                <TodoItem task={item} theme={theme} key={item.id}/>
            ))}
            <div className={`todo-item-container footer ${theme ? "" : "light-container"}`}>
                <div className="list-counter-container">{itemCounter} items left</div>
                <div className="list-filter-container">
                    <button
                        onClick={() => handleFilterClick("all")}
                        className={filterStatus === "all" ? "" : "light-filter"}
                    >
                        All
                    </button>
                    <button
                        onClick={() => handleFilterClick("active")}
                        className={filterStatus === "active" ? "" : "light-filter"}
                    >
                        Active
                    </button>
                    <button
                        onClick={() => handleFilterClick("completed")}
                        className={filterStatus === "completed" ? "" : "light-filter"}
                    >
                        Completed
                    </button>
                </div>
                <div className="clear-completed-container">
                    <button
                        className={theme ? "delete-button" : "delete-button light-filter"}
                        onClick={handleDelete}
                    >
                        Delete all completed
                    </button>
                </div>
            </div>
        </div>
    );
};

export default TodoList;
