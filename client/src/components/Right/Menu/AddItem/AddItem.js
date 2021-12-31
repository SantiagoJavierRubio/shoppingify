import { useDispatch, useSelector } from 'react-redux';
import { setRightView } from '../../../../redux/ducks/views';
import { ReactComponent as Bottle } from './bottle.svg';
import './AddItem.css';

const AddItem = () => {

    const dispatch = useDispatch();
    const isEditing = useSelector((state) => state.views.editMode)

    const handleAddItem = () => {
        dispatch(setRightView('add'))
    }

    if(!isEditing) return <div className="editModeBuffer"></div>
    return(
        <div className="addItemBox">
            <Bottle id="bottle-logo" />
            <div className="addOptions">
                <p>Didn't find what you need?</p>
                <button className="primaryButton" id="add-item-button" onClick={handleAddItem}>Add item</button>
            </div>
        </div>
    )
}

export default AddItem;