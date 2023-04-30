import { useEffect, useState } from 'react'
import './App.scss'
import Today from './today/Today'
import ForecastToday from './ForecastToday/ForecastToday'
import UpcomingForecast from './UpcomingForecast/UpcomingForecast'
import DayInfo from './DayInfo/DayInfo'


function App() {

  const URL = 'https://api.weatherapi.com/v1/';
  const apiKey = import.meta.env.VITE_API_KEY;

  const [currentWeather, setCurrentWeather] = useState(undefined); //Realtime weather
  const [forecast, setForecast] = useState([{}]); //24 hour Forecast
  const [upcomingForecast, setUpcomingForecast] = useState([{}]); //5-Day Forecast
  const [status, setStatus] = useState("")
  const [position, setPosition] = useState({lat: 37.532600, lng: 127.024612}) //Position
  const [isCelsius, setIsCelsius] = useState(true); //Bool Celsius/Fahrenheit
  const [astroToday, setAstroToday] = useState({}); //Astro object



  //Get realtime weather
  const getCurrentWeather = async () => {
      const response = await fetch(URL + 'current.json?key=' + apiKey + '&q=' + position.lat + ',' + position.lng);
      const result = await response.json();
      setCurrentWeather(result);
  }
  //Get 24 hour and 5-Day forecast + astro object (needs refactoring 🥵😅)
  const getForecast = async () => {
    const response = await fetch(URL + 'forecast.json?key=' + apiKey + '&q=' + position.lat + ',' + position.lng + '&days=6')
    const result = await response.json();
    
    //Save hours for 24 hour forecast
    const dayOneHours = result.forecast.forecastday[0].hour;
    const dayTwoHours = result.forecast.forecastday[1].hour;
  
    //Set astro object for today
    setAstroToday(result.forecast.forecastday[0].astro)

    const upcomingDays : {}[] = []; //5 day forecast day-objects
    const currentTime = Date.now(); //Get current time to calculate which hours to display
    const hoursToDisplay : {}[] = []; //Will contain the next 24 hours to be displayed

   

    for(let n = 0; n < result.forecast.forecastday.length; n++)
    {
      upcomingDays.push(result.forecast.forecastday[n]) //Populate list with 5-day forecast
    }

    let j = 0;
    for(let i = 0; i < dayOneHours.length; i++)
    {
      if(dayOneHours[i].time_epoch > currentTime/1000) //If time after now
      {
        hoursToDisplay[j] = dayOneHours[i]; //Display it
        j++;
        
      }
    }
    for(let k = 0; k < dayTwoHours.length; k++)
    {
      //If time in the second day is after now, but not more than 24 hours from now
      if(dayTwoHours[k].time_epoch > currentTime/1000 && dayTwoHours[k].time_epoch < currentTime/1000 + 86400) // 86400 == number of seconds in 24 hours
      {
        hoursToDisplay.push(dayTwoHours[k]) //Display it
        
      }
    }

    setForecast(hoursToDisplay); //Here hoursToDisplay == the next 24 hours
    setUpcomingForecast(upcomingDays); //Set 5 day forecast
  }


  const getLocation = () => {
    !navigator.geolocation ? setStatus("Geolocation is not supported on your browser")
    : setStatus("Loading...");

    navigator.geolocation.getCurrentPosition((pos) => {
        setStatus("Success");
        setPosition({lat: pos.coords.latitude, lng: pos.coords.longitude}); //Set position

    },
    () => {
        setStatus("Unable to retrieve your position")
    }
    );
}

const toggleUnit = () => {
  setIsCelsius(!isCelsius);
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
    
    <nav>
      <h1 className="title">Weatherly</h1>
        {isCelsius ? <div className='button' onClick={toggleUnit}>&deg;F</div>
        :
        <div className='button' onClick={toggleUnit}>&deg;C</div>
        }
    </nav>
      
      
      <div className="container">

        {status == "Success" ? currentWeather && <Today isCelsius={isCelsius} currentWeather={currentWeather}></Today>
        :
        <h2>{status}</h2>
        }
        <div className='middleContent'>
          
          {status == "Success" && forecast.length > 0 ? <div><p className='description24Hour'>24-Hour Forecast</p><ForecastToday isCelsius={isCelsius} forecast={forecast}></ForecastToday></div>
          :
          <></>
          }
        </div>
       
        <div className="bottomContent">
        {status == "Success" && upcomingForecast.length > 0 ? <div><p className='bottomText'>5-Day Forecast</p> <UpcomingForecast isCelsius={isCelsius} upcomingForecast={upcomingForecast}></UpcomingForecast> </div>
        :
        <></>
        }
        {status == "Success" ? currentWeather && <div><p className='bottomText'>Today</p><DayInfo astroToday={astroToday} isCelsius={isCelsius} currentWeather={currentWeather}></DayInfo></div>
        :
        <></>
        }
        </div>
       
        
      </div>
      
    </div>
  )

}

export default App
