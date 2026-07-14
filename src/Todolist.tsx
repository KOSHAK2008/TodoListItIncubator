import {FilterValuesType, TaskType, TodoListType} from "./App"
// import {Button} from "./Button"
import Button from "@mui/material/Button";
import {CreateItemForm} from "./CreateItemForm.tsx";
import {EditableSpan} from "./EditableSpan.tsx";
import {ChangeEvent} from "react";
import IconButton from "@mui/material/IconButton";
import ClearIcon from "@mui/icons-material/Clear";
import Checkbox from "@mui/material/Checkbox";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Box from "@mui/material/Box";
import {containerSx, getListItemSx} from "./TodolistItem.styles"

type PropsType = {
    todoList: TodoListType
    tasks: TaskType[]
    deleteTask: (taskId: string, todoListId: string) => void
    changeFilter: (filter: FilterValuesType, todoListId: string) => void
    createTask: (title: TaskType["title"], todoListId: string) => void
    changeTodoListTitle: (title: string, todoListId: string) => void
    changeTaskStatus: (taskId: TaskType["id"], isDone: TaskType["isDone"], todoListId: string) => void
    changeTaskTitle: (taskId: TaskType["id"], title: string, todoListId: string) => void
    removeTodoList: (todoListId: string) => void
}

export const Todolist = ({
                             todoList,
                             tasks,
                             deleteTask,
                             changeFilter,
                             createTask,
                             changeTodoListTitle,
                             changeTaskStatus,
                             changeTaskTitle,
                             removeTodoList
                         }: PropsType) => {


    const removeTodoListHandler = () => {
        removeTodoList(todoList.id)
    }

    const createTaskHandler = (title: string) => {
        createTask(title, todoList.id)
    }

    const changeTodoListsTitleHandler = (title: string) => {
        changeTodoListTitle(todoList.id, title)
    }

    return (
        <div>
            <div className={"container"}>
                <EditableSpan title={todoList.title} changeTitle={changeTodoListsTitleHandler}/>
                {/*<Button title={"X"} onClick={removeTodoListHandler}/>*/}
                <IconButton aria-label="delete" onClick={removeTodoListHandler}>
                    <ClearIcon/>
                </IconButton>
            </div>
            <CreateItemForm createRItem={createTaskHandler}/>
            {tasks.length === 0 ? (
                <p>Тасок нет</p>
            ) : (
                <List>
                    {tasks.map(task => {
                        const deleteTaskHandler = () => {
                            deleteTask(task.id, todoList.id)
                        }

                        const changeTaskStatusHandler = (e: ChangeEvent<HTMLInputElement>) => {
                            const newStatusValue = e.currentTarget.checked
                            changeTaskStatus(task.id, newStatusValue, todoList.id)
                        }

                        const changeTaskTitleHandler = (title: string) => {
                            changeTaskTitle(task.id, title, todoList.id)
                        }


                        return (
                            <ListItem key={task.id} sx={getListItemSx(task.isDone)}>
                                <div>
                                    <Checkbox checked={task.isDone} onChange={changeTaskStatusHandler}/>
                                    <EditableSpan title={task.title} changeTitle={changeTaskTitleHandler}/>
                                </div>
                                {/*<span className={task.isDone ? "task-done" : "task"}>{task.title}</span>*/}
                                <IconButton aria-label="delete" onClick={deleteTaskHandler}>
                                    <ClearIcon/>
                                </IconButton>
                            </ListItem>
                        )
                    })}
                </List>
            )}
            <Box sx={containerSx}>
                <Button title={"All"}
                        onClick={() => changeFilter("all", todoList.id)}
                        color={"inherit"}
                        variant={todoList.filter === "all" ? "outlined" : "text"}>
                    All
                </Button>
                <Button title={"Active"}
                        onClick={() => changeFilter("active", todoList.id)}
                        variant={todoList.filter === "active" ? "outlined" : "text"}
                        color={"primary"}
                >
                    Active
                </Button>
                <Button title={"Completed"}
                        onClick={() => changeFilter("completed", todoList.id)}
                        variant={todoList.filter === "completed" ? "outlined" : "text"}
                        color={"secondary"}
                >
                    Completed
                </Button>
            </Box>
        </div>
    )
}
