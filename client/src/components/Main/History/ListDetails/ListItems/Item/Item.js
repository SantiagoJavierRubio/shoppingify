import { useDispatch } from 'react-redux';
import { setRightView } from '../../../../../../redux/ducks/views';
import './Item.css';

const Item = ({ item }) => {

    const dispatch = useDispatch()

    const handleFocusItem = () => {
        dispatch(setRightView('details', item))
    }

    return(
        <div className='itemHistoryButton primaryButton' onClick={handleFocusItem}>
            <p className='itemName'>{item.name}</p>
            <p className='itemAmmount'>{item.ammount} pcs</p>
        </div>
    )
}

export default Item