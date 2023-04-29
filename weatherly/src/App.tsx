import { useEffect, useState } from 'react'
import './App.scss'
import Today from './today/Today'
import ForecastToday from './ForecastToday/ForecastToday'
import UpcomingForecast from './UpcomingForecast/UpcomingForecast'


function App() {

  const URL = 'https://api.weatherapi.com/v1/';
  const apiKey = import.meta.env.VITE_API_KEY;

  const [currentWeather, setCurrentWeather] = useState(undefined);
  const [forecast, setForecast] = useState([{}]);
  const [upcomingForecast, setUpcomingForecast] = useState([{}]);
  const [status, setStatus] = useState("")
  const [position, setPosition] = useState({lat: 37.532600, lng: 127.024612})



  const getCurrentWeather = async () => {
      const response = await fetch(URL + 'current.json?key=' + apiKey + '&q=' + position.lat + ',' + position.lng);
      const result = await response.json();
      setCurrentWeather(result);
  }

  const getForecast = async () => {
    const response = await fetch(URL + 'forecast.json?key=' + apiKey + '&q=' + position.lat + ',' + position.lng + '&days=6')
    const result = await response.json();
    
    const dayOneHours = result.forecast.forecastday[0].hour;
    const dayTwoHours = result.forecast.forecastday[1].hour;

    const upcomingDays : {}[] = [];
    const currentTime = Date.now();
    const hoursToDisplay : {}[] = [];

   

    for(let n = 1; n < result.forecast.forecastday.length; n++)
    {
      upcomingDays.push(result.forecast.forecastday[n])
    }

    let j = 0;
    for(let i = 0; i < dayOneHours.length; i++)
    {
      if(dayOneHours[i].time_epoch > currentTime/1000)
      {
        hoursToDisplay[j] = dayOneHours[i];
        j++;
        
      }
    }
    for(let k = 0; k < dayTwoHours.length; k++)
    {
      if(dayTwoHours[k].time_epoch > currentTime/1000 && dayTwoHours[k].time_epoch < currentTime/1000 + 86400) // 86400 == number of seconds in 24 hours
      {
        hoursToDisplay.push(dayTwoHours[k])
        
      }
    }

    setForecast(hoursToDisplay); //Here hoursToDisplay == the next 24 hours
    setUpcomingForecast(upcomingDays);
  }


  const getLocation = () => {
    !navigator.geolocation ? setStatus("Geolocation is not supported on your browser")
    : setStatus("Loading...");

    navigator.geolocation.getCurrentPosition((pos) => {
        setStatus("Success");
        setPosition({lat: pos.coords.latitude, lng: pos.coords.longitude});

    },
    () => {
        setStatus("Unable to retrieve your position")
    }
    );
}

  useEffect(() => {
    getLocation();

  }, []); 

  useEffect(() => {
    getCurrentWeather()
    getForecast();
    
  }, [position]); 

  
  return (
    <div className="App">
      <h1 className="title">Weatherly</h1>
      <div className="container">

        {status == "Success" ? currentWeather && (<Today currentWeather={currentWeather}></Today>)
        :
        <h2>{status}</h2>
        }
        {status == "Success" && forecast.length > 0 ? <ForecastToday forecast={forecast}></ForecastToday>
        :
        <></>
        }
        {status == "Success" && upcomingForecast.length > 0 ? <UpcomingForecast upcomingForecast={upcomingForecast}></UpcomingForecast>
        :
        <></>
        }
      </div>
    </div>
  )

}

export default App
