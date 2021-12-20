import { useSelector, useDispatch } from 'react-redux';
import { deleteProduct } from '../../../../redux/ducks/products';
import { setRightView } from '../../../../redux/ducks/views';
import { useRef, useEffect } from 'react';
import './DeleteModal.css'

const DeleteModal = ({ show, setShowModal }) => {

    const focus = useSelector((state) => state.views.focus);
    const dispatch = useDispatch();

    const handleProductDelete = () => {
        dispatch(deleteProduct(focus.ID));
        dispatch(setRightView('menu'));
        return setShowModal(false);
    }

    const handleCancel = () => {
        return setShowModal(false);
    }

    // close on outside click
    const itemRef = useRef(null);
    useEffect(() => {
        const handleClickOutside = e => {
            if(itemRef.current && !itemRef.current.contains(e.target)) {
                setShowModal(false);
            }
        }
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        }
    }, [itemRef])


    if(!show) return null
    return(
        <div id="delete-product-modal" ref={itemRef}>
            <p>Are you sure?</p>
            <div className="modalActions">
                <button className="primaryButton cancel" onClick={handleCancel}>cancel</button>
                <button className="primaryButton delete" onClick={handleProductDelete}>DELETE</button>
            </div>
        </div>
    )
}

export default DeleteModal;