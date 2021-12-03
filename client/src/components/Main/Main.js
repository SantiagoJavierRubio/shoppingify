import { useState } from 'react';

import Stats from './Stats/Stats';
import Items from './Items/Items';
import History from './History/History';

const Main = () => {

    const [view, setView] = useState('items');

    return(
        <main id="main-section">
            {view === 'items' ? <Items /> : null}
            {view === 'history' ? <History /> : null}
            {view === 'stats' ? <Stats /> : null}
        </main>
    )
}

export default Main;