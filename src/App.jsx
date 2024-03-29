import { useState, useRef, useEffect } from 'react';
import moment from 'moment';
import ScrollReveal from 'scrollreveal';
import './App.css';

import cloud_icon from './assets/cloud.png'
import clear_icon from './assets/clear.png'
import rain_icon from './assets/rain.png'
import snow_icon from './assets/snow.png'
import drizzle_icon from './assets/drizzle.png'
import search_icon from './assets/search.png'



function App() {

  const [wicon, setWicon] = useState(cloud_icon);
  const [weatherData, setWeatherData] = useState(null);
  const [temp, setTemp] = useState(24);
  const [name, setName] = useState("Location");
  const [showContainer, setShowContainer] = useState(false);


  useEffect(() => {
    if (weatherData) {
      const timezoneOffset = weatherData.timezone / 60;
      const currentTime = moment().utcOffset(timezoneOffset).format("h:mm A MMM Do dddd");
      setShowContainer(false);
      const clouds = document.getElementsByClassName("cloud");
      const humidity = document.getElementsByClassName("humidity");
      const wind = document.getElementsByClassName("wind");
      const temp = document.getElementsByClassName("temp");
      const description = document.getElementsByClassName("condition");
      const location = document.getElementsByClassName("name");
      const Time = document.getElementsByClassName("time");


      humidity[0].innerHTML = weatherData.main.humidity + " %";
      wind[0].innerHTML = Math.floor(weatherData.wind.speed) + "km/h";
      clouds[0].innerHTML = weatherData.clouds.all + " %";
      temp[0].innerHTML = Math.floor(weatherData.main.temp) + "°C";
      location[0].innerHTML = weatherData.name;
      description[0].innerHTML = weatherData.weather[0].description;
      Time[0].innerHTML = currentTime;



      switch (weatherData.weather[0].icon) {
        case "01d":
        case "01n":
          setWicon(clear_icon);
          break;
        case "02d":
        case "02n":
          setWicon(cloud_icon);
          break;
        case "03d":
        case "03n":
        case "04d":
        case "04n":
          setWicon(drizzle_icon);
          break;
        case "09d":
        case "09n":
        case "10d":
        case "10n":
          setWicon(rain_icon);
          break;
        case "13d":
        case "13n":
          setWicon(snow_icon);
          break;
        default:
          setWicon(clear_icon);
      }
      setTimeout(() => {
        setShowContainer(true); // 0.5초 후에 컨테이너를 다시 나타나게 하는 상태 업데이트
      }, 300);

    }
  }, [weatherData]);



  const search = async () => {
    const element = document.getElementsByClassName("cityInput");
    if (element[0].value === "") {
      return 0;
    }

    let url = `  https://api.openweathermap.org/data/2.5/weather?q=${element[0].value}&units=Metric&appid=2d9656e12a5cfa0fd6b7cbebd84d6e23&lang=kr`

    let response = await fetch(url);
    let data = await response.json();
    setWeatherData(data);

  }


  const selectedCity = async (city) => {

    let url = `  https://api.openweathermap.org/data/2.5/weather?q=${city}&units=Metric&appid=2d9656e12a5cfa0fd6b7cbebd84d6e23&lang=kr`

    let response = await fetch(url);
    let data = await response.json();
    setWeatherData(data);

  }


  return (
    <div className="app">
      <h3 className="brand">Weathring with u</h3>
      <div className={`container ${showContainer ? 'show' : ''}`}>

        <div className='data-container'>
          <h1 className="temp">{temp}&#176;C</h1>

          <div className="city-time">
            <h1 className="name">{name}</h1>
            <small>
              <span className='time'></span>
            </small>
          </div>

          <div className='weather'>
            <img src={wicon} alt="" className="" width="50" height="50" />
            <span className="condition"></span>
          </div>

        </div>
      </div>

      <div className="panel">
        <div id="locationInput">
          <input type="text" className='cityInput' placeholder='Search location' />
          <div className="search-icon" onClick={() => { search() }}>
            <img src={search_icon} alt="" />
          </div>
        </div>

        <ul className="cities">
          <h4>Bookmark</h4>
          <li className="city" onClick={() => selectedCity("Seoul")}>Seoul</li>
          <li className="city" onClick={() => selectedCity("Tokyo")}>Tokyo</li>
          <li className="city" onClick={() => selectedCity("Moscow")}>Moscow</li>
        </ul>

        <ul className='details'>
          <h4>Weather Details</h4>
          <li>
            <span>Cloudy</span>
            <span className='cloud'>0%</span>
          </li>
          <li>

            <span>Humidity</span>
            <span className="humidity">0%</span>
          </li>
          <li>

            <span>Wind</span>
            <span className="wind">0km/h</span>
          </li>
        </ul>


      </div>
    </div>
  );
}


export default App;
