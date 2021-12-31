import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createList } from '../../../../../redux/ducks/listHistory';
import { ReactComponent as EmptyCartLogo } from '../cart.svg';

const BottomEdit = () => {

    const list = useSelector((state) => state.items.shoppingList);
    const enabled = list[0] ? true : false;
    const listName = useSelector((state) => state.items.name) || '';
    const [inputValue, setInput] = useState(null);
    const dispatch = useDispatch();

    useEffect(() => {
        setInput(listName);
    }, [])

    const handleInput = e => {
        setInput(e.target.value);
    }

    const handleSubmit = () => {
        if(!inputValue || inputValue==="") return
        const itemList = list.map(item => {
            return {id: item.ID, ammount: item.ammount}
        })
        dispatch(createList(inputValue, itemList))
    }

    return(
        <div className="rightBottomOptions" id="edit-item-actions">
                {!enabled && <EmptyCartLogo id="empty-cart-logo" />}
                <div className={`bottomActions ${!enabled ? 'disabledActions' : null}`}>
                    <input type="text" disabled={!enabled} onChange={handleInput} placeholder={listName}/>
                    <button className="accentButton" disabled={!enabled} onClick={handleSubmit}>Save</button>
                </div>
        </div>
    )
}

export default BottomEdit;