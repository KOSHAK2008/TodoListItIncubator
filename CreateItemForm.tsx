import {Button} from "./src/Button";
import {type ChangeEvent, type KeyboardEvent, useState} from "react"
import {TaskType} from "./src/App.tsx";

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
        } else setError(true)
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
            <input
                className={error ? "error" : ""}
                value={titleItem}
                onChange={changeTitleHandler}
                onKeyDown={createItemOnEnterHandler}
            />
            <Button title={"+"}
                    onClick={createItemHandler}
                    disabled={!isTitleValid}
            />
            {error && <div style={{color: "red"}}> Enter valid title </div>}
        </div>
    );
};
