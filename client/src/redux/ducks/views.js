const SET_MAIN_VIEW = 'setMainView';
const SET_RIGHT_VIEW = 'setRightView';
const TOGGLE_EDIT_MODE = 'toggleEditMode';
const SET_MODAL = 'setModal'

export const setMainView = (mainView, historyFocus=null) => ({
    type: SET_MAIN_VIEW,
    mainView,
    historyFocus
})

export const setRightView = (rightView, focus=null) => ({
    type: SET_RIGHT_VIEW,
    rightView,
    focus
})

export const toggleEditMode = () => ({
    type: TOGGLE_EDIT_MODE
})

export const setModal = (show) => ({
    type: SET_MODAL,
    show
})


const initialState = {
    mainView: 'items',
    rightView: 'menu',
    focus: null,
    editMode: true,
    modal: false
}

export default function views(state=initialState, action){
    switch(action.type){
        case SET_MAIN_VIEW:
            return { ...state, mainView: action.mainView }
        case SET_RIGHT_VIEW:
            return { ...state, rightView: action.rightView, focus: action.focus }
        case TOGGLE_EDIT_MODE:
            return { ...state, editMode: !state.editMode}
        case SET_MODAL:
            return { ...state, modal: action.show }
        default: 
            return state
    }
}