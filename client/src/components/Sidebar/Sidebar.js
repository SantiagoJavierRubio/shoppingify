import { ReactComponent as Logo } from './logo.svg'
import Menu from './Menu/Menu';
import './Sidebar.css';

const Sidebar = () => {

    return(
        <nav id="nav-bar">
            <Logo className="mainLogo" />
            <Menu />
            <span className="material-icons">shopping_cart</span>
        </nav>
    )
}

export default Sidebar;