import { takeLatest } from 'redux-saga/effects';
import { handleLogUser, handleCheckUser, handleLogOut } from './handlers/user';
import { LOG_USER, CHECK_USER, LOGOUT_USER } from '../ducks/user';

export function* watcherSaga() {
    yield takeLatest(LOG_USER, handleLogUser)
    yield takeLatest(CHECK_USER, handleCheckUser)
    yield takeLatest(LOGOUT_USER, handleLogOut)
}