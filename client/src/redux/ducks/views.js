const SET_MAIN_VIEW = 'setMainView';
const SET_RIGHT_VIEW = 'setRightView';

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


const initialState = {
    mainView: 'items',
    rightView: 'menu',
    focus: null
}

export default function views(state=initialState, action){
    switch(action.type){
        case SET_MAIN_VIEW:
            return { ...state, mainView: action.mainView }
        case SET_RIGHT_VIEW:
            return { ...state, rightView: action.rightView, focus: action.focus }
        default: 
            return state
    }
}