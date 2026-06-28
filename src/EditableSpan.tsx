import {ChangeEvent, useState} from "react";

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
            {editMode && <input type="text" value={value} onBlur={deactivateEditMode} onChange={changeValueHandler} autoFocus/>}
            {!editMode && <span style={{fontSize: "20px"}} onDoubleClick={activateEditMode}>{title}</span>}
        </>
    );
};