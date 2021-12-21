import { all } from 'redux-saga/effects';
import { userSaga } from './userSaga';
import { productsSaga } from './productsSaga';
import { listsSaga } from './listsSaga';

export function* watcherSaga(){
    yield all([
        userSaga(),
        productsSaga(),
        listsSaga()
    ])
}