import { combineReducers, createStore } from 'redux';
import itemList from './ducks/itemList';

const reducer = combineReducers({
    items: itemList
});


const store = createStore(reducer);

export default store;