
import Flicking from "@egjs/react-flicking";
import "@egjs/react-flicking/dist/flicking.css";
import './ForecastToday.scss';

export default function ForecastToday(props: any) {
        
    const renderHours = () => {
        const hourList = [];
        for(let i = 0; i < props.forecast.length; i++)
        {   
            let temp = props.forecast[i].temp_c;
            let hour = props.forecast[i].time.slice(-5, -3)
            let icon = "https:" + props.forecast[i].condition.icon;
            hourList.push(<article className="dayForecastHour" key={i}><p className="hour">{hour}</p><img src={icon}></img><p className="temp">{temp} &deg; C</p></article>)
        }
        return hourList;
    }



    return (
       
        <Flicking
        className="dayForecastContainer"
        align="prev"
        bound={true}
        deceleration={0.0005}
        circular={false}
        moveType='freeScroll'
        onMoveEnd={e => {
          console.log(e);
        }}>
                {renderHours()}

      </Flicking>

        )
}