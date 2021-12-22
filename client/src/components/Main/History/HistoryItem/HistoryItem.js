import './HistoryItem.css'

const HistoryItem = ({ list }) => {

    const date = new Date(list.date);
    const dayNames = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']

    return(
        <div className="historyItem">
            <p>{list.name}</p>
            <div className="historyItemActions">
                <div className="historyItemDate"><span className="material-icons">event_note</span>{`${dayNames[date.getDay()]} ${date.getMonth()+1}.${date.getDate()}.${date.getFullYear()}`}</div>
                <div className={`historyItemState ${list.state}`}>{list.state}</div>
                <span className="material-icons rightArrow">chevron_right</span>
            </div>
        </div>
    )
}

export default HistoryItem