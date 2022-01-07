import { call, put } from 'redux-saga/effects';
import { requestGetProducts, requestCreateProduct, requestDeleteProduct } from '../requests/products';
import { setProducts } from '../../ducks/products';
import { setSavedItemToast, setUndefinedErrorToast, setSessionErrorToast } from '../../ducks/toasts';
import { setUser } from '../../ducks/user';

export function* handleGetProducts() {
    try{
        const response = yield call(requestGetProducts)
        yield put(setProducts(response))
    } catch(err) {
        let errMsg = err.response.data.message;
        if(errMsg === 'No user'){
            yield put(setSessionErrorToast())
            yield put(setUser(null))
            return
        }
        yield put(setUndefinedErrorToast(errMsg))
    }
}

export function* handleCreateProduct(action) {
    try{
        yield call(requestCreateProduct, action.product)
        yield handleGetProducts();
        yield put(setSavedItemToast())
    } catch(err) {
        let errMsg = err.response.data.message;
        if(errMsg === 'No user'){
            yield put(setSessionErrorToast())
            yield put(setUser(null))
            return
        }
        yield put(setUndefinedErrorToast(errMsg))
    }
}

export function* handleDeleteProduct(action) {
    try{
        yield call(requestDeleteProduct, action.productID)
        yield handleGetProducts();
    } catch(err) {
        let errMsg = err.response.data.message;
        if(errMsg === 'No user'){
            yield put(setSessionErrorToast())
            yield put(setUser(null))
            return
        }
        yield put(setUndefinedErrorToast(errMsg))
    }
}