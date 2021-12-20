import { takeLatest, takeEvery } from 'redux-saga/effects';
import { handleCreateProduct, handleDeleteProduct, handleGetProducts } from './handlers/products';
import { GET_PRODUCTS, CREATE_PRODUCT, DELETE_PRODUCT } from '../ducks/products';

export function* productsSaga() {
    yield takeLatest(GET_PRODUCTS, handleGetProducts)
    yield takeLatest(CREATE_PRODUCT, handleCreateProduct)
    yield takeLatest(DELETE_PRODUCT, handleDeleteProduct)
}