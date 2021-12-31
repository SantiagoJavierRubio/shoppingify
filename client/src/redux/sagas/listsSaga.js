import { takeLatest } from 'redux-saga/effects';
import { handleCreateList, handleGetLists, handleGetListDetail,
    handleGetActiveList, handleSetCheckedItem, handleSetCompletedList } from './handlers/lists';
import { GET_LISTS, GET_LIST_DETAIL, CREATE_LIST } from '../ducks/listHistory';
import { GET_ACTIVE_LIST, SET_CHECKED_ITEM, COMPLETE_LIST } from '../ducks/itemList';

export function* listsSaga() {
    yield takeLatest(GET_LISTS, handleGetLists)
    yield takeLatest(CREATE_LIST, handleCreateList)
    yield takeLatest(GET_LIST_DETAIL, handleGetListDetail)
    yield takeLatest(GET_ACTIVE_LIST, handleGetActiveList)
    yield takeLatest(SET_CHECKED_ITEM, handleSetCheckedItem)
    yield takeLatest(COMPLETE_LIST, handleSetCompletedList)
}