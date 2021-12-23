import { useSelector, useDispatch } from "react-redux";
import listHistory, { setFocus } from "../../../../redux/ducks/listHistory";
import ListItems from "./ListItems/ListItems";
import { useState, useEffect } from "react";
import './ListDetails.css'

const ListDetails = () => {

    const dispatch = useDispatch();
    const list = useSelector((state) => state.history.listFocus);
    const date = new Date(list.date) || null;
    const dayNames = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

    
    const handleGoBack = () => {
        dispatch(setFocus(null))
    }

    if(!list) return <></>
    if(list.error) return <h1>{list.error.message}</h1>
    return(
        <div id="history-details">
            <button onClick={handleGoBack} className="historyDetailsBack">
                <span className="material-icons">keyboard_backspace</span>
                back
            </button>
            <h3 className="historyTitle">{list.name}</h3>
            <div className="historyDate"><span className="material-icons">event_note</span>{`${dayNames[date.getDay()]} ${date.getMonth()+1}.${date.getDate()}.${date.getFullYear()}`}</div>
            <ListItems items={list.products} />
        </div>
    )
} 

export default ListDetails