// selectors
const input = document.querySelector("#enterCityName");
const button = document.querySelector("button");
const cityName = document.querySelector(".cityName");
const countryName = document.querySelector(".country");
const tempreature = document.querySelector(".tempreature-celsius");
const weatherSummary = document.querySelector(".weather-summary");
const weatherIcon = document.querySelector("#icon1");
const errorMessage = document.querySelector("#message");
// variables
const apiKey = "ce6319dd6ab040a9648a0654315c131c";
//events
button.addEventListener("click", getWeather);

// functions

if (navigator.geolocation) {
  navigator.geolocation.getCurrentPosition(showPositon);
}
function showPositon(position) {
  const long = position.coords.longitude;
  const lat = position.coords.latitude;

  fetch(
    `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=${apiKey}`
  )
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      const { temp } = data.main;
      const tempCelsius = temp - 273.15;
      const { main, icon } = data.weather[0];
      const { country } = data.sys;
      const city = data.name;
      // const icon = data.weather[0].icon;

      // console.log(Math.floor(tempCelsius));
      tempreature.textContent = Math.floor(tempCelsius) + "\u00B0C";
      cityName.textContent = `${city} ,`;
      countryName.textContent = country;
      weatherSummary.textContent = main;
      setIcon(icon);
      // weatherIcon.src = `http://openweathermap.org/img/wn/${icon}@2x.png`;
    });

  // console.log(
  //   `latitude ${position.coords.latitude} longitude ${position.coords.longitude}`
  // );
}

function getWeather() {
  const city = input.value.trim();
  //   console.log(city);
  fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`
  )
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      const { temp } = data.main;
      const tempCelsius = temp - 273.15;
      const { main, icon } = data.weather[0];
      const { country } = data.sys;
      // const icon = data.weather[0].icon;

      // console.log(Math.floor(tempCelsius));
      tempreature.textContent = Math.floor(tempCelsius) + "\u00B0C";
      cityName.textContent = `${city} ,`;
      countryName.textContent = country;
      weatherSummary.textContent = main;
      setIcon(icon);
      // weatherIcon.src = `http://openweathermap.org/img/wn/${icon}@2x.png`;

      errorMessage.textContent = "";
    })
    .catch((error) => {
      errorMessage.textContent = "Enter Valid City";
    });
}

function setIcon(icon) {
  const skycons = new Skycons({ color: "black" });
  if (icon == "01d" || icon == "01n") {
    if (icon == "01d") {
      skycons.add(weatherIcon, Skycons.CLEAR_DAY);
      skycons.play();
    }
    if (icon == "01n") {
      skycons.add(weatherIcon, Skycons.CLEAR_NIGHT);
      skycons.play();
    }
  } else if (icon == "02d" || icon == "02n") {
    if (icon == "02d") {
      skycons.add(weatherIcon, Skycons.PARTLY_CLOUDY_DAY);
      skycons.play();
    }
    if (icon == "02n") {
      skycons.add(weatherIcon, Skycons.PARTLY_CLOUDY_NIGHT);
      skycons.play();
    }
  } else if (icon == "03d" || icon == "03n") {
    skycons.add(weatherIcon, Skycons.CLOUDY);
    skycons.play();
  } else if (icon == "04d" || icon == "04n") {
    skycons.add(weatherIcon, Skycons.CLOUDY);
    skycons.play();
  } else if (icon == "09d" || icon == "09n") {
    skycons.add(weatherIcon, Skycons.SLEET);
    skycons.play();
  } else if (icon == "10d" || icon == "10n") {
    skycons.add(weatherIcon, Skycons.RAIN);
    skycons.play();
  } else if (icon == "11d" || icon == "11n") {
    skycons.add(weatherIcon, Skycons.RAIN);
    skycons.play();
  } else if (icon == "13d" || icon == "13n") {
    skycons.add(weatherIcon, Skycons.SNOW);
    skycons.play();
  } else if (icon == "50d" || icon == "50n") {
    skycons.add(weatherIcon, Skycons.WIND);
    skycons.play();
  }
}
