import { useDispatch } from "react-redux";
import { setModal, toggleEditMode } from "../../redux/ducks/views";
import { cancelList } from "../../redux/ducks/itemList";
import { useEffect, useRef } from "react";
import './CancelModal.css';

const CancelModal = () => {

    const dispatch = useDispatch();

    // close on outside click
    const itemRef = useRef(null);
    useEffect(() => {
        const handleClickOutside = e => {
            if(itemRef.current && !itemRef.current.contains(e.target)) {
                dispatch(setModal(false));
            }
        }
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        }
    }, [itemRef])

    const handleCloseModal = () => {
        dispatch(setModal(false));
    }

    const handleCancelConfirm = () => {
        dispatch(cancelList());
        dispatch(setModal(false));
        dispatch(toggleEditMode())
    }

    return(
        <div id="cancel-modal">
            <div className="modalBackdrop" />
            <div className="modalMain" ref={itemRef}>
                <button className="closeModalButton" onClick={handleCloseModal}>
                    <span className="material-icons">close</span>
                </button>
                <p>Are you sure you want to cancel this list?</p>
                <div className="cancelModalActions">
                    <button className="primaryButton cancel" onClick={handleCloseModal}>cancel</button>
                    <button className="primaryButton delete" onClick={handleCancelConfirm}>Yes</button>
                </div>
            </div>
        </div>
    )
}

export default CancelModal