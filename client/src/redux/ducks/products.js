export const GET_PRODUCTS = 'getProducts';
export const SET_PRODUCTS = 'setProducts';
export const CREATE_PRODUCT = 'createProduct';
export const DELETE_PRODUCT = 'deleteProduct'

export const getProducts = () => ({
    type: GET_PRODUCTS
})

export const setProducts = () => ({
    type: SET_PRODUCTS
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
            const { products } = action;
            return [ ...state, products ]
        default:
            return state
    }
}