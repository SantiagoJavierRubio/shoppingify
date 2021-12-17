import { useSelector, useDispatch } from 'react-redux';
import { setRightView } from '../../../redux/ducks/views';
import { addItem } from '../../../redux/ducks/itemList';
import './Details.css';

const Details = () => {

    const focus = useSelector((state) => state.views.focus);
    const dispatch = useDispatch();

    const handleCloseDetails = () => {
        dispatch(setRightView('menu', null))
    }

    const handleAddItemToList = (e) => {
        dispatch(addItem(focus))
        dispatch(setRightView('menu', null))
    }

    const handleDeleteItem = () => {
        /*
            ADD MODAL AND DELETE FROM USERS PRODUCTS LOGIC
        */
       console.warn('FUNCTION PENDING')
    }

    return(
        <article id="product-details">
            <button className="detailsCloseButton" onClick={handleCloseDetails}>
                <span className="material-icons">keyboard_backspace</span>
                back
            </button>
            <img className="productImage" src={focus.img} alt={focus.name} />
            <p className="detailTitle">name</p>
            <p className="productTitle">{focus.name}</p>
            <p className="detailTitle">category</p>
            <p className="aboutText">{focus.category}</p>
            <p className="detailTitle">note</p>
            <p className="aboutText">{focus.about}</p>
            <div className="rightBottomOptions detailsActions">
                <button className="primaryButton delete" onClick={handleDeleteItem}>delete</button>
                <button className="accentButton add" onClick={handleAddItemToList}>Add to list</button>
            </div>
        </article>
    )
}

export default Details;