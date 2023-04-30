
import Flicking from "@egjs/react-flicking";
import "@egjs/react-flicking/dist/flicking.css";
import './ForecastToday.scss';

export default function ForecastToday(props: any) {

  

    console.log = function(){}; //Override console.log

        
    const renderHours = () => {
        const hourList = [];
        let unit = ""
        let temp = "";
        props.isCelsius ? unit = "°C" : unit = "°F"; //Check which unit to use
        for(let i = 0; i < props.forecast.length; i++)
        {   
            //Assign
            props.isCelsius ? temp = props.forecast[i].temp_c
            :
            temp = props.forecast[i].temp_f;

            //
            let hour = props.forecast[i].time.slice(-5, -3) //Get whole hour
            let icon = "https:" + props.forecast[i].condition.icon;

            //Elements to render
            hourList.push(<article className="dayForecastHour" key={i}><p className="hour">{hour}</p><img src={icon}></img><p className="temp">{temp}{unit}</p></article>)
        }
        return hourList;
    }



    return (
       
     
        <Flicking
        className="dayForecastContainer"
        align="prev"
        bound={true}
        deceleration={0.001}
        circular={false}
        moveType='freeScroll'
        onMoveEnd={e => {
          console.log(e); //Overridden 
        }}>
                {renderHours()}

      </Flicking>

        )
}