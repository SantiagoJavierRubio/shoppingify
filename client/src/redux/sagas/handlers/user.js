import { call, put } from 'redux-saga/effects';
import { requestLogUser, requestCheckUser, requestLogOut, requestRegisterUser } from '../requests/user';
import { setUser } from '../../ducks/user';
import { setUndefinedErrorToast, userRegisteredToast } from '../../ducks/toasts';

export function* handleLogUser(action) {
    try {
        const response = yield call(requestLogUser, action);
        yield put(setUser(response))
    } catch(err) {
        let errMsg = err.response.data.message;
        yield put(setUndefinedErrorToast(errMsg))
    }
}

export function* handleRegisterUser(action) {
    try {
        yield call(requestRegisterUser, action);
        yield put(userRegisteredToast())
    } catch (err) {
        let errMsg = err.response.data.message;
        yield put(setUndefinedErrorToast(errMsg))
    }
}

export function* handleCheckUser() {
    try{
        const response = yield call(requestCheckUser);
        if(response) yield put(setUser(response))
    } catch(err) {
        console.log(err)
    }
}

export function* handleLogOut() {
    try{
        yield call(requestLogOut);
        yield put(setUser(null))
    } catch(err) {
        console.log(err)
    }
}