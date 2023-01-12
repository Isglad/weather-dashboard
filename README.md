# Weather Dashboard

## Technology Used

| Technology Used         | Resource URL           | 
| ------------- |:-------------:| 
| HTML    | [https://developer.mozilla.org/en-US/docs/Web/HTML](https://developer.mozilla.org/en-US/docs/Web/HTML) | 
| CSS     | [https://developer.mozilla.org/en-US/docs/Web/CSS](https://developer.mozilla.org/en-US/docs/Web/CSS)      |   
| Git | [https://git-scm.com/](https://git-scm.com/)     |   
| JavaScript   | [https://developer.mozilla.org/en-US/docs/Learn/JavaScript](https://developer.mozilla.org/en-US/docs/Learn/JavaScript      |
| jQuery API   | [https://api.jquery.com/](https://api.jquery.com/)  |
| Bootstrap   | [https://getbootstrap.com/docs/5.3/getting-started/introduction/](https://getbootstrap.com/docs/5.3/getting-started/introduction/)     |
| Day.js  | [https://day.js.org/](https://day.js.org/)    |
| Openweathermap.org API   |  [https://openweathermap.org/api](https://openweathermap.org/api)    |


## Description

[Visit the Deployed Site](https://isglad.github.io/weather-dashboard/)

Welcome to the our weather forecast website! This application provides you with up-to-date and accurate weather information any city of your choice. With this application, you can easily check the current weather conditions as well as the forecast for the next 5 days.

![Web Page Screenshot](/assets/images/Weather%20Forecast%20img.png)

## Table of Contents

- [Code Example](#code-example)
- [Features](#features)
- [Usage](#usage)
- [Learning Points](#learning-points)
- [Author Info](#author-info)
- [Credits](#credits)
- [License](#license)


## Code Example

These lines of code shows a function that takes city name and request data that will help us obtain latitude and longitude of that given city.
```js
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
      var lat = data.coord.lat;
      var lon = data.coord.lon;
      // obtained current weather by passing it data from cityUrl
      displayCurrentWeather(data);
      // obtained future weather by passing it lat,lon from cityUrl
      displayFutureWeather(lat, lon);
    });
}
```
Next, we will then use data to generate current weather conditions and we will use latitude and longitude to generate 5-day forecast weather conditions of a given city.
```js
// Used lat & lon obtained from the input city name
function displayFutureWeather(lat, lon) {
  var requestUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${apikey}&units=imperial`;
  fetch(requestUrl)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
    // loop through returned data to generate the next 5 days weather conditions.
      for (var i = 0; i < 5; i++) {
        var date = i * 8 + 5;
        var cityDate = new Date(data.list[date].dt * 1000).toDateString();
        var temperature = data.list[0].main.temp;
        var humidity = data.list[0].main.humidity;
        var windSpeed = data.list[0].wind.speed;
      }
    });
}
```

## Features

- Real-time weather updates for your current location or any other preferred city.
- 5-day forecast.
- Temperature, humidity, wind speed, and an icon representation of weather conditions.
- User friendly interface.

## Usage

To use the weather forecast application, simply open the application in your web browser. Then enter a name of your prefreed city and press search button. You will then be presented with current and future conditions for that city and that city is added to the search history. When you click on a city in the search history, then you are again presented with current and future conditions for that selected city.

## Learning Points

- Use the Chrome DevTools Network tab.
- Implement and use the response object from a fetch() request.
- Implement deconstructed parameters in an API request URL.
- Implement fetch() options for a fetch() request.
- Use document.location to replace the URL in the browser.

## Author Info 

```md
### Gladys Ange Isingizwe 


* [Email](gladyisingizwe@gmail.com)
* [LindeIn](www.linkedin.com/in/gladys-isingizwe)
* [Github]()https://github.com/Isglad
```

## Credits

Collabortors on this project are instructional staff, TAs and winter cohort 2022 of the University of Calfornia Berkeley Coding Bootcamp.

## License

Please refer to the LICENSE in the repo.