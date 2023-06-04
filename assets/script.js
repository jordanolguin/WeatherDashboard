// var userFormEl = document.querySelector("#user-form");
// var cityInputEl = document.querySelector("#cityName");
// var currentCityContainerEl = document.querySelector("#weather-container");

// var formSubmitHandler = function (event) {
//   event.preventDefault();

//   var cityName = cityInputEl.value.trim();

//   if (cityName) {
//     getCityInfo(cityName);

//     currentCityContainerEl.textContent = "";
//     cityInputEl.value = "";
//   } else {
//     alert("Please enter City name");
//   }
// };

// var getCityInfo = function (city) {
//   var apiKey = "5800608481ba95f3f6584cd0785fd228";
//   var city = cityInputEl.value.trim();
//   var queryURL =
//     "http://api.openweathermap.org/data/2.5/weather?q=" +
//     city +
//     "&appid=" +
//     apiKey;

//   fetch(queryURL)
//     .then(function (response) {
//       if (response.ok) {
//         response.json().then(function (data) {
//           displayWeather();
//         });
//       } else {
//         alert("Error: " + response.statusText);
//       }
//     })
//     .catch(function (error) {
//       alert("Unable to connect to Weather Data");
//     });
// };

// var displayWeather = function ()

// userFormEl.addEventListener("submit", formSubmitHandler);

// var apiKey = "5800608481ba95f3f6584cd0785fd228";
// var city;
// var queryURL =
//   "http://api.openweathermap.org/data/2.5/weather?q=" +
//   city +
//   "&appid=" +
//   apiKey;
fetch(
  "http://api.openweathermap.org/data/2.5/forecast?id=524901&appid=5800608481ba95f3f6584cd0785fd228"
)
  .then(function (response) {
    return response.json();
  })
  .then(function (data) {
    console.log(data);
  });
