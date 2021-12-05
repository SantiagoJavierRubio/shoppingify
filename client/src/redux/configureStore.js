import { combineReducers, createStore } from 'redux';
import itemList from './ducks/itemList';
import views from './ducks/views';

const reducer = combineReducers({
    items: itemList,
    views
});


const store = createStore(reducer);

export default store;