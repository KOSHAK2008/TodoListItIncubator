import "./App.css"
import {useState} from "react"
import {v1} from "uuid"
import {Todolist} from "./Todolist.tsx"
import {CreateItemForm} from "../CreateItemForm.tsx";

export type FilterValuesType = "all" | "active" | "completed"

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

export type TodoListType = {
    id: string
    title: string
    filter: FilterValuesType
}

// 1 version
export type _TasksState = {
    [key: string]: TaskType[]
}

// 2 version
export type TasksState = Record<string, TaskType[]>

const todoListId1 = v1();
const todoListId2 = v1();

export const App = () => {

    const [todoLists, setTodoLists] = useState<TodoListType[]>([
        {id: todoListId1, title: "What to learn", filter: "all"},
        {id: todoListId2, title: "What to buy", filter: "active"},
    ])

    const [tasks, setTasks] = useState<TasksState>({
        [todoListId1]: [
            {id: v1(), title: "HTML&CSS", isDone: true},
            {id: v1(), title: "JS", isDone: true},
            {id: v1(), title: "ReactJS", isDone: false},
        ],
        [todoListId2]: [
            {id: v1(), title: "bread", isDone: true},
            {id: v1(), title: "milk", isDone: true},
            {id: v1(), title: "potato", isDone: false},
        ],
    })

    const deleteTask = (taskId: TaskType["id"], todoListId: string) => {
        const filteredTasks = tasks[todoListId].filter(task => {
            return task.id !== taskId
        })
        setTasks({...tasks, [todoListId]: filteredTasks})
    }

    const changeFilter = (filter: FilterValuesType, todoListId: string) => {
        const newTodoLists = todoLists.map((tl) => {
            return tl.id === todoListId ? {...tl, filter} : tl
        })

        setTodoLists(newTodoLists)
    }

    const createTask = (title: TaskType["title"], todoListId: string) => {
        const newTask = {id: v1(), title, isDone: false}
        const newTasks = [newTask, ...tasks[todoListId]]
        setTasks({...tasks, [todoListId]: newTasks})
    }

    const changeTaskStatus = (taskId: TaskType["id"], isDone: TaskType["isDone"], todoListId: string) => {
        const newTasks: TaskType[] = tasks[todoListId].map(t => t.id === taskId ? {...t, isDone} : t)
        setTasks({...tasks, [todoListId]: newTasks})
    }

    const changeTaskTitle = (taskId: TaskType["id"], title: string, todoListId: string) => {
        const newTasks: TaskType[] = tasks[todoListId].map(t => t.id === taskId ? {...t, title} : t)
        setTasks({...tasks, [todoListId]: newTasks})
    }


    const removeTodoList = (todoListId: string) => {
        const filterTodoList = todoLists.filter((tl) => tl.id !== todoListId)
        setTodoLists(filterTodoList);
        delete tasks[todoListId];
        setTasks({...tasks});
    }

    const createTodoListHandler = (title: string) => {
        const newTodoList: TodoListType = {id: v1(), title, filter: "all"}
        setTodoLists([ newTodoList, ...todoLists] )
        setTasks({[newTodoList.id]: [],...tasks });
    }

    return (
        <div className="app">
            <CreateItemForm createRItem={createTodoListHandler}/>

            {
                todoLists.map((tl) => {

                    let filteredTasks = tasks[tl.id]
                    if (tl.filter === "active") {
                        filteredTasks = tasks[tl.id].filter(task => !task.isDone)
                    }
                    if (tl.filter === "completed") {
                        filteredTasks = tasks[tl.id].filter(task => task.isDone)
                    }

                    return (<>
                            <Todolist key={tl.id}
                                      todoList={tl}
                                      tasks={filteredTasks}
                                      deleteTask={deleteTask}
                                      changeFilter={changeFilter}
                                      createTask={createTask}
                                      changeTaskStatus={changeTaskStatus}
                                      changeTaskTitle={changeTaskTitle}
                                      removeTodoList={removeTodoList}
                            />
                        </>
                    )
                })
            }
        </div>
    )
}
