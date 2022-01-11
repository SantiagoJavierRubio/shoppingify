import { all } from 'redux-saga/effects';
import { userSaga } from './userSaga';
import { productsSaga } from './productsSaga';
import { listsSaga } from './listsSaga';
import { statsSaga } from './statsSaga'

export function* watcherSaga(){
    yield all([
        userSaga(),
        productsSaga(),
        listsSaga(),
        statsSaga()
    ])
}