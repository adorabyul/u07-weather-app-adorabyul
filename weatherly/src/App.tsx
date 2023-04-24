import { useEffect, useState } from 'react'
import './App.scss'
import Today from './today/Today'


function App() {

  const URL = 'https://api.weatherapi.com/v1/current.json?key=';
  const apiKey = import.meta.env.VITE_API_KEY;

  const [currentWeather, setCurrentWeather] = useState(undefined);
  const [status, setStatus] = useState("")
  const [position, setPosition] = useState({lat: 37.532600, lng: 127.024612})



  const getCurrentWeather = async () => {
      const response = await fetch(URL + apiKey + '&q=' + position.lat + ',' + position.lng);
      const result = await response.json();
      setCurrentWeather(result);
  }

  const getLocation = () => {
    !navigator.geolocation ? setStatus("Geolocation is not supported on your browser")
    : setStatus("Loading");

    navigator.geolocation.getCurrentPosition((pos) => {
        setStatus("");
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
    
  }, [position]); 

  
  return (
    <div className="App">
     <h1 className="title">Weatherly</h1>
     {status == "Loading" ? currentWeather && (<Today currentWeather={currentWeather}></Today>)
     :
     <h2>{status}</h2>
     }
    </div>
  )

}

export default App
