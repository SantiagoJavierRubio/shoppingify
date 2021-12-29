import { takeLatest } from 'redux-saga/effects';
import { handleCreateList, handleDeleteList, handleGetLists, handleGetListDetail, handleGetActiveList } from './handlers/lists';
import { GET_LISTS, GET_LIST_DETAIL, CREATE_LIST, DELETE_LIST } from '../ducks/listHistory';
import { GET_ACTIVE_LIST } from '../ducks/itemList';

export function* listsSaga() {
    yield takeLatest(GET_LISTS, handleGetLists)
    yield takeLatest(CREATE_LIST, handleCreateList)
    yield takeLatest(DELETE_LIST, handleDeleteList)
    yield takeLatest(GET_LIST_DETAIL, handleGetListDetail)
    yield takeLatest(GET_ACTIVE_LIST, handleGetActiveList)
}