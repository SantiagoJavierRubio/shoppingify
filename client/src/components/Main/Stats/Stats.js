import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getStats } from '../../../redux/ducks/stats';
import TopDisplay from './TopDisplay/TopDisplay';
import Graph from './Graph/Graph';
import './Stats.css';

const Stats = () => {

    const dispatch = useDispatch();

    const stats = useSelector((state) => state.stats.stats);
    
    const [topItems, setTopItems] = useState([])
    const [topCategories, setTopCategories] = useState([])

    useEffect(() => {
        dispatch(getStats())
    }, [])

    const prepareTopThree = (arr) => {
        let total = stats.totalAmmount
        let topThree = arr.slice(0, 3)
        return topThree.map(el => {
            return { ...el, percentage: Math.round((el.ammount/total)*100) }
        })
    }

    useEffect(() => {
        if(!stats) return
        const newItems = prepareTopThree(stats.topItems);
        const newCategories = prepareTopThree(stats.topCategories)
        setTopItems(newItems)
        setTopCategories(newCategories)
    }, [stats])

    return(
        <>
        <div id="top-three-main">
            <div className='topThreeSection'>
                <h4>Top items</h4>
                <TopDisplay topList={topItems} color="primary" />
            </div>
            <div className='topThreeSection'>
                <h4>Top categories</h4>
                <TopDisplay topList={topCategories} color="secondary" />
            </div>
        </div>
        <div id="monthly-summary">
            <h4>Monthly Summary</h4>
            <Graph monthlyData={stats.monthlyItems} />
        </div>
        </>
    )
}

export default Stats;