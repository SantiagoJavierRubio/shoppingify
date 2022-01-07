import { MAIN_VIEWS } from "../../../Main/Main";
import { useDispatch, useSelector } from "react-redux";
import { setMainView } from '../../../../redux/ducks/views';
import './MenuItem.css';

const MenuItem = ({ value }) => {

    const dispatch = useDispatch()

    const view = useSelector((state) => state.views.mainView);

    const handleNavigation = () => {
        dispatch(setMainView(value))
    }

    return(
        <button onClick={handleNavigation} className="menuItem tooltip right">
            <div className={`menuIndicator ${value===view ? 'selectedMenu' : null}`}></div>
            <span className='tiptext'>{value===MAIN_VIEWS.STATS ? 'statistics' : value}</span>
            <span className="material-icons">
                { value === MAIN_VIEWS.ITEMS && 'list' }
                { value === MAIN_VIEWS.HISTORY && 'history' }
                { value === MAIN_VIEWS.STATS && 'insert_chart_outlined' }
            </span>
        </button>
    )
}

export default MenuItem;