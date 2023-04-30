import './UpcomingForecast.scss'

export default function UpcomingForecast(props: any) {

    const renderForecast = () => {
        const dayList = []; //List containing the upcoming weekdays (e.g. Tomorrow, Monday, Tuesday) 
        const iconList = []; //List containing icons for the days
        const tempList = []; //List containing temperatures for the days
        const forecastList = []; //List containing the entire forecast that is to be rendered
        let unit = "";
        props.isCelsius ? unit = "°C" : unit = "°F"; //Decide unit
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
                //Get day of week
                let timestamp = props.upcomingForecast[i].date_epoch;
                let time = new Date(timestamp*1000);
                var days = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
                dayOfWeek = days[time.getDay()];
            }
            let low = ""; //Daily low temp
            let high = ""; //Daily high temp
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
            //Populate lists
            dayList.push(<p key={i}>{dayOfWeek}</p>)
            iconList.push(<img key={i} src={icon}></img>)
            tempList.push(<p key={i}>{high}{unit} / {low}{unit}</p>)
        }
        //List to be rendered
        forecastList.push(<div key={'forecast'} className="forecast"><div key={'daysOfWeek'} className="daysOfWeek">{dayList}</div> <div key={'icons'} className="icons">{iconList}</div><div key={'temps'} className="temps">{tempList}</div></div>)
        return forecastList;
    }


    return (
       
        <section
        className="dayContainer"
        >
            
                {renderForecast()} 
          
            

      </section>

        )
}