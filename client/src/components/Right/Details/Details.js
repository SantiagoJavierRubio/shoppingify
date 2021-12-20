import { useSelector, useDispatch } from 'react-redux';
import { setRightView } from '../../../redux/ducks/views';
import { addItem } from '../../../redux/ducks/itemList';
import { useEffect, useState } from 'react';
import DeleteModal from './DeleteModal/DeleteModal';
import './Details.css';

const Details = () => {

    const focus = useSelector((state) => state.views.focus);
    const dispatch = useDispatch();

    // User action functions
    const handleCloseDetails = () => {
        dispatch(setRightView('menu', null))
    }
    const handleAddItemToList = (e) => {
        dispatch(addItem(focus))
        dispatch(setRightView('menu', null))
    }
    const [showModal, setShowModal] = useState(false)
    const handleDeleteItem = () => {
        setShowModal(true);
    }

    // Image rendering funcs
    useEffect(() => {
        if(!focus.img || focus.img === 'NULL') return handleImgError();
    }, [focus])
    const handleImgError = () => {
        document.querySelector('#details-product-image').src = 'https://res.cloudinary.com/dju7kjewc/image/upload/v1639774934/productDefault_r5p8oa.jpg'
    }


    return(
        <article id="product-details">
            <DeleteModal show={showModal} setShowModal={setShowModal} />
            <button className="detailsCloseButton" onClick={handleCloseDetails}>
                <span className="material-icons">keyboard_backspace</span>
                back
            </button>
            <div className="imageContainer">
                <img className="productImage" src={focus.img} alt={focus.name} id="details-product-image" onError={handleImgError}/>
            </div>
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