import { combineReducers, createStore, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';
import itemList from './ducks/itemList';
import views from './ducks/views';
import listHistory from './ducks/listHistory';
import user from './ducks/user';
import products from './ducks/products';
import { watcherSaga } from './sagas/rootSaga';

const reducer = combineReducers({
    items: itemList,
    views,
    history: listHistory,
    user,
    products
});


const sagaMiddleware = createSagaMiddleware();

const store = createStore(reducer, {}, applyMiddleware(sagaMiddleware));

sagaMiddleware.run(watcherSaga);

export default store;