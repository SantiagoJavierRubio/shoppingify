const SET_MAIN_VIEW = 'setMainView';
const SET_RIGHT_VIEW = 'setRightView';
const TOGGLE_EDIT_MODE = 'toggleEditMode';

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


const initialState = {
    mainView: 'items',
    rightView: 'menu',
    focus: null,
    editMode: true
}

export default function views(state=initialState, action){
    switch(action.type){
        case SET_MAIN_VIEW:
            return { ...state, mainView: action.mainView }
        case SET_RIGHT_VIEW:
            return { ...state, rightView: action.rightView, focus: action.focus }
        case TOGGLE_EDIT_MODE:
            return { ...state, editMode: !state.editMode}
        default: 
            return state
    }
}