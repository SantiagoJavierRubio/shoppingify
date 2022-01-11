import './TopDisplay.css'

const TopDisplay = ({ topList, color }) => {

    const listStyles = {}

    topList.forEach(element => {
        listStyles[element.name] = {
            width: `${element.percentage}%`
        }
    })

    return(
        <ul className="topThreeList">
            {topList.map(item => {
                return(
                    <li key={item.name}>
                        <div className="topThreeText">
                            <p className="topName">{item.name}</p>
                            <p className="topPercentage">{item.percentage}%</p>
                        </div>
                        <div className="percentageBarBack">
                            <div className={`percentageBarFront ${color}`} style={listStyles[item.name]}/>
                        </div>
                    </li>
                )
            })}
        </ul>
    )
}

export default TopDisplay