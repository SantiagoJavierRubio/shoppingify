import { useDispatch, useSelector } from 'react-redux';
import { logOutUser } from '../../redux/ducks/user';
import { toggleEditMode } from '../../redux/ducks/views';
import { ReactComponent as Logo } from './logo.svg'
import Menu from './Menu/Menu';
import './Sidebar.css';

const Sidebar = () => {

    const isEditing = useSelector((state) => state.views.editMode)
    const dispatch = useDispatch();
    
    const handleLogOut = () => {
        dispatch(logOutUser());
    }
    const handleToggleEdit = () => {
        dispatch(toggleEditMode());
    }
    return(
        <nav id="nav-bar">
            <Logo className="mainLogo" onClick={handleLogOut}/>
            <Menu />
            <button onClick={handleToggleEdit} id="toggle-edit-button" className={`toggleEditButton tooltip top ${isEditing ? 'editing' : 'notEditing'}`}>
                <span id="edit-tooltip" className='tiptext'>{isEditing ? 'Switch to edit mode' : 'Switch to shop mode'}</span>
                <div id="shopping-cart-logo">
                    <span className="material-icons">shopping_cart</span>
                </div>
                <div id="edit-list-logo">
                    <span className="material-icons">edit</span>
                </div>
            </button>
        </nav>
    )
}

export default Sidebar;