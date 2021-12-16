import { useDispatch } from 'react-redux';
import { addItem } from '../../../../redux/ducks/itemList';
import './Item.css';


const Item = ({ item }) => {
    
    const dispatch = useDispatch()

    const handleAddItemToList = (e) => {
        e.stopPropagation();
        dispatch(addItem(item))
    }

    return(
        <button className='itemMainButton primaryButton'>
            <p className='itemName'>{item.name}</p>
            <button onClick={handleAddItemToList} className='itemAddButton'>
                <span className="material-icons">add</span>
            </button>
        </button>
    )
}

export default Item;