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
            <span className="material-icons">shopping_cart</span>
        </nav>
    )
}

export default Sidebar;