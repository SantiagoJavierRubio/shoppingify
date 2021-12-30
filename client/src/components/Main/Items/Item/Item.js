import { useDispatch, useSelector } from 'react-redux';
import { addItem } from '../../../../redux/ducks/itemList';
import { setRightView } from '../../../../redux/ducks/views';
import './Item.css';


const Item = ({ item }) => {
    
    const dispatch = useDispatch()
    const isEditing = useSelector((state) => state.views.editMode)

    const handleFocusItem = () => {
        dispatch(setRightView('details', item))
    }

    const handleAddItemToList = (e) => {
        e.stopPropagation();
        dispatch(addItem(item))
    }

    return(
        <div className='itemMainButton primaryButton' onClick={handleFocusItem}>
            <p className='itemName'>{item.name}</p>
            {isEditing && 
            <button onClick={handleAddItemToList} className='itemAddButton'>
                <span className="material-icons">add</span>
            </button>
            }
        </div>
    )
}

export default Item;