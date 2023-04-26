import Flicking from "@egjs/react-flicking";
import "@egjs/react-flicking/dist/flicking.css";
import './UpcomingForecast.scss'

export default function UpcomingForecast(props: any) {

    const renderForecast = () => {
        const dayList = [];
        for(let i = 0; i < props.upcomingForecast.length; i++)
        {   
            let dayOfWeek = "";
            if(i == 0)
            {
                 dayOfWeek = "Tomorrow";
            }
            else
            {
                let timestamp = props.upcomingForecast[i].date_epoch;
                console.log(timestamp)
                let time = new Date(timestamp*1000);
                var days = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
                console.log(time)
                console.log(time.getDay());
                dayOfWeek = days[time.getDay()];
            }

            let low = props.upcomingForecast[i].day.mintemp_c;
            let high = props.upcomingForecast[i].day.maxtemp_c;
            let icon = "https:" + props.upcomingForecast[i].day.condition.icon;
            dayList.push(<article className="dayItem" key={i}><p>{dayOfWeek}</p><img src={icon}></img><p>{high} &deg; C / {low} &deg; C</p></article>)
        }
        return dayList;
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