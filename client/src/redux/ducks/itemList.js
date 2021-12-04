const ADD_ITEM = "addItem";
const REMOVE_ITEM = "removeItem";
const CHANGE_ITEM_QTY = "changeItemQuantity";

export const addItem = (item) => ({
    type: ADD_ITEM,
    item
})

export const removeItem = (itemID) => ({
    type: REMOVE_ITEM,
    itemID
})

export const changeItemQuantity = (itemID, sum) => ({
    type: CHANGE_ITEM_QTY,
    itemID,
    sum
})

const initialState = {
    shoppingList: []
}

export default (state = initialState, action) => {
    let newList
    switch(action.type) {
        case ADD_ITEM:
            if(state.shoppingList.find(item => item.id === action.item.id)){
                newList = state.shoppingList.map(i => {
                    if(i.id === action.item.id) return { ...i, ammount: i.ammount + 1 }
                    return i
                })
            } else {
                newList = [...state.shoppingList, {...action.item, ammount: 1}]
            }
            return { ...state, shoppingList: newList }

        case REMOVE_ITEM:
            newList = state.shoppingList.filter(item => item.id !== action.itemID)
            return { ...state, shoppingList: newList }

        case CHANGE_ITEM_QTY:
            newList = state.shoppingList.map(item => {
                if(item.id === action.itemID) return { ...item, ammount: item.ammount + action.sum }
                return item
            })
            return { ...state, shoppingList: newList }

        default:
            return state;
    }
}