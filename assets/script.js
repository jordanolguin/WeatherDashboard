var userFormEl = document.querySelector("#user-form");
var cityInput = document.querySelector("#cityName");
var weatherContainerEl = document.querySelector("#weather-container");

//display history in DOM
var displaySearchHistory = function () {
  var searches = getItem("searches") || [];
  for (var i = 0; i < searches.length; i++) {
    var searchItem = searches[i];
    var searchItemEl = document.createElement("button");
    searchItemEl.textContent = searchItem;
    searchItemEl.classList.add("search-history-item");
    searchItemEl.addEventListener("click", function () {
      var selectedCity = this.textContent;
      getCoordinates(selectedCity);
    });

    weatherContainerEl.appendChild(searchItemEl);
  }
};

// Function to retrieve item from localStorage
var getItem = function (key) {
  try {
    var item = localStorage.getItem(key);
    return item ? JSON.parse(item) : null;
  } catch (error) {
    console.log("Error retrieving item from localStorage:", error);
    return null;
  }
};

var appendToSearchHistory = function (city) {
  var searches = JSON.parse(localStorage.getItem("searches")) || [];
  searches.push(city);
  localStorage.setItem("searches", JSON.stringify(searches));
};

//execute City search and save searches in localStorage
//display search history
var formSubmitHandler = function (event) {
  event.preventDefault();

  var city = cityInput.value.trim();

  if (city) {
    getCoordinates(city);

    weatherContainerEl.textContent = "";
    cityInput.value = "";
    saveSearch(city);
    appendToSearchHistory(city);
    displaySearchHistory();
  } else {
    alert("Please enter valid city name");
  }
};

//save data in localStorage
var saveSearch = function (city) {
  var searches = JSON.parse(localStorage.getItem("searches")) || [];
  searches.push(city);
  localStorage.setItem("searches", JSON.stringify(searches));
};

//capturing and appending current weather to DOM
var displayCurrentWeather = function (dataObj) {
  console.log(dataObj);
  var cityEl = document.createElement("h1");
  var iconEl = document.createElement("img");
  var tempEl = document.createElement("p");
  var windEl = document.createElement("p");
  var humidityEl = document.createElement("p");
  cityEl.textContent = dataObj.name;
  iconEl.textContent = dataObj.weather.icon;
  tempEl.textContent = dataObj.main.temp;
  windEl.textContent = dataObj.wind.speed;
  humidityEl.textContent = dataObj.main.humidity;
  weatherContainerEl.append(cityEl, iconEl, tempEl, windEl, humidityEl);
};

//capturing and appending five day forcast
var displayFiveDayForcast = function (array) {
  var filteredArray = array.filter(
    (obj) => obj.dt_txt.split(" ")[1] === "12:00:00"
  );
  console.log(filteredArray);
  for (let i = 0; i < filteredArray.length; i++) {
    var forecastItem = filteredArray[i];
    var forecastContainer = document.createElement("div");
    var dateEl = document.createElement("h2");
    var tempEl = document.createElement("p");
    var windEl = document.createElement("p");
    var humidityEl = document.createElement("p");
    var date = forecastItem.dt_txt.split(" ")[0];
    dateEl.textContent = date;
    tempEl.textContent = "Temperature: " + forecastItem.main.temp;
    windEl.textContent = "Wind Speed: " + forecastItem.wind.speed;
    humidityEl.textContent = "Humidity: " + forecastItem.main.humidity;
    forecastContainer.append(dateEl, tempEl, windEl, humidityEl);
    weatherContainerEl.appendChild(forecastContainer);
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
    "&units=imperial" +
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
        displayCurrentWeather(data);
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
  // var forecastURL = `https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&appid=${apiKey}`
  var forcastUrl =
    "https://api.openweathermap.org/data/2.5/forecast?lat=" +
    latitude +
    "&lon=" +
    longitude +
    "&units=imperial" +
    "&appid=" +
    apiKey;

  fetch(forcastUrl)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      // console.log("Weather Data: ", data);
      displayFiveDayForcast(data.list);
    })
    .catch(function (error) {
      console.log(error);
    });
};

userFormEl.addEventListener("submit", formSubmitHandler);
displaySearchHistory();
