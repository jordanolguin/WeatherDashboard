var userFormEl = document.querySelector("#user-form");
var clearHistoryBtn = document.querySelector("#clear-history");
var cityInput = document.querySelector("#cityName");
var weatherContainerEl = document.querySelector("#weather-container");
var historyContainerEl = document.querySelector("#history-container");
var fiveDayForcastEl = document.querySelector("#forcast-container");
var searches = JSON.parse(localStorage.getItem("searches")) || [];

//display history in DOM
var displaySearchHistory = function () {
  historyContainerEl.textContent = "";
  for (var i = 0; i < searches.length; i++) {
    var searchItem = searches[i];
    var searchItemEl = document.createElement("button");
    searchItemEl.textContent = searchItem;
    searchItemEl.setAttribute("data-cityName", searchItem);
    searchItemEl.classList.add("search-history-item");
    historyContainerEl.appendChild(searchItemEl);
  }
};

//capturing the data from the search history item buttons
var handleSearchHistoryClick = function (event) {
  var button = event.target;
  var historyName = button.getAttribute("data-cityName");
  getCoordinates(historyName);
};

//retrieve item from localStorage
var getItem = function (key) {
  try {
    var item = localStorage.getItem(key);
    return item ? JSON.parse(item) : null;
  } catch (error) {
    console.log("Error retrieving item from localStorage:", error);
    return null;
  }
};

//clear search history
var clearSearchHistory = function (event) {
  event.preventDefault();
  localStorage.removeItem("searches");
  searches = [];
  displaySearchHistory();
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
    displaySearchHistory();
  } else {
    alert("Please enter valid city name");
  }
};

//save data in localStorage
var saveSearch = function (city) {
  searches.push(city);
  localStorage.setItem("searches", JSON.stringify(searches));
};

//capturing and appending current weather to DOM
var displayCurrentWeather = function (dataObj) {
  weatherContainerEl.textContent = "";
  console.log(dataObj);

  var cityEl = document.createElement("h2");
  var dateEl = document.createElement("span");
  var iconEl = document.createElement("img");
  var tempEl = document.createElement("p");
  var windEl = document.createElement("p");
  var humidityEl = document.createElement("p");

  cityEl.textContent = dataObj.name;
  dateEl.textContent = " - " + getCurrentDate();

  var iconCode = dataObj.weather[0].icon;
  var iconUrl = "http://openweathermap.org/img/w/" + iconCode + ".png";
  iconEl.src = iconUrl;
  iconEl.style.width = "55px";
  iconEl.style.height = "55px";

  tempEl.textContent = "Temperature: " + dataObj.main.temp + "°F";
  windEl.textContent = "Wind Speed: " + dataObj.wind.speed + " mph";
  humidityEl.textContent = "Humidity: " + dataObj.main.humidity + "%";

  cityEl.append(dateEl);
  weatherContainerEl.append(cityEl, iconEl, tempEl, windEl, humidityEl);
};

//set current date in the format "Month Day, Year"
function getCurrentDate() {
  var currentDate = new Date();
  var options = { year: "numeric", month: "long", day: "numeric" };
  return currentDate.toLocaleDateString(undefined, options);
}

//capturing and appending five day forcast
var displayFiveDayForcast = function (array) {
  fiveDayForcastEl.textContent = " ";
  var filteredArray = array.filter(
    (obj) => obj.dt_txt.split(" ")[1] === "12:00:00"
  );
  console.log(filteredArray);
  for (let i = 0; i < filteredArray.length; i++) {
    var forecastItem = filteredArray[i];
    var forecastContainer = document.createElement("div");
    var dateEl = document.createElement("h2");
    var forecastIconEl = document.createElement("img");
    var tempEl = document.createElement("p");
    var windEl = document.createElement("p");
    var humidityEl = document.createElement("p");
    var fullDate = forecastItem.dt_txt.split(" ")[0];
    var dateComponents = fullDate.split("-");
    var date = dateComponents[1] + "-" + dateComponents[2];

    forecastContainer.classList.add("individual-forecast-card");
    forecastContainer.classList.add("col-12");
    forecastContainer.classList.add("col-md-2");
    dateEl.textContent = date;
    var forecastIconCode = forecastItem.weather[0].icon;
    var forecastIconUrl =
      "http://openweathermap.org/img/w/" + forecastIconCode + ".png";
    forecastIconEl.src = forecastIconUrl;
    tempEl.textContent = "Temperature: " + forecastItem.main.temp + "°F";
    windEl.textContent = "Wind Speed: " + forecastItem.wind.speed + " mph";
    humidityEl.textContent = "Humidity: " + forecastItem.main.humidity + "%";
    forecastContainer.append(
      dateEl,
      forecastIconEl,
      tempEl,
      windEl,
      humidityEl
    );
    fiveDayForcastEl.appendChild(forecastContainer);
  }
};

// capture City input coordinates for weather function
var getCoordinates = function (coordinates) {
  console.log(this);
  var limit = 1;
  var apiKey = "5800608481ba95f3f6584cd0785fd228";
  var coordUrl =
    "https://api.openweathermap.org/data/2.5/weather?q=" +
    coordinates +
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
clearHistoryBtn.addEventListener("click", clearSearchHistory);
displaySearchHistory();
historyContainerEl.addEventListener("click", handleSearchHistoryClick);
