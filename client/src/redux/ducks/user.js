export const LOG_USER = 'logUser';
export const SET_USER = 'setUser';
export const CHECK_USER = 'checkUser';
export const LOGOUT_USER = 'logOutUser'

export const logUser = (email, password) => ({
    type: LOG_USER,
    email,
    password
})

export const setUser = (user) => ({
    type: SET_USER,
    user
})

export const checkUser = () => ({
    type: CHECK_USER
})

export const logOutUser = () => ({
    type: LOGOUT_USER
})

const initialState = {
    user: null
}

export default function(state=initialState, action) {
    switch(action.type){
        case SET_USER:
            const user = action.user;
            return { ...state, user }
        case LOGOUT_USER:
            return initialState
        default:
            return state
    }
}