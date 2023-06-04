$(function () {
  var today = dayjs();
  $("#currentDay").text(today.format("dddd, MMM D"));
});

var userFormEl = document.querySelector("#user-form");
var cityInputEl = document.querySelector("#cityName");
var currentCityContainerEl = document.querySelector("#weather-container");

var formSubmitHandler = function (event) {
  event.preventDefault();

  var cityName = cityInputEl.value.trim();

  if (cityName) {
    getCityInfo(cityName);

    currentCityContainerEl.textContent = "";
    cityInputEl.value = "";
  } else {
    alert("Please enter City name");
  }
};

var getCityInfo = function (city) {
  var apiKey = "5800608481ba95f3f6584cd0785fd228";
  var queryURL =
    "https://api.openweathermap.org/data/2.5/weather?q=" +
    city +
    "&appid=" +
    apiKey;

  fetch(queryURL)
    .then(function (response) {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error("Error: " + response.statusText);
      }
    })
    .then(function (data) {
      console.log(data);
      displayWeather();
    })
    .catch(function (error) {
      console.log(error);
      alert("Unable to connect to Weather Data");
    });
};

userFormEl.addEventListener("submit", formSubmitHandler);
