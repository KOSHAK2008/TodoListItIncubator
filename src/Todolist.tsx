import {FilterValuesType, TaskType, TodoListType} from "./App"
import {Button} from "./Button"
import {CreateItemForm} from "../CreateItemForm.tsx";
import {EditableSpan} from "./EditableSpan.tsx";
import {ChangeEvent} from "react";

type PropsType = {
    todoList: TodoListType
    tasks: TaskType[]
    deleteTask: (taskId: string, todoListId: string) => void
    changeFilter: (filter: FilterValuesType, todoListId: string) => void
    createTask: (title: TaskType["title"], todoListId: string) => void
    changeTodoListTitle:(title: string, todoListId: string)=> void
    changeTaskStatus: (taskId: TaskType["id"], isDone: TaskType["isDone"], todoListId: string) => void
    changeTaskTitle: (taskId: TaskType["id"], title: string, todoListId: string) => void
    removeTodoList: ( todoListId: string) => void
}

export const Todolist = ({todoList, tasks, deleteTask, changeFilter, createTask, changeTodoListTitle, changeTaskStatus, changeTaskTitle, removeTodoList}: PropsType) => {


    const removeTodoListHandler = () => {
        removeTodoList(todoList.id)
    }

    const createTaskHandler = ( title: string) => {
        createTask(title, todoList.id)
    }

    const changeTodoListsTitleHandler = (title: string) =>{
        changeTodoListTitle(todoList.id, title)
    }

    return (
        <div>
            <div className={"container"}>
                <EditableSpan title={todoList.title} changeTitle={changeTodoListsTitleHandler}/>
                <Button title={"x"} onClick={removeTodoListHandler}/>
            </div>
            <CreateItemForm createRItem={createTaskHandler}/>
            {tasks.length === 0 ? (
                <p>Тасок нет</p>
            ) : (
                <ul>
                    {tasks.map(task => {
                        const deleteTaskHandler = () => {
                            deleteTask(task.id, todoList.id)
                        }

                        const changeTaskStatusHandler = (e: ChangeEvent<HTMLInputElement>) => {
                            const newStatusValue = e.currentTarget.checked
                            changeTaskStatus(task.id, newStatusValue, todoList.id)
                        }

                        const changeTaskTitleHandler = ( title: string) => {
                            changeTaskTitle(task.id, title, todoList.id)
                        }


                        return (
                            <li key={task.id}>
                                <input type="checkbox"
                                       checked={task.isDone}
                                       onChange={changeTaskStatusHandler}
                                />
                                <EditableSpan title={task.title} changeTitle={changeTaskTitleHandler}/>
                                {/*<span className={task.isDone ? "task-done" : "task"}>{task.title}</span>*/}
                                <Button title={"x"} onClick={deleteTaskHandler}/>
                            </li>
                        )
                    })}
                </ul>
            )}
            <div>
                <Button title={"All"}
                        onClick={() => changeFilter("all", todoList.id)}
                        className={todoList.filter === "all" ? "filter--btn-active" : ""}
                />
                <Button title={"Active"}
                        onClick={() => changeFilter("active", todoList.id)}
                        className={todoList.filter === "active" ? "filter--btn-active" : ""}
                />
                <Button title={"Completed"}
                        onClick={() => changeFilter("completed", todoList.id)}
                        className={todoList.filter === "completed" ? "filter--btn-active" : ""}
                />
            </div>
        </div>
    )
}
