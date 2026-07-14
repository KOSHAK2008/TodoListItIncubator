import {FilterValuesType, TodoListType} from "../App.tsx";
import {v1} from "uuid";

type DeleteTodoListActionType = ReturnType<typeof deleteTodoListAC>
type CreateTodoListActionType = ReturnType<typeof createTodoListAC>
type ChangeTodoListTitleActionType = ReturnType<typeof changeTodoListTitleAC>
type ChangeTodoListFilterActionType = ReturnType<typeof changeTodoListFilterAC>
export type ActionType = DeleteTodoListActionType | CreateTodoListActionType | ChangeTodoListTitleActionType | ChangeTodoListFilterActionType

export const deleteTodoListAC = (id: string) => ({
    type: "delete_todoList",
    payload: {id}
} as const)

export const createTodoListAC = (title: string) => ({
    type: "create_todoList",
    payload: {title, id: v1()}
} as const)

export const changeTodoListTitleAC = (payload: { id: string, title: string }) => ({
    type: "change_todoList_title",
    payload
} as const)

export const changeTodoListFilterAC = (payload: { id: string, filter: FilterValuesType }) => ({
    type: "change_todoList_filter",
    payload
} as const)

export const todoListsReducer = (state: TodoListType[], action: ActionType): TodoListType[] => {
    switch (action.type) {
        case "delete_todoList":
            return state.filter(tl => tl.id !== action.payload.id)

        case "create_todoList":
            const newTodoList: TodoListType = {id: action.payload.id, title: action.payload.title, filter: "all"}
            return [...state, newTodoList]

        case "change_todoList_title":
            return state.map(tl => tl.id === action.payload.id ? {...tl, title: action.payload.title} : tl)

        case "change_todoList_filter":
            return state.map(tl => tl.id === action.payload.id ? {...tl, filter:action.payload.filter} : tl)

        default:
            return state // newState
    }
}