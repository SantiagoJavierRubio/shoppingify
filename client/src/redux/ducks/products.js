export const GET_PRODUCTS = 'getProducts';
export const SET_PRODUCTS = 'setProducts';
export const CREATE_PRODUCT = 'createProduct';
export const DELETE_PRODUCT = 'deleteProduct'

export const getProducts = () => ({
    type: GET_PRODUCTS
})

export const setProducts = (products) => ({
    type: SET_PRODUCTS,
    products
})

export const createProduct = (product) => ({
    type: CREATE_PRODUCT,
    product
})

export const deleteProduct = (id) => ({
    type: DELETE_PRODUCT,
    id
})

const initialState = []

export default function(state=initialState, action) {
    switch(action.type){
        case SET_PRODUCTS:
            return [ ...state, ...action.products ]
        default:
            return state
    }
}