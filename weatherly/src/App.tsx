import { useEffect, useState } from 'react'
import './App.scss'
import Today from './today/Today'
import ForecastToday from './ForecastToday/ForecastToday'


function App() {

  const URL = 'https://api.weatherapi.com/v1/';
  const apiKey = import.meta.env.VITE_API_KEY;

  const [currentWeather, setCurrentWeather] = useState(undefined);
  const [forecast, setForecast] = useState([{}]);
  const [status, setStatus] = useState("")
  const [position, setPosition] = useState({lat: 37.532600, lng: 127.024612})



  const getCurrentWeather = async () => {
      const response = await fetch(URL + 'current.json?key=' + apiKey + '&q=' + position.lat + ',' + position.lng);
      const result = await response.json();
      setCurrentWeather(result);
  }

  const getForecast = async () => {
    const response = await fetch(URL + 'forecast.json?key=' + apiKey + '&q=' + position.lat + ',' + position.lng + '&days=2')
    const result = await response.json();
    
    const hours = result.forecast.forecastday[0].hour;
    const hours2 = result.forecast.forecastday[1].hour;
    const currentTime = Date.now();

    const hoursToDisplay : {}[] = [];
    let j = 0;


    for(let i = 0; i < hours.length; i++)
    {
      if(hours[i].time_epoch > currentTime/1000)
      {
        hoursToDisplay[j] = hours[i];
        j++;
        
      }
    }
    for(let k = 0; k < 12; k++)
    {
      if(hours2[k].time_epoch > currentTime/1000 && hours2[k].time_epoch < hours2[k].time_epoch + 43200)
      {
        hoursToDisplay.push(hours2[k])
        
      }
    }
    setForecast(hoursToDisplay);
    
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
     {status == "Success" ? currentWeather && (<Today currentWeather={currentWeather}></Today>)
     :
     <h2>{status}</h2>
     }
     {status == "Success" && forecast.length > 0 ? <ForecastToday forecast={forecast}></ForecastToday>
     :
     <></>
     }
    </div>
  )

}

export default App
