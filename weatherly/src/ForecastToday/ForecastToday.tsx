import './ForecastToday.scss' 

export default function ForecastToday(props: any) {
        
    const renderHours = () => {
        const hourList = [];
        for(let i = 0; i < props.forecast.length; i++)
        {
            let temp = props.forecast[i].temp_c;
            let hour = props.forecast[i].time.slice(-5, -3)
            let icon = "https:" + props.forecast[i].condition.icon;
            hourList.push(<li className="dayForecastHour" key={i}><article ><p className="hour">{hour}</p><img src={icon}></img><p className="temp">{temp} &deg; C</p></article></li>)
        }
        return hourList;
    }



    return (
        <div className="dayForecastContainer">
            <ul className="dayForecastList">
                {renderHours()}
            </ul>
            
        </div>
        

        )
}