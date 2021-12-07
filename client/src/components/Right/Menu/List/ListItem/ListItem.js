import { useDispatch } from "react-redux"
import { changeItemQuantity, removeItem } from '../../../../../redux/ducks/itemList';
import { useState, useEffect } from "react"

const ListItem = ({ item }) => {

    const [editMode, setEditMode] = useState(false);
    const dispatch = useDispatch();

    const handleItemDelete = () => {
        dispatch(removeItem(item))
    }
    const handleItemAdd = () => {
        dispatch(changeItemQuantity(item, 1))
    }
    const handleItemSubstract = () => {
        dispatch(changeItemQuantity(item, -1))
    }

    return(
        <div className="listItem" onClick={() => setEditMode(true)}>
            <h6 className="itemName">
                {item.id}
            </h6>
            <div className="listItemInfo">
                {editMode ? 
                    <>
                    <button className="itemAction itemDelete" onClick={handleItemDelete}>
                        <span className="material-icons">delete</span>
                    </button>
                    <button className="itemAction itemSubstract" onClick={handleItemSubstract}>
                        <span className="material-icons">remove</span>
                    </button>
                    </>
                    : null
                }
                <div className="itemAmmount">
                    {item.ammount} pcs
                </div>
                { editMode ? 
                    <button className="itemAction itemAdd" onClick={handleItemAdd}>
                        <span className="material-icons">add</span>
                    </button>
                    : null
                }
            </div>
        </div>
    )
}

export default ListItem;