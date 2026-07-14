import {TasksState} from "../App.tsx";
import {ActionType} from "./todoLists.reducer.ts";

const initialState: TasksState = {}

export const tasksReducer = (state= initialState, action: ActionType): TasksState => {
    switch (action.type) {

        case "delete_todoList":
            delete state[action.payload.id];
            return {...state};

        case "create_todoList":
            return {...state, [action.payload.id]: []};

        default:
            return state // newState
    }
}