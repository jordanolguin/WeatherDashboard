var userFormEl = document.querySelector("#user-form");
var cityInput = document.querySelector("#cityName");
var weatherContainerEl = document.querySelector("#weather-container");

var formSubmitHandler = function (event) {
  event.preventDefault();

  var city = cityInput.value.trim();

  if (city) {
    getWeatherInfo(city);

    weatherContainerEl.textContent = "";
    cityInput.value = "";
  } else {
    alert("Please enter valid city name");
  }
};

userFormEl.addEventListener("submit", formSubmitHandler);
