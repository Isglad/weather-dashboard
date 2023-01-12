var cityInputVal = $("#city-input").val();
var apikey = "97c107da31d0208e3fb1be06dba822f2";
var lat;
var lon;
var searchedCities = {};

// when the search button is clicked, I want to get the weather condition
$("#search-button").on("click", function () {
  clearWeatherPage()
  searchWeather();
});

// function that displays weather to the page
function searchWeather() {
  var cityName = $("#city-input").val();
  var addedCity = $("<button>");
  addedCity.text(cityName);
  $("#searchHistory").append(addedCity);

  addToLocalStorage();
  getLatLon(cityName);
}

// Calculate lat & lon of the given city and used api link with '/weather?'
function getLatLon(cityName) {
  // request data from the openweathermap api
  var cityUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apikey}&units=imperial`;
  fetch(cityUrl)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      console.log(data);

    });
}


