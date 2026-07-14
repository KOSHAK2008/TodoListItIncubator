import "./App.css"
import {useReducer, useState} from "react"
import {v1} from "uuid"
import {Todolist} from "./Todolist.tsx"
import {CreateItemForm} from "./CreateItemForm.tsx";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container"
import Grid from "@mui/material/Grid"
import Paper from "@mui/material/Paper";
import {NavButton} from "./NavButton.ts";
import {containerSx} from "./TodolistItem.styles.ts";
import {createTheme, ThemeProvider} from "@mui/material";
import Switch from "@mui/material/Switch"
import CssBaseline from "@mui/material/CssBaseline"
import {
    changeTodoListFilterAC, changeTodoListTitleAC,
    createTodoListAC,
    deleteTodoListAC,
    todoListsReducer
} from "./model/todoLists.reducer.ts";

export type FilterValuesType = "all" | "active" | "completed"

type ThemeMode = "dark" | "light"

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

    const [themeMode, setThemeMode] = useState<ThemeMode>("light")
    const theme = createTheme({
        palette: {
            mode: themeMode,
            primary: {
                main: "#087EA4",
            },
        },
    })

    // const [todoLists, setTodoLists] = useState<TodoListType[]>([
    //     {id: todoListId1, title: "What to learn", filter: "all"},
    //     {id: todoListId2, title: "What to buy", filter: "active"},
    // ])

    const [todoLists, dispatchTodoLists] = useReducer(todoListsReducer, [
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

    const changeModeHandler = () => {
        setThemeMode(themeMode === "light" ? "dark" : "light")
    }

    //TodoLists
    const changeFilter = (filter: FilterValuesType, todoListId: string) => {
        const action = changeTodoListFilterAC({id: todoListId, filter})
        dispatchTodoLists(action)

        // const newTodoLists = todoLists.map((tl) => {
        //     return tl.id === todoListId ? {...tl, filter} : tl
        // })
        //
        // setTodoLists(newTodoLists)
    }

    const removeTodoList = (todoListId: string) => {
        const action = deleteTodoListAC(todoListId)
        dispatchTodoLists(action);

        // const filterTodoList = todoLists.filter((tl) => tl.id !== todoListId)
        // setTodoLists(filterTodoList);
        delete tasks[action.payload.id];
        setTasks({...tasks});
    }

    const createTodoListHandler = (title: string) => {
        const action = createTodoListAC(title)
        dispatchTodoLists(action);
        // const newTodoList: TodoListType = {id: v1(), title, filter: "all"}
        // setTodoLists([newTodoList, ...todoLists])
        setTasks( {...tasks, [action.payload.id]: []});
    }

    const changeTodoListTitleHandler = (todoListId: string, title: string,) => {
        const action = changeTodoListTitleAC({id: todoListId, title})
        dispatchTodoLists(action);

        // const newTodoLists: TodoListType[] = todoLists.map((el) => {
        //     return el.id === todoListId ? {...el, title} : el
        // })
        // setTodoLists(newTodoLists)
    }

    // Tasks
    const deleteTask = (taskId: TaskType["id"], todoListId: string) => {
        const filteredTasks = tasks[todoListId].filter(task => {
            return task.id !== taskId
        })
        setTasks({...tasks, [todoListId]: filteredTasks})
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

    return (
        <ThemeProvider theme={theme}>
            <CssBaseline/>
            <div className="app">
                <AppBar position="static" sx={{mb: "30px"}}>
                    <Toolbar>
                        <Container maxWidth={"lg"} sx={containerSx}>
                            <IconButton
                                size="large"
                                edge="start"
                                color="inherit"
                                aria-label="menu"
                                sx={{mr: 2}}
                            >
                                <MenuIcon/>
                            </IconButton>
                            <div>
                                <NavButton color="inherit">Sign in</NavButton>
                                <NavButton color="inherit">Sign up</NavButton>
                                <NavButton background={theme.palette.primary.dark} color="inherit">Faq</NavButton>
                                <Switch color={"default"} onChange={changeModeHandler}/>
                            </div>
                        </Container>
                    </Toolbar>
                </AppBar>
                <Container maxWidth={"lg"}>
                    <Grid container sx={{mb: "30px"}}>
                        <CreateItemForm createRItem={createTodoListHandler}/>
                    </Grid>
                    <Grid container spacing={4}>
                        {
                            todoLists.map((tl) => {

                                let filteredTasks = tasks[tl.id]
                                if (tl.filter === "active") {
                                    filteredTasks = tasks[tl.id].filter(task => !task.isDone)
                                }
                                if (tl.filter === "completed") {
                                    filteredTasks = tasks[tl.id].filter(task => task.isDone)
                                }

                                return (
                                    <Grid key={tl.id}>
                                        <Paper elevation={2} sx={{p: "0 20px 20px 20px"}}>
                                            <Todolist todoList={tl}
                                                      tasks={filteredTasks}
                                                      deleteTask={deleteTask}
                                                      changeFilter={changeFilter}
                                                      createTask={createTask}
                                                      changeTodoListTitle={changeTodoListTitleHandler}
                                                      changeTaskStatus={changeTaskStatus}
                                                      changeTaskTitle={changeTaskTitle}
                                                      removeTodoList={removeTodoList}
                                            />
                                        </Paper>
                                    </Grid>
                                )
                            })
                        }
                    </Grid>
                </Container>
            </div>
        </ThemeProvider>
    )
}
