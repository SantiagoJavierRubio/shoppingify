import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import './Graph.css';


const Graph = ({ monthlyData }) => {

    if(monthlyData) return(
        <div className='mainGraphContainer'>
            <ResponsiveContainer width='100%'>
                <LineChart
                width={500}
                height={300}
                className='lineChartCustom'
                data={monthlyData}
                margin={{
                    top: 5,
                    right: 5,
                    left: 5,
                    bottom: 5,
                }}
                >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="monthName" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="itemQuantity" name='Items' stroke="#F9A109" activeDot={{ r: 8 }} />
                </LineChart>
            </ResponsiveContainer>
      </div>
    )
    return <></>
}

export default Graph