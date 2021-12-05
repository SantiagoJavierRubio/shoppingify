import './Menu.css';
import { MAIN_VIEWS } from '../../Main/Main';
import MenuItem from './MenuItem/MenuItem';

const Menu = () => {

    return(
        <>
        <div id="left-menu">
            <MenuItem value={MAIN_VIEWS.ITEMS} />
            <MenuItem value={MAIN_VIEWS.HISTORY} />
            <MenuItem value={MAIN_VIEWS.STATS} />
        </div>
        </>
    )
}

export default Menu;