import { call, put } from 'redux-saga/effects';
import { requestGetStats } from '../requests/stats';
import { setStats } from '../../ducks/stats';
import { setSessionErrorToast } from '../../ducks/toasts';
import { setUser } from '../../ducks/user';

export function* handleGetStats() {
    try {
        const response = yield call(requestGetStats);
        yield put(setStats(response))
    } catch(err) {
        let errMsg = err.response.data.message;
        if(errMsg === 'No user'){
            yield put(setSessionErrorToast())
            yield put(setUser(null))
            return
        }
    }
}