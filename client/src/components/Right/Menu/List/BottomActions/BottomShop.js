import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { completeList } from '../../../../../redux/ducks/itemList';

const BottomShop = () => {

    const dispatch = useDispatch();

    const handleSubmit = () => {
        dispatch(completeList())
    }

    return(
        <div className="rightBottomOptions" id="edit-list-actions">
            <button className='primaryButton' id="cancel-list-button">Cancel</button>
            <button className='primaryButton' id="complete-list-button" onClick={handleSubmit}>Complete</button>
        </div>
    )
}

export default BottomShop;