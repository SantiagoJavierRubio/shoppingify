import AddItem from './AddItem/AddItem';
import List from './List/List';
import './Menu.css';

const Menu = () => {
    return(
        <div className="right-menu">
            <AddItem />
            <List />
        </div>
    )
}

export default Menu;