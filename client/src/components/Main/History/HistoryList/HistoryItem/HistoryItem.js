import { useDispatch } from 'react-redux';
import { getListDetail } from '../../../../../redux/ducks/listHistory';
import './HistoryItem.css'

const HistoryItem = ({ list }) => {

    const dispatch = useDispatch();
    const date = new Date(list.date);
    const dayNames = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

    const handleHistoryFocus = () => {
        dispatch(getListDetail(list.ID));
    }

    return(
        <div className="historyItem" onClick={handleHistoryFocus}>
            <p>{list.name}</p>
            <div className="historyItemActions">
                <div className="historyDate"><span className="material-icons">event_note</span>{`${dayNames[date.getDay()]} ${date.getMonth()+1}.${date.getDate()}.${date.getFullYear()}`}</div>
                <div className={`historyItemState ${list.state}`}>{list.state}</div>
                <span className="material-icons rightArrow">chevron_right</span>
            </div>
        </div>
    )
}

export default HistoryItem