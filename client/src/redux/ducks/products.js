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

export const deleteProduct = (productID) => ({
    type: DELETE_PRODUCT,
    productID
})

const initialState = []

export default function products(state=initialState, action) {
    switch(action.type){
        case SET_PRODUCTS:
            return [ ...action.products ]
        default:
            return state
    }
}