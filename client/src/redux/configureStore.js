import { combineReducers, createStore } from 'redux';
import itemList from './ducks/itemList';
import views from './ducks/views';
import listHistory from './ducks/listHistory';

const reducer = combineReducers({
    items: itemList,
    views,
    listHistory
});


const store = createStore(reducer);

export default store;