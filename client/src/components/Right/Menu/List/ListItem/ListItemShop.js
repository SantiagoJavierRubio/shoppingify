import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { setRightView } from '../../../../../redux/ducks/views';
import { setCheckedItem } from '../../../../../redux/ducks/itemList';
import './ListItem.css';

const ListItemShop = ({ item }) => {

    const [checked, setChecked] = useState(item.checked);
    const dispatch = useDispatch();

    const handleToggleCheck = () => {
        dispatch(setCheckedItem(item.ID, !checked));
        setChecked(!checked);

    }
    const handleShowDetails = () => {
        dispatch(setRightView('details', item))
    }

    return(
        <div className="listItem">
            <div className="checkBox" onClick={handleToggleCheck}>
                <span className="material-icons">
                    {checked ? 'check_box' : 'check_box_outline_blank'}
                </span>
            </div>
            <h6 className={`itemName ${checked ? 'checked' : null}`}>
                {item.name}
            </h6>
            <div className={`listItemInfo`} onClick={handleShowDetails}>
                <div className={`itemAmmount`}>
                    {item.ammount} pcs
                </div>
            </div>
        </div>
    )
}

export default ListItemShop