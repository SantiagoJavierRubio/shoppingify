// redux saga imports
import { combineReducers, createStore, applyMiddleware, compose } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { watcherSaga } from './sagas/rootSaga';
// redux-persist imports
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
// reducers
import itemList from './ducks/itemList';
import views from './ducks/views';
import listHistory from './ducks/listHistory';
import user from './ducks/user';
import products from './ducks/products';
import toasts from './ducks/toasts';

const persistConfig = {
    key: 'root',
    storage,
    whitelist: ['items']
}

const rootReducer = combineReducers({
    items: itemList,
    views,
    history: listHistory,
    user,
    products,
    toasts
});

const reducer = persistReducer(persistConfig, rootReducer);



const sagaMiddleware = createSagaMiddleware();
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(reducer, {}, composeEnhancers(applyMiddleware(sagaMiddleware)));

sagaMiddleware.run(watcherSaga);

const persistor = persistStore(store)

export { store, persistor };