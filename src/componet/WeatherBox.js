import React, { useState } from 'react'
import './WeatherBox.css'
import { FaWind, FaCloudShowersHeavy, FaTemperatureHigh } from "react-icons/fa";

function WeatherBox( { coord } ) {

    let toDay = new Date();
    let date = toDay.getDate() + "-" + ( toDay.getMonth() + 1 ) + "-" + toDay.getFullYear()
    let houre = toDay.getHours() + ":" + toDay.getMinutes();

    const [degrees, setDegrees] = useState({
        dg: coord.main.temp - 273.15,
        type: true,
        grade: "°C"
    })

    const dats = {
        name: coord.name,
        description: coord.weather[0].description,
        country: coord.sys.country,
        weather: coord.weather[0].main,
        icon: coord.weather[0].icon,
        wind: coord.wind.speed,
        humidity: coord.main.humidity,
        pressure: coord.main.pressure,
        
        cloods: coord.weather[0].main
    }

    const changue = () => {
        const data = degrees.dg
        if(degrees.type) {
            setDegrees({
                dg: [(data * 9/5) + 32],
                type: false,
                grade: "°F"
            })
        }
        else {
            setDegrees({
                dg: coord.main.temp - 273.15,
                type: true,
                grade: "°C"
            })
        }
    }

    let iconUrl = `http://openweathermap.org/img/wn/${dats.icon}.png`;



    return (
        <div className="Weather">
            <div className="header__box" style={{backgroundImage: "url(https://c0.wallpaperflare.com/preview/148/149/78/blue-sky-clouds-bright.jpg)"}}>
                <div> <h2>{dats.name}, <span>{dats.country}</span> </h2> </div>
                <div>
                    <h5>" {dats.description} "</h5>
                    <p >{houre}</p>
                </div>
                <div className="status__site"> 
                        <div>          
                            <p><FaWind /> {dats.wind} m/s </p>
                            <h6>Wind</h6> 
                        </div>
                        <div>
                            <p><FaCloudShowersHeavy /> {dats.humidity}%</p>
                            <h6>Humidity</h6>
                        </div>
                        <div>
                            <p><FaTemperatureHigh /> {dats.pressure}</p>
                            <h6>Pressure</h6>
                        </div>
                        
                    </div>
            </div>
            <div className="footer__box">
                <div>
                    <span>{degrees.dg} {degrees.grade}</span>
                    <p>{date}</p>
                </div>
                <div className="icon__site">
                    <img  src={iconUrl} alt="Weather icon"></img>
                    <p>{dats.cloods}</p>
                </div>
                <button onClick={ changue } className="convert__formule">°C / °F</button>
            </div> 
        </div>
    )
}

export default WeatherBox
