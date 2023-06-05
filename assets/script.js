var userFormEl = document.querySelector("#user-form");
var cityInput = document.querySelector("#cityName");
var weatherContainerEl = document.querySelector("#weather-container");

// execute City search
var formSubmitHandler = function (event) {
  event.preventDefault();

  var city = cityInput.value.trim();

  if (city) {
    getCoordinates(city);

    weatherContainerEl.textContent = "";
    cityInput.value = "";
  } else {
    alert("Please enter valid city name");
  }
};

// capture City input coordinates for weather function
var getCoordinates = function (coordinates) {
  var cityName = cityInput.value.trim();
  var limit = 1;
  var apiKey = "5800608481ba95f3f6584cd0785fd228";

  var coordUrl =
    // "http://api.openweathermap.org/geo/1.0/direct?q=" +
    "https://api.openweathermap.org/data/2.5/weather?q=" +
    cityName +
    // "&limit=" +
    // limit +
    "&appid=" +
    apiKey;

  fetch(coordUrl)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      if (data) {
        console.log(data);
        var lat = data.coord.lat;
        var lon = data.coord.lon;
        console.log(
          "Coordinates for " +
            cityName +
            ": Latitude = " +
            lat +
            ", Longitude = " +
            lon
        );
        getForcast(lat, lon);
      } else {
        console.log("No coordinates found for " + cityName + ".");
      }
    })
    .catch(function (error) {
      console.log(error);
    });
};

// plug lat and lon values into api
var getForcast = function (latitude, longitude) {
  var apiKey = "5800608481ba95f3f6584cd0785fd228";

  var weatherUrl =
    "https://api.openweathermap.org/data/2.5/forecast?lat=" +
    latitude +
    "&lon=" +
    longitude +
    "&appid=" +
    apiKey;

  fetch(weatherUrl)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      console.log("Weather Data: ", data);
    })
    .catch(function (error) {
      console.log(error);
    });
};

userFormEl.addEventListener("submit", formSubmitHandler);
