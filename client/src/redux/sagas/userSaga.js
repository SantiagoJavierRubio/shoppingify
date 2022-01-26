import { takeLatest } from 'redux-saga/effects';
import { handleLogUser, handleCheckUser, handleLogOut, handleRegisterUser } from './handlers/user';
import { LOG_USER, CHECK_USER, LOGOUT_USER, REGISTER_USER } from '../ducks/user';

export function* userSaga() {
    yield takeLatest(LOG_USER, handleLogUser)
    yield takeLatest(REGISTER_USER, handleRegisterUser)
    yield takeLatest(CHECK_USER, handleCheckUser)
    yield takeLatest(LOGOUT_USER, handleLogOut)
}