import { useSelector } from 'react-redux';
import Stats from './Stats/Stats';
import Items from './Items/Items';
import History from './History/History';

export const MAIN_VIEWS = {
    ITEMS: 'items',
    HISTORY: 'history',
    STATS: 'stats'
}

const Main = () => {

    const view = useSelector((state) => state.views.view);

    return(
        <main id="main-section">
            {view === MAIN_VIEWS.ITEMS ? <Items /> : null}
            {view === MAIN_VIEWS.HISTORY ? <History /> : null}
            {view === MAIN_VIEWS.STATS ? <Stats /> : null}
        </main>
    )
}

export default Main;