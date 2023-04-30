import './DayInfo.scss'

export default function DayInfo(props: any) {

        //Convert 12h time to 24h
    const getTwentyFourHourTime = (time: string) => {
        let date = new Date("1/1/1970 " + time);
        let hour = ""
        if(date.getHours() < 10)
        {
            hour = "0" + date.getHours()
        }
        else 
        {
            hour = date.getHours().toString();
        }
        return hour + ':' + date.getMinutes(); 
    }



    return (

        <section className="dayInfo">
            {props.isCelsius ? 
                <h2>Feels like: {props.currentWeather.current.feelslike_c}&deg;C</h2>
                :
                <h2>Feels like: {props.currentWeather.current.feelslike_f}&deg;F</h2>
            }
            <h2>Precipitation: {props.currentWeather.current.precip_mm} mm</h2>
            <h2>UV Index: {props.currentWeather.current.uv}</h2>
            <h2>Pressure: {props.currentWeather.current.pressure_mb / 1000} hPa</h2>
            <h2>Wind: {Math.round(props.currentWeather.current.wind_kph * 5/18)} m/s {props.currentWeather.current.wind_dir}</h2>
            <h2>Humidity: {props.currentWeather.current.humidity}%</h2>
            <h2>Sunrise: {getTwentyFourHourTime(props.astroToday.sunrise)}</h2>
            <h2>Sunset: {getTwentyFourHourTime(props.astroToday.sunset)}</h2>
        </section>
    )
}