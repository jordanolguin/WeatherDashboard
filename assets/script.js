var apiKey = "5800608481ba95f3f6584cd0785fd228";
var city;
var queryURL =
  "http://api.openweathermap.org/data/2.5/weather?q=" +
  city +
  "&appid=" +
  apiKey;

fetch(queryURL);
