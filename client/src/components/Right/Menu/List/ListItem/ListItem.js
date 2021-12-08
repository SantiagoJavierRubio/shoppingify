import { useDispatch } from "react-redux"
import { changeItemQuantity, removeItem } from '../../../../../redux/ducks/itemList';
import { useState, useEffect, useRef } from "react"
import './ListItem.css'

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

    // handle click outside of item to close edit mode
    const itemRef = useRef(null);
    useEffect(() => {

        const handleClickOutside = e => {
            if(itemRef.current && !itemRef.current.contains(e.target)) {
                setEditMode(false);
            }
        }
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        }
    }, [itemRef])


    return(
        <div className="listItem" onClick={() => setEditMode(true)} ref={itemRef}>
            <h6 className="itemName">
                {item.id}
            </h6>
            <div className={`listItemInfo ${editMode ? 'itemEdit' : null}`}>
                {editMode ? 
                    <>
                    <button className="itemAction itemDelete accentButton" onClick={handleItemDelete}>
                        <span className="material-icons">delete_outline</span>
                    </button>
                    <button className="itemAction itemQuantity" onClick={handleItemSubstract}>
                        <span className="material-icons">remove</span>
                    </button>
                    </>
                    : null
                }
                <div className={`itemAmmount ${editMode ? 'itemEdit' : null}`}>
                    {item.ammount} pcs
                </div>
                { editMode ? 
                    <button className="itemAction itemQuantity" onClick={handleItemAdd}>
                        <span className="material-icons">add</span>
                    </button>
                    : null
                }
            </div>
        </div>
    )
}

export default ListItem;