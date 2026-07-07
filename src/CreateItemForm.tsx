import {type ChangeEvent, type KeyboardEvent, useState} from "react"
import {TaskType} from "./App.tsx";
import TextField from "@mui/material/TextField";
import AddBoxIcon from '@mui/icons-material/AddBox'
import IconButton from '@mui/material/IconButton'

type PropsType = {
    createRItem: (title: TaskType["title"]) => void
}

export const CreateItemForm = ({createRItem}: PropsType) => {

    const [titleItem, setTitleItem] = useState("")
    const [error, setError] = useState<string | boolean>(false)

    const isTitleValid = titleItem.length > 0 && titleItem.length <= 20

    const createItemHandler = () => {
        const title = titleItem.trim()
        if (title !== "") {
            createRItem(titleItem)
        } else setError("Title is required")
        setTitleItem("")
    }


    const changeTitleHandler = (event: ChangeEvent<HTMLInputElement>) => {
        error && setError(false)
        setTitleItem(event.currentTarget.value)
    }

    const createItemOnEnterHandler = (event: KeyboardEvent<HTMLInputElement>) => {
        if (event.key === "Enter" && isTitleValid) {
            createItemHandler()
        }
    }

    return (
        <div>
            <TextField value={titleItem}
                       error={!!error}
                       label="Enter a title"
                       variant="outlined"
                       size={"small"}
                       helperText={error}
                       onChange={changeTitleHandler}
                       onKeyDown={createItemOnEnterHandler}/>
            <IconButton onClick={createItemHandler} color={'primary'}>
                <AddBoxIcon />
            </IconButton>
        </div>
    );
};
