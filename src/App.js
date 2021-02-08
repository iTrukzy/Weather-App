import React, { useEffect, useState } from 'react'
import './App.css';
import Loading from './componet/Loading';
import WeatherBox from './componet/WeatherBox.js'
import axios from 'axios'


function App() {
  const API_KEY = '13f35ec4de8792736d638ef1dfe49be9'
  
  const [isLoading, setIsLoading] = useState(true)
  const [value, setValue] = useState([])
  const [coord, setCoord] = useState([])

  useEffect(() => {
    const getData = async () => {
      if(value.lat === undefined  && value.lon === undefined ) {
        navigator.geolocation.getCurrentPosition(geo)
      }
      else {
        const res = await axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${value.lat}&lon=${value.lon}&appid=${API_KEY}`)
        setCoord(res.data)
        setTimeout(() => {
          setIsLoading(false)
        }, 2000);
      }    
    }     
    getData()
  }, [value.lat, value.lon])
  
  const geo = (position) => {
    const arr = {
      lat: position.coords.latitude,
      lon: position.coords.longitude
    }
    setValue(arr)
  } 
  
  return (
    <div className="App" >
      { isLoading ? <Loading /> : <WeatherBox coord={coord}/> }
    </div>
  );
}

export default App;
