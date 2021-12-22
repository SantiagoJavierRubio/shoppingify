import { useSelector, useDispatch } from 'react-redux';
import { getLists } from '../../../redux/ducks/listHistory';
import { useEffect, useState } from 'react';
import HistoryItem from './HistoryItem/HistoryItem';
import './History.css'

const History = () => {

    const listHistory = useSelector((state) => state.history.listHistory)
    const dispatch = useDispatch()
    const [orderedLists, setOrderedLists] = useState([])
    const monthNames = ["January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
    ];

    useEffect(() => {
        dispatch(getLists())
    }, []);

    useEffect(()=> {
        const history = listHistory.map(list => {
            let date = new Date(list.date)
            return {...list, date: date};
        })
        history.sort((a,b) => {
            if(a.date < b.date) return 1
            return -1
        })
        const YEARS = [...new Set(history.map(l => l.date.getFullYear()))]
        const historyByYearsAndMonths = []
        YEARS.forEach(year => {
            for(let i=0; i<=11; i++){
                let entry = history.filter(list => list.date.getFullYear() === year && list.date.getMonth() === i)
                if(entry[0]) historyByYearsAndMonths.push(entry)
            }
        })
        setOrderedLists(historyByYearsAndMonths);
    }, [listHistory])

    return(
        <>
        <h2 id="history-title">Shopping history</h2>
        <div id="main-history">
            {orderedLists.map(month => {
                return(
                    <div className="historyMonth">
                        <p className="monthName">{monthNames[month[0].date.getMonth()] + ' ' + month[0].date.getFullYear()}</p>
                        <ul className="monthList">
                            {month.map(list => {
                                return(
                                    <li>
                                        <HistoryItem list={list} />
                                    </li>
                                )
                            })}
                        </ul>
                    </div>
                )
            })}
        </div>
        </>
    )
}

export default History;