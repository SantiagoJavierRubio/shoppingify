import { useSelector, useDispatch } from 'react-redux';
import { getProducts } from '../../redux/ducks/products';
import { useEffect } from 'react';
import Stats from './Stats/Stats';
import Items from './Items/Items';
import History from './History/History';
import './Main.css';

export const MAIN_VIEWS = {
    ITEMS: 'items',
    HISTORY: 'history',
    STATS: 'stats'
}

const Main = () => {
    
    const dispatch = useDispatch();
    const view = useSelector((state) => state.views.mainView);

    useEffect(()=> {
        dispatch(getProducts());
    }, [])


    return(
        <main id="main-section">
            {view === MAIN_VIEWS.ITEMS ? <Items /> : null}
            {view === MAIN_VIEWS.HISTORY ? <History /> : null}
            {view === MAIN_VIEWS.STATS ? <Stats /> : null}
        </main>
    )
}

export default Main;