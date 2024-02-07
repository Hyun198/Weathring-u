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

  const weatherRef = useRef(null);
  useEffect(() => {
    ScrollReveal().reveal(weatherRef.current, {
      duration: 1000,
      distance: '20px',
      origin: 'bottom',
      easing: 'ease-in-out',
    });
  }, [weatherRef]);

  const search = async () => {
    const element = document.getElementsByClassName("cityInput");
    if (element[0].value === "") {
      return 0;
    }

    let url = `  https://api.openweathermap.org/data/2.5/weather?q=${element[0].value}&units=Metric&appid=2d9656e12a5cfa0fd6b7cbebd84d6e23&lang=kr`

    let response = await fetch(url);
    let data = await response.json();

    const timezoneOffset = data.timezone / 60;
    const currentTime = moment().utcOffset(timezoneOffset).format("h:mm A MMM Do dddd");

    const clouds = document.getElementsByClassName("cloud");
    const humidity = document.getElementsByClassName("humidity");
    const wind = document.getElementsByClassName("wind");
    const temp = document.getElementsByClassName("temp");
    const description = document.getElementsByClassName("condition");
    const location = document.getElementsByClassName("name");
    const Time = document.getElementsByClassName("time");


    humidity[0].innerHTML = data.main.humidity + " %";
    wind[0].innerHTML = Math.floor(data.wind.speed) + "km/h";
    clouds[0].innerHTML = data.clouds.all + " %";
    temp[0].innerHTML = Math.floor(data.main.temp) + "°C";
    location[0].innerHTML = data.name;
    description[0].innerHTML = data.weather[0].description;
    Time[0].innerHTML = currentTime;

    if (data.weather[0].icon === "01d" || data.weather[0].icon === "01n") {
      setWicon(clear_icon);
    } else if (data.weather[0].icon === "02d" || data.weather[0].icon === "02n") {
      setWicon(cloud_icon);
    } else if (data.weather[0].icon === "03d" || data.weather[0].icon === "03n") {
      setWicon(drizzle_icon);
    } else if (data.weather[0].icon === "04d" || data.weather[0].icon === "04n") {
      setWicon(drizzle_icon);
    } else if (data.weather[0].icon === "09d" || data.weather[0].icon === "09n") {
      setWicon(rain_icon);
    } else if (data.weather[0].icon === "10d" || data.weather[0].icon === "10n") {
      setWicon(rain_icon);
    } else if (data.weather[0].icon === "13d" || data.weather[0].icon === "13n") {
      setWicon(snow_icon);
    } else {
      setWicon(clear_icon);
    }
  }


  const selectedCity = async (city) => {

    let url = `  https://api.openweathermap.org/data/2.5/weather?q=${city}&units=Metric&appid=2d9656e12a5cfa0fd6b7cbebd84d6e23&lang=kr`

    let response = await fetch(url);
    let data = await response.json();

    const timezoneOffset = data.timezone / 60;
    const currentTime = moment().utcOffset(timezoneOffset).format("h:mm A MMM Do dddd");

    console.log(data);
    console.log(currentTime);
    const clouds = document.getElementsByClassName("cloud");
    const humidity = document.getElementsByClassName("humidity");
    const wind = document.getElementsByClassName("wind");
    const temp = document.getElementsByClassName("temp");
    const description = document.getElementsByClassName("condition");
    const location = document.getElementsByClassName("name");
    const Time = document.getElementsByClassName("time");


    humidity[0].innerHTML = data.main.humidity + " %";
    wind[0].innerHTML = Math.floor(data.wind.speed) + "km/h";
    clouds[0].innerHTML = data.clouds.all + " %";
    temp[0].innerHTML = Math.floor(data.main.temp) + "°C";
    location[0].innerHTML = data.name;
    description[0].innerHTML = data.weather[0].description;
    Time[0].innerHTML = currentTime;

    if (data.weather[0].icon === "01d" || data.weather[0].icon === "01n") {
      setWicon(clear_icon);
    } else if (data.weather[0].icon === "02d" || data.weather[0].icon === "02n") {
      setWicon(cloud_icon);
    } else if (data.weather[0].icon === "03d" || data.weather[0].icon === "03n") {
      setWicon(drizzle_icon);
    } else if (data.weather[0].icon === "04d" || data.weather[0].icon === "04n") {
      setWicon(drizzle_icon);
    } else if (data.weather[0].icon === "09d" || data.weather[0].icon === "09n") {
      setWicon(rain_icon);
    } else if (data.weather[0].icon === "10d" || data.weather[0].icon === "10n") {
      setWicon(rain_icon);
    } else if (data.weather[0].icon === "13d" || data.weather[0].icon === "13n") {
      setWicon(snow_icon);
    } else {
      setWicon(clear_icon);
    }
  }

  return (
    <div className="app">
      <div className="container">
        <h3 className="brand">Weathring with u</h3>
        <div>
          <h1 className="temp">24&#176;C</h1>

          <div className="city-time">
            <h1 className="name">Location</h1>
            <small>
              <span className='time'></span>
            </small>
          </div>

          <div ref={weatherRef} className='weather'>
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
