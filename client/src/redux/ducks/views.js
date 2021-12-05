const SET_VIEW = 'setView';

export const setView = (view) => ({
    type: SET_VIEW,
    view
})

export default function(state={view: 'items'}, action){
    switch(action.type){
        case SET_VIEW:
            return { ...state, view: action.view }

        default: 
            return state
    }
}