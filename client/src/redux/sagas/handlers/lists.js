import { call, put } from 'redux-saga/effects';
import { requestGetLists, requestGetListDetail, requestCreateList, requestDeleteList, requestGetActiveList } from '../requests/lists';
import { setHistory, setFocus } from '../../ducks/listHistory';
import { setActiveList } from '../../ducks/itemList';

export function* handleGetLists() {
    try{
        const response = yield call(requestGetLists)
        if(response[0]){
            yield put(setHistory(response));
        } else {
            yield put(setHistory([]));
        }
    } catch(err) {
        console.log(err)
    }
}

export function* handleGetListDetail(action) {
    try{
        const response = yield call(requestGetListDetail, action.id)
        yield put(setFocus(response))
    } catch(err) {
        let errMsg = err.response.data.message
        if(errMsg === 'No items on this list') yield put(setFocus({error: errMsg}))
    }
}

export function* handleCreateList(action) {
    try{
        yield call(requestCreateList, {name: action.name, products: action.products})
        yield handleGetLists();
    } catch(err) {
        console.log(err)
    }
}

export function* handleDeleteList(action) {
    try{
        yield call(requestDeleteList, action.id)
        yield handleGetLists();
    } catch(err) {
        console.log(err)
    }
}

export function* handleGetActiveList() {
    try{
        const response = yield call(requestGetActiveList)
        if(response.ID){
            const list = yield call(requestGetListDetail, response.ID)
            yield put(setActiveList(list))
        } else {
            yield put(setActiveList({name: null, products: []}))
        }
    } catch(err) {
        console.log(err)
    }
}