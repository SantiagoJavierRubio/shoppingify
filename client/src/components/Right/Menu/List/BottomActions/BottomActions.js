import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addNewList } from '../../../../../redux/ducks/listHistory';
import { ReactComponent as EmptyCartLogo } from '../cart.svg';
import './BottomActions.css';

const BottomActions = ({ enabled, list }) => {

    const [inputValue, setInput] = useState(null);
    const dispatch = useDispatch();

    const handleInput = e => {
        setInput(e.target.value);
    }

    // REDUX SAGA ALTERNATIVE???
    const handleSubmit = () => {
        dispatch(addNewList(inputValue, list))
    }

    return(
        <div className="rightBottomOptions" id="edit-item-actions">
                {!enabled && <EmptyCartLogo id="empty-cart-logo" />}
                <div className={`bottomActions ${!enabled ? 'disabledActions' : null}`}>
                    <input type="text" disabled={!enabled} onChange={handleInput}/>
                    <button className="accentButton" disabled={!enabled} onClick={handleSubmit}>Save</button>
                </div>
        </div>
    )
}

export default BottomActions;