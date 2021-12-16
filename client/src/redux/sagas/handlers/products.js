import { call, put } from 'redux-saga/effects';
import { requestGetProducts } from '../requests/products';
import { setProducts } from '../../ducks/products';

export function* handleGetProducts() {
    try{
        const response = yield call(requestGetProducts())
        yield put(setProducts(response))
    } catch(err) {
        console.log(err)
    }
}