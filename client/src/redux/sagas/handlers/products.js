import { call, put } from 'redux-saga/effects';
import { requestGetProducts, requestCreateProduct, requestDeleteProduct } from '../requests/products';
import { setProducts } from '../../ducks/products';

export function* handleGetProducts() {
    try{
        const response = yield call(requestGetProducts)
        yield put(setProducts(response))
    } catch(err) {
        console.log(err)
    }
}

export function* handleCreateProduct(action) {
    try{
        yield call(requestCreateProduct, action.product)
        yield handleGetProducts();
    } catch(err) {
        console.log(err)
    }
}

export function* handleDeleteProduct(action) {
    try{
        yield call(requestDeleteProduct, action.productID)
        yield handleGetProducts();
    } catch(err) {
        console.log(err)
    }
}