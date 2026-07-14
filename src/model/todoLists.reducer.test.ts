import {v1} from 'uuid'
import {beforeEach, expect, test} from "vitest"
import {
    changeTodoListFilterAC,
    changeTodoListTitleAC,
    createTodoListAC,
    deleteTodoListAC,
    todoListsReducer
} from "./todoLists.reducer.ts";
import {TodoListType} from "../App.tsx";

let todolistId1:string
let todolistId2: string
let startState: TodoListType[] = []

beforeEach( () => {
    todolistId1 = v1()
    todolistId2 = v1()

   startState = [
        {id: todolistId1, title: 'What to learn', filter: 'all'},
        {id: todolistId2, title: 'What to buy', filter: 'all'},
    ]
})

test('correct todolist should be deleted', () => {
    const action = deleteTodoListAC(todolistId1)
    const endState = todoListsReducer(startState, action)

    expect(endState.length).toBe(1)
    expect(endState[0].id).toBe(todolistId2)
})

test('correct todolist should be created', () => {
    const title = 'New todolist'
    const endState = todoListsReducer(startState, createTodoListAC(title))

    expect(endState.length).toBe(3)
    expect(endState[2].title).toBe(title)
})

test('correct todolist should change its title', () => {
    const title = 'New title'
    const endState = todoListsReducer(startState, changeTodoListTitleAC({id: todolistId2, title}))

    expect(endState[0].title).toBe('What to learn')
    expect(endState[1].title).toBe(title)
})

test('correct todolist should change its filter', () => {
    const filter = 'completed'
    const endState = todoListsReducer(startState, changeTodoListFilterAC({id: todolistId2, filter}))

    expect(endState[0].filter).toBe('all')
    expect(endState[1].filter).toBe(filter)
})