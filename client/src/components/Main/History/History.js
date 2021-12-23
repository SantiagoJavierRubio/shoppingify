import { useSelector } from 'react-redux';
import HistoryList from './HistoryList/HistoryList'
import ListDetails from './ListDetails/ListDetails';
import './History.css'

const History = () => {

    const focus = useSelector((state) => state.history.listFocus)

    return(
        <div id="main-history">
            {focus ? <ListDetails /> : <HistoryList />}
        </div>
    )
}

export default History;