export const CREATE_LIST = 'createList'
export const GET_LISTS = 'getLists'
export const GET_LIST_DETAIL = 'getListDetail'
export const DELETE_LIST = 'deleteList'
const SET_HISTORY = 'setHistory'
const SET_ACTIVE = 'setActive'
const SET_FOCUS = 'setFocus'

export const createList = (name, products) => ({
    type: CREATE_LIST,
    name,
    products
})
export const getLists = () => ({
    type: GET_LISTS
})
export const getListDetail = (id) => ({
    type: GET_LIST_DETAIL,
    id
})
export const deleteList = (id) => ({
    type: DELETE_LIST,
    id
})
export const setHistory = (history) => ({
    type: SET_HISTORY,
    history
})
export const setActive = (active) => ({
    type: SET_ACTIVE,
    active
})
export const setFocus = (focus) => ({
    type: SET_FOCUS,
    focus
})

const initialState = {
    activeList: null,
    listFocus: null,
    listHistory: []
}

export default function listHistory(state=initialState, action) {
    switch(action.type) {
        case SET_HISTORY:
            return { ...state, listHistory: [...action.history] }
        case SET_ACTIVE:
            return { ...state, activeList: action.active }
        case SET_FOCUS:
            return { ...state, listFocus: action.focus }
        default:
            return state
    }
}