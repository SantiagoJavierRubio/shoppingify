import { useDispatch } from 'react-redux';
import { logOutUser } from '../../redux/ducks/user';
import { ReactComponent as Logo } from './logo.svg'
import Menu from './Menu/Menu';
import './Sidebar.css';

const Sidebar = () => {

    const dispatch = useDispatch();

    const handleLogOut = () => {
        dispatch(logOutUser());
    }
    return(
        <nav id="nav-bar">
            <Logo className="mainLogo" onClick={handleLogOut}/>
            <Menu />
            <div id="shopping-cart-logo">
                <span className="material-icons">shopping_cart</span>
            </div>
        </nav>
    )
}

export default Sidebar;