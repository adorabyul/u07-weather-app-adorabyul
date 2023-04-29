import Flicking from "@egjs/react-flicking";
import "@egjs/react-flicking/dist/flicking.css";
import './UpcomingForecast.scss'

export default function UpcomingForecast(props: any) {

    const renderForecast = () => {
        const dayList = [];
        const iconList = [];
        const tempList = [];
        const forecastList = [];
        let unit = "";
        props.isCelsius ? unit = "°C" : unit = "°F";
        for(let i = 0; i < props.upcomingForecast.length; i++)
        {   
            let dayOfWeek = "";
            if(i == 0)
            {
                 dayOfWeek = "Today";
            }
            else if(i == 1)
            {
                dayOfWeek = "Tomorrow"
            }
            else
            {
                let timestamp = props.upcomingForecast[i].date_epoch;
                let time = new Date(timestamp*1000);
                var days = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
                dayOfWeek = days[time.getDay()];
            }
            let low = "";
            let high = "";
            if(props.isCelsius === true)
            {
                low = props.upcomingForecast[i].day.mintemp_c;
                high = props.upcomingForecast[i].day.maxtemp_c;
            }
            else
            {
                low = props.upcomingForecast[i].day.mintemp_f;
            high = props.upcomingForecast[i].day.maxtemp_f;
            }
            
            let icon = "https:" + props.upcomingForecast[i].day.condition.icon;
            dayList.push(<p key={i}>{dayOfWeek}</p>)
            iconList.push(<img key={i} src={icon}></img>)
            tempList.push(<p key={i}>{high}{unit} / {low}{unit}</p>)
        }
        forecastList.push(<div className="forecast"><div className="daysOfWeek">{dayList}</div> <div className="icons">{iconList}</div><div className="temps">{tempList}</div></div>)
        return forecastList;
    }


    return (
       
        <Flicking
        className="dayContainer"
        align="prev"
        bound={true}
        deceleration={0.0005}
        circular={false}
        horizontal={false}
        moveType='freeScroll'
        onMoveEnd={e => {
          console.log(e);
        }}>
            {renderForecast()}

      </Flicking>

        )
}