import './App.css';
import { useState } from "react";
import InputField from "./components/InputField";
import TodoList from "./components/TodoList";
import axios from "axios";

function App() {

    const api = process.env['REACT_APP_SERVER_URL']
    const [isDarkMode, setDarkMode] = useState(true)
    const [taskList, setTaskList] = useState([]);
    const [task, setTask] = useState('')

    const toggleDarkMode = () => {
        setDarkMode(!isDarkMode)
    }

    const getAllItems = async () => {
        const {data} = await axios.get(api);
        setTaskList(data);
    }

    const addTask = async (newTask) => {
        await axios.post(api, (newTask))
        setTaskList([newTask, ...taskList])
        await getAllItems();
    }

    const deleteCompleted = () => {
        axios.delete(api, {
            params: {
                status: 1
            }
        }).then(response => {
            console.log(response.data);
        }).then(getAllItems)
            .catch(error => {
                console.log(error);
            })
    }

    const getActiveItems = async () => {
        const {data} = await axios.get(api, {
            params: {
                status: 0
            }
        });
        setTaskList(data);
    }

    const getCompletedItems = async () => {
        const {data} = await axios.get(api, {
            params: {
                status: 1
            }
        });
        setTaskList(data);
    }

    const getAllItemsAgain = async () => {
        await getAllItems();
    }

    return (
        <div className={`App ${isDarkMode ? 'dark-mode' : 'light-mode'}`}>
            <div className="main-container">
                <div className="header">
                    <h1>TODO</h1>
                    <a onClick={toggleDarkMode}>
                        <img alt='' className={`toggle-button ${isDarkMode ? '' : 'toggle-button-light'}`}/>
                    </a>
                </div>
                <div className="input-container">
                    <InputField task={task} setTask={setTask} addTask={addTask} theme={isDarkMode}></InputField>
                </div>
                <div className="todo-list-container">
                    <TodoList taskList={taskList} theme={isDarkMode} getTaskList={getAllItemsAgain}
                              handleDelete={deleteCompleted} activeItemFilter={getActiveItems}
                              completedItemFilter={getCompletedItems}></TodoList>
                </div>
            </div>
        </div>
    );
}

export default App;
