const SET_SESSION_ERROR_TOAST = 'setSessionErrorToast';
const SET_SAVED_LIST_TOAST = 'setSavedListToast';
const SET_SAVED_ITEM_TOAST = 'setSavedItemToast';
const SET_COMPLETED_LIST_TOAST = 'setCompletedListToast';
const SET_CANCELLED_LIST_TOAST = 'setCancelledListToast';
const SET_UNDEFINED_ERROR_TOAST = 'setUndefinedErrorToast';
const SET_NO_ITEMS_TOAST = 'setNoItemsToast';

export const setSessionErrorToast = () => ({
    type: SET_SESSION_ERROR_TOAST,
    error: true,
    message: 'Your session expired, please login to procede'
})
export const setSavedListToast = () => ({
    type: SET_SAVED_LIST_TOAST,
    error: false,
    message: 'List saved successfully!'
})
export const setSavedItemToast = () => ({
    type: SET_SAVED_ITEM_TOAST,
    error: false,
    message: 'Item added!'
})
export const setCompletedListToast = () => ({
    type: SET_COMPLETED_LIST_TOAST,
    error: false,
    message: 'List completed!'
})
export const setCancelledListToast = () => ({
    type: SET_CANCELLED_LIST_TOAST,
    error: false,
    message: 'List cancelled!'
})
export const setNoItemsToast = () => ({
    type: SET_NO_ITEMS_TOAST,
    error: true,
    message: 'Found no items for this list'
})
export const setUndefinedErrorToast = (message) => ({
    type: SET_UNDEFINED_ERROR_TOAST,
    error: true,
    message
})


const initialState = {
    error: null,
    message: null
}

export default function toasts(state=initialState, action) {
    switch(action.type){
        case SET_SESSION_ERROR_TOAST:
        case SET_SAVED_LIST_TOAST:
        case SET_SAVED_ITEM_TOAST:
        case SET_COMPLETED_LIST_TOAST:
        case SET_CANCELLED_LIST_TOAST:
        case SET_UNDEFINED_ERROR_TOAST:
            return { ...state, error: action.error, message: action.message }
        default:
            return state
    }
}