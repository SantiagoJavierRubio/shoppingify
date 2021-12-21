import { call, put } from 'redux-saga/effects';
import { requestGetLists, requestGetListDetail, requestCreateList, requestDeleteList } from '../requests/lists';
import { setHistory, setActive } from '../../ducks/listHistory';

export function* handleGetLists() {
    try{
        const response = yield call(requestGetLists)
        yield put(setHistory(response))
    } catch(err) {
        console.log(err)
    }
}

export function* handleGetListDetail(action) {
    try{
        const response = yield call(requestGetListDetail, action.id)
        yield put(setActive(response))
    } catch(err) {
        console.log(err)
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