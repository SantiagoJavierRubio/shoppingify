import { useDispatch, useSelector } from 'react-redux';
import { completeList } from '../../../../../redux/ducks/itemList';
import { setModal } from '../../../../../redux/ducks/views';

const BottomShop = () => {

    const dispatch = useDispatch();

    const listName = useSelector((state) => state.items.name);

    const handleSubmit = () => {
        dispatch(completeList())
    }
    const handleCancel = () => {
        dispatch(setModal(true))
    }

    return(
        <div className="rightBottomOptions" id="edit-list-actions">
            {!listName &&
            <div className="disabledSection">
                <p>Save a new list first</p>
            </div>}
            <button className='primaryButton'
                    id="cancel-list-button" 
                    onClick={handleCancel}
                    disabled={listName ? false : true}>
                Cancel
            </button>
            <button className='primaryButton' 
                    id="complete-list-button" 
                    onClick={handleSubmit}
                    disabled={listName ? false : true}>
                Complete
            </button>
        </div>
    )
}

export default BottomShop;