import { call, put } from 'redux-saga/effects';
import { requestLogUser, requestCheckUser, requestLogOut } from '../requests/user';
import { setUser } from '../../ducks/user';

export function* handleLogUser(action) {
    try {
        const response = yield call(requestLogUser, action);
        yield put(setUser(response))
    } catch(err) {
        console.log(err)
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