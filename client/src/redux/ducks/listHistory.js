const ADD_NEW_LIST = 'addNewList'

export const addNewList = (name, list) => ({
    type: ADD_NEW_LIST,
    name,
    list
})

const initialState = []

export default function (state=initialState, action) {
    switch(action.type) {
        case ADD_NEW_LIST:
            console.log(action.name, action.list)
            return [...state, {
                name: action.name,
                date: Date.now(),
                list: action.list
            }]
        default:
            return state
    }
}