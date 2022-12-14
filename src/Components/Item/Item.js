import { MdDelete, MdModeEditOutline } from "react-icons/md";
import { SiAddthis } from "react-icons/si";
import { ItemRow } from "./ItemStyles";
import React, { useState, useContext } from 'react';
import { DataContext } from "../../Context/DataProvider";
import { updateDoc, deleteDoc, doc } from "firebase/firestore";
import db from "../../utils/firebaseConfig"


export const Item = ({text, id, editTexts}) => {

    const { texts, setTexts } = useContext(DataContext);
    const [onEdit, setOnEdit] = useState(false);
    const [value, setValue] = useState(text.name);
    
    const edit = id => {
        setOnEdit(false);
        if(value) {
            editTexts(value,id)
            setValue('')
        }
        updateDoc(doc(db, "items", id), {id:id, name:value});
        // updateItem(id, {id:id, name:value})
    }

    const deleteItem = id => {
        const newTexts = texts.filter(item=> item !== text )
        setTexts(newTexts)
        deleteDoc(doc(db, "items", id));
    }

    if (onEdit === true) {
        
        return (
            <ItemRow>
                <form>
                    <input className="input_edit" value={value} onChange={event => setValue(event.target.value)} />
                    <div className="edit_button">
                        <button onClick={() => edit(id)}>
                            <SiAddthis />
                        </button>
                    </div>
                </form>
            </ItemRow>
        )
 
    } else {
        return (
            <ItemRow>
            <div className="div_span">
                <input className="input_checkbox" type='checkbox' />
                <span>{text.name}</span>
            </div>
            <div className="div_icons">
                <button onClick={() => setOnEdit(true)}>
                    <MdModeEditOutline /> 
                </button>
                <button>
                    <MdDelete onClick={() => deleteItem(id)} />
                </button>
            </div>
            </ItemRow>
        )
    }    
}