import { useSelector } from 'react-redux';
import Menu from './Menu/Menu';
import AddForm  from './AddForm/AddForm';
import Details from './Details/Details';
import './Right.css';

const Right = () => {

    const view = useSelector((state) => state.views.rightView);

    return(
        <aside id="right-menu">
            {view === 'menu' ?
                <Menu />
            : null
            }
            {view === 'add' ?
                <AddForm />
            : null
            }
            {view === 'details' ?
                <Details />
            : null
            }
        </aside>
    )
}

export default Right;