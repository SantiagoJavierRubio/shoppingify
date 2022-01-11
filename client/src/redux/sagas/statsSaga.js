import { takeLatest } from 'redux-saga/effects';
import { handleGetStats } from './handlers/stats';
import { GET_STATS } from '../ducks/stats';

export function* statsSaga() {
    yield takeLatest(GET_STATS, handleGetStats)
}