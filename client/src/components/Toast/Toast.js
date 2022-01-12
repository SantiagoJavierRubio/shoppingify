import { useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import './Toast.css';


const Toast = () => {

    const [showToast, setShowToast] = useState(false);
    const toastState = useSelector((state) => state.toasts);

    const hideToast = () => {
        setShowToast(false)
    }

    useEffect(() => {
        if(toastState.error === null) return
        setShowToast(true)
        setTimeout(hideToast, 3000)
    }, [toastState])

    return(
        <div id="toast-main" data-show={showToast} data-error={toastState.error}>
                <button className="closeToast" onClick={hideToast}>
                    <span className="material-icons">close</span>
                </button>
            <div className="toastContent">
                {toastState.error ?
                    <span className="material-icons" id='toastErrorIcon'>error</span>
                    :
                    <span className="material-icons" id='toastSuccessIcon'>check_circle</span>
                }
                <p className="toastMessage">{toastState.message}</p>
            </div>
        </div>
    )

}

export default Toast