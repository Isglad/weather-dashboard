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
      // stored lat and lon data in variables
      lat = data.coord.lat;
      lon = data.coord.lon;
      // obtained current weather by passing it data from cityUrl
      displayCurrentWeather(data);
      // obtained future weather by passing it lat,lon from cityUrl
      displayFutureWeather(lat, lon);
    });
}

// Used data obtained from cityUrl to generate current weather
function displayCurrentWeather(data) {
  // created variables to store all required data to be displayed on the page
  var cityname = data.name;
  var cityDate = dayjs().format("dddd, D MMM YYYY");
  var weatherIcon = data.weather[0].icon;
  var temperature = data.main.temp;
  var humidity = data.main.humidity;
  var windSpeed = data.wind.speed;
  console.log(windSpeed);

  var cityTitle = $("<h3>");
  // Date
  var icon = $("<img>").attr(
    "src",
    `https://openweathermap.org/img/w/${data.weather[0].icon}.png`
  );
  var date = $("<p>");
  var temp = $("<p>");
  var wind = $("<p>");
  var humidityLevel = $("<p>");
  // added attributes
  cityTitle.attr("id", "cityTitle").text(cityname);
  icon.attr("id", "weatherIcon").text(weatherIcon);
  date.attr("id", "cityDate").text(cityDate);
  temp.attr("id", "temp").text("Temp: " + temperature);
  wind.attr("id", "wind-Speed").text("Wind: " + windSpeed);
  humidityLevel.attr("id", "hum").text("Humidity: " + humidity);
  // appended children elements to parents elements
  $("#currentWeather").append(cityTitle);
  $("#currentWeather").append(cityDate);
  $("#currentWeather").append(icon);
  $("#currentWeather").append(temp);
  $("#currentWeather").append(wind);
  $("#currentWeather").append(humidityLevel);

  var weatherTitle = $("<h3>");
  weatherTitle.text("5-Day Forecast");
  $("#currentWeather").append(weatherTitle);
}

// Used lat & lon obtained from the input city name
function displayFutureWeather(lat, lon) {
  var requestUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${apikey}&units=imperial`;
  console.log(lat, lon);
  fetch(requestUrl)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      console.log(data);

      for (var i = 0; i < 5; i++) {
        var date = i * 8 + 5;
        var cityDate = new Date(data.list[date].dt * 1000).toDateString();
        var temperature = data.list[0].main.temp;
        var humidity = data.list[0].main.humidity;
        var windSpeed = data.list[0].wind.speed;

        // create html elements
        var icon = $("<img>").attr(
          "src",
          "https://openweathermap.org/img/w/" +
            data.list[i].weather[0].icon +
            ".png"
        );
        var date = $("<p>");
        var temp = $("<p>");
        var wind = $("<p>");
        var humidityLevel = $("<p>");

        // add attributes to created elements
        date.attr("class", "city-date").text(cityDate);
        temp.attr("class", "temperature").text("Temp: " + temperature);
        wind.attr("class", "windSpeed").text("Wind: " + windSpeed);
        humidityLevel.attr("class", "humidity").text("Humidity: " + humidity);

        // append children elements to parents elements
        $(`#day-${i + 1}`).append(date);
        $(`#day-${i + 1}`).append(icon);
        $(`#day-${i + 1}`).append(temp);
        $(`#day-${i + 1}`).append(wind);
        $(`#day-${i + 1}`).append(humidityLevel);
      }
    });
}

// add a function that add data to local storage
function addToLocalStorage(){
  // store added city in local storage
  localStorage.setItem("citiesStringify", JSON.stringify(searchedCities));
}

// a function that reads local storage
function readLocalStorage() {
  console.log(searchedCities);
  // parsing JSON data to object
  searchedCities = JSON.parse(localStorage.getItem("citiesStringify"));
  // if no data in object searchedCities, let it be an empty object
  if (!searchedCities) {
    searchedCities = {};
  }
}

// a function that clears displayed weather data
function clearWeatherPage(){
  // delete weather divs
  $("#currentWeather").empty();
  $(".col").empty();
}

