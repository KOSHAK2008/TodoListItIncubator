import {ChangeEvent, useState} from "react";
import TextField from "@mui/material/TextField";

type PropsType = {
    title: string
    changeTitle?: (title: string) => void
}
export const EditableSpan = ({title, changeTitle}: PropsType) => {

    const [editMode, setEditMode] = useState(false)
    const [value, setValue] = useState(title);

    const activateEditMode = () => {
        setEditMode(true);
    }

    const deactivateEditMode = () => {
        setEditMode(false);
        changeTitle && changeTitle(value)
    }

    const changeValueHandler = (event: ChangeEvent<HTMLInputElement>) => {
        setValue(event.currentTarget.value)

    }

    return (
        <>
            {editMode && <TextField value={value}
                                    label="Change a title"
                                    variant="outlined"
                                    size={"small"}
                                    onChange={changeValueHandler}
                                    onBlur={deactivateEditMode}
                                    autoFocus/>
            }
            {!editMode && <span style={{fontSize: "20px"}} onDoubleClick={activateEditMode}>{title}</span>}
        </>
    );
};