import { useEffect } from 'react';
import axios from '../../../axiosConfig';

const Stats = () => {

    useEffect(() => {
        axios.get('/stats')
    }, [])

    return(
        <>
        <div>
            <div>
                <h4>Top items</h4>
                {/* Data */}
            </div>
            <div>
                <h4>Top categories</h4>
                {/* Data */}
            </div>
        </div>
        <div>
            <h4>Monthly Summary</h4>
            {/* GRAPH */}
        </div>
        </>
    )
}

export default Stats;