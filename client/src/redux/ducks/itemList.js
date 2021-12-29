import { addItemToCart, removeItemFromCart, itemAddOrSubstract } from "./itemFunctions";

const ADD_ITEM = "addItem";
const REMOVE_ITEM = "removeItem";
const CHANGE_ITEM_QTY = "changeItemQuantity";
const SET_ACTIVE_LIST = "setActiveList"
export const GET_ACTIVE_LIST = "getActiveList"

export const addItem = (item) => ({
    type: ADD_ITEM,
    item
})

export const removeItem = (item) => ({
    type: REMOVE_ITEM,
    item
})

export const changeItemQuantity = (item, sum) => ({
    type: CHANGE_ITEM_QTY,
    item,
    sum
})
export const setActiveList = (listData) => ({
    type: SET_ACTIVE_LIST,
    products: listData.products,
    name: listData.name
})
export const getActiveList = () => ({
    type: GET_ACTIVE_LIST
})

const initialState = {
    name: null,
    shoppingList: []
}

export default function itemList(state = initialState, action) {
    let newList
    switch(action.type) {
        case ADD_ITEM:
            newList = addItemToCart(state, action.item);
            return { ...state, shoppingList: newList }

        case REMOVE_ITEM:
            newList = removeItemFromCart(state, action.item)
            return { ...state, shoppingList: newList }

        case CHANGE_ITEM_QTY:
            newList = itemAddOrSubstract(state, action.item, action.sum)
            return { ...state, shoppingList: newList }

        case SET_ACTIVE_LIST:
            return { ...state, shoppingList: action.products, name: action.name }
        default:
            return state;
    }
}