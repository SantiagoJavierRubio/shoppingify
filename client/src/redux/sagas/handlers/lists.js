import { call, put } from 'redux-saga/effects';
import { requestGetLists, requestGetListDetail, requestCreateList,
    requestGetActiveList, requestSetCheckedItem, requestSetCompletedList, requestSetCancelledList } from '../requests/lists';
import { setHistory, setFocus } from '../../ducks/listHistory';
import { setActiveList, resetList } from '../../ducks/itemList';
import { setUser } from '../../ducks/user';
import { setSessionErrorToast, setSavedListToast, setUndefinedErrorToast, setNoItemsToast, setCompletedListToast, setCancelledListToast } from '../../ducks/toasts';

export function* handleGetLists() {
    try{
        const response = yield call(requestGetLists)
        if(response[0]){
            yield put(setHistory(response));
        } else {
            yield put(setHistory([]));
        }
    } catch(err) {
        if(err.response.data.message === 'No user'){
            yield put(setUser(null))
            yield put(setSessionErrorToast())
            return;
        }
        yield put(setUndefinedErrorToast())
    }
}
export function* handleGetListDetail(action) {
    try{
        const response = yield call(requestGetListDetail, action.id)
        yield put(setFocus(response))
    } catch(err) {
        let errMsg = err.response.data.message
        if(errMsg === 'No user'){
            yield put(setUser(null))
            yield put(setSessionErrorToast())
            return
        }
        if(errMsg === 'No items on this list'){
            yield put(setFocus({error: errMsg}))
            yield put(setNoItemsToast())
            return
        }
        yield put(setUndefinedErrorToast())
    }
}
export function* handleCreateList(action) {
    try{
        yield call(requestCreateList, {name: action.name, products: action.products})
        yield handleGetLists();
        yield handleGetActiveList();
        yield put(setSavedListToast());
    } catch(err) {
        let errMsg = err.response.data.message
        if(errMsg === 'No user'){
            yield put(setSessionErrorToast())
            yield put(setUser(null))
            return
        }
        yield put(setUndefinedErrorToast(errMsg))
    }
}
export function* handleGetActiveList() {
    try{
        const response = yield call(requestGetActiveList)
        if(response.ID){
            const list = yield call(requestGetListDetail, response.ID)
            yield put(setActiveList(list))
        }
    } catch(err) {
        return
    }
}
export function* handleSetCheckedItem(action) {
    try {
        yield call(requestSetCheckedItem, { id: action.id, status: action.status ? 1 : 0 })
        yield handleGetActiveList();
    } catch(err) {
        let errMsg = err.response.data.message
        if(errMsg === 'No user'){
            yield put(setUser(null))
            yield put(setSessionErrorToast())
            return;
        }
        yield put(setUndefinedErrorToast(errMsg))
    }
}
export function* handleSetCompletedList() {
    try {
        yield call(requestSetCompletedList);
        yield put(resetList());
        yield handleGetActiveList();
        yield put(setCompletedListToast())
    } catch(err) {
        let errMsg = err.response.data.message
        if(errMsg === 'No user'){
            yield put(setUser(null))
            yield put(setSessionErrorToast())
            return
        }
        yield put(setUndefinedErrorToast(errMsg))
    }
}
export function* handleSetCancelledList() {
    try {
        yield call(requestSetCancelledList);
        yield put(resetList());
        yield handleGetActiveList();
        yield put(setCancelledListToast())
    } catch(err) {
        let errMsg = err.response.data.message
        if(errMsg === 'No user'){
            yield put(setUser(null))
            yield put(setSessionErrorToast())
            return
        }
        yield put(setUndefinedErrorToast(errMsg))
    }
}
