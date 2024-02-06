const app = document.querySelector('.weather-app');
const search = document.querySelector('.search-box');


search.addEventListener('click', () => {
    const APIKey = '2d9656e12a5cfa0fd6b7cbebd84d6e23';
    const city = document.querySelector('.search-box input').value;
    if (city == '')
        return;
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${APIKey}&lang=kr`)
        .then(response => response.json()).then(json => {

            const city = document.querySelector('.weather-app .city-time .name');
            const temperature = document.querySelector('.weather-app .temp');
            const description = document.querySelector('.weather .description');
            const cloudy = document.querySelector('.details .cloud');
            const humidity = document.querySelector('.details .humidity');
            const wind = document.querySelector('.details .Wind');
            const cityTime = document.querySelector('.city-time .time');

            const weatherIcon = document.querySelector('.weather-icon i');

            switch (json.weather[0].main) {
                case 'Clear':
                    weatherIcon.innerHTML = `<i class="fa-solid fa-sun">`
                    break;
                case 'Rain':
                    weatherIcon.innerHTML = `<i class="fa-solid fa-cloud-showers-heavy"></i>`
                    break;
                case 'Clouds':
                    weatherIcon.innerHTML = `<i class="fa-solid fa-cloud"></i>`
                    break;

                case 'Snow':
                    weatherIcon.innerHTML = `<i class="fa-regular fa-snowflake"></i>`
                    break;

                case 'Moist':
                    weatherIcon.innerHTML = `<i class="fa-solid fa-smog"></i>`
                    break;
                case 'Haze':
                    weatherIcon.innerHTML = `<i class="fa-regular fa-smog"></i>`
                    break;
                default:
                    weatherIcon.innerHTML = `<i class="fa-solid fa-sun">`
                    break;
            }

            city.innerHTML = `${json.name}`;
            temperature.innerHTML = `${parseInt(json.main.temp)}<span>&#176;</span>`;
            description.innerHTML = `${json.weather[0].description}`;
            humidity.innerHTML = `${json.main.humidity}%`;
            wind.innerHTML = `${parseInt(json.wind.speed)}Km/h`;
        })

});


const cities = document.querySelectorAll('.cities .city');

cities.forEach(city => {
    city.addEventListener('click', function () {
        const selectedCity = this.textContent;
        const APIKey = '2d9656e12a5cfa0fd6b7cbebd84d6e23';
        fetch(`https://api.openweathermap.org/data/2.5/weather?q=${selectedCity}&units=metric&appid=${APIKey}`)
            .then(response => response.json()).then(json => {

                const city = document.querySelector('.weather-app .city-time .name');
                const time = document.querySelector('.weather-app .city-time .time');
                const temperature = document.querySelector('.weather-app .temp');
                const description = document.querySelector('.weather .description');
                const cloudy = document.querySelector('.details .cloud');
                const humidity = document.querySelector('.details .humidity');
                const wind = document.querySelector('.details .Wind');


                const weatherIcon = document.querySelector('.weather-icon i');

                switch (json.weather[0].main) {
                    case 'Clear':
                        weatherIcon.innerHTML = `<i class="fa-solid fa-sun">`
                        app.style.backgroundImage = `url(../img/sunny.jpg)`
                        break;
                    case 'Rain':
                        weatherIcon.innerHTML = `<i class="fa-solid fa-cloud-showers-heavy"></i>`
                        app.style.backgroundImage = `url(../img/rain.jpg)`
                        break;
                    case 'Clouds':
                        weatherIcon.innerHTML = `<i class="fa-solid fa-cloud"></i>`
                        app.style.backgroundImage = `url(../img/clouds.jpg)`
                        break;

                    case 'Snow':
                        weatherIcon.innerHTML = `<i class="fa-regular fa-snowflake"></i>`
                        app.style.backgroundImage = `url(../img/snow.jpg)`
                        break;

                    case 'Moist':
                        weatherIcon.innerHTML = `<i class="fa-solid fa-smog"></i>`
                        break;
                    case 'Haze':
                        weatherIcon.innerHTML = `<i class="fa-regular fa-smog"></i>`
                        break;
                    default:
                        weatherIcon.innerHTML = `<i class="fa-solid fa-sun">`
                        break;
                }
                city.innerHTML = `${json.name}`;
                temperature.innerHTML = `${parseInt(json.main.temp)}<span>&#176;</span>`;
                description.innerHTML = `${json.weather[0].description}`;
                cloudy.innerHTML = `${json.clouds.all} %`;
                humidity.innerHTML = `${json.main.humidity} %`;
                wind.innerHTML = `${parseInt(json.wind.speed)} Km/h`;

                const timezone = json.timezone;
                const timezoneOffset = timezone / 60;
                const curTime = moment().utcOffset(timezoneOffset).format("h:mm A MMM Do dddd");

                time.innerHTML = `${curTime}`;

                console.log(json);
            });
    });
});