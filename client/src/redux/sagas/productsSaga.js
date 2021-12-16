import { takeLatest } from 'redux-saga/effects';
import { handleGetProducts } from './handlers/products';
import { GET_PRODUCTS } from '../ducks/products';

export function* productsSaga() {
    yield takeLatest(GET_PRODUCTS, handleGetProducts)
}