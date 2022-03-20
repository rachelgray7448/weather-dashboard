var cityEl = document.getElementById("city");
var cityInputEl = document.getElementById("cityinput");
var currentEl = document.getElementById("current");
var weatherHolderEl = document.getElementById("weatherHolder");


var cityFinder = function(event) {
    event.preventDefault();
    var city = cityEl.value.trim();
    getWeather(city);
};

//fetch city and weather information
var getWeather = function(city) {
    var cityUrl = "http://api.openweathermap.org/geo/1.0/direct?q=" + city + "&limit=5&appid=3955f3d0370ecadb33915059a071341c";
    fetch(cityUrl).then(function(response) {
        if(response.ok) {
            response.json().then(function(data) {
                console.log(data);
                var lat = data[0].lat;
                var lon = data[0].lon;
                var apiUrl = "https://api.openweathermap.org/data/2.5/onecall?lat=" + lat + "&lon=" + lon + "&exclude=minutely&appid=3955f3d0370ecadb33915059a071341c";
                fetch(apiUrl).then(function(response) {
                    if(response.ok) {
                        response.json().then(function(data) {
                        //pass response
                        console.log(data); 
                        var currentTemp = data.current.temp;
                        var currentUvi = data.current.uvi;
                        var currentWind = data.current.wind_speed;
                        var currentHumidity = data.current.humidity;
                        var daily = data.daily;
                        currentWeather(currentTemp, currentUvi, currentWind, currentHumidity, city);
                        fiveDay(daily);
                        })
                        console.log(currentWind);
                    }
                })
            })
        }
    })    
};

// display current data
var currentWeather = function(currentTemp, currentUvi, currentWind, currentHumidity, city) {
    var currentCity = document.getElementById("currentCity");
    currentCity.textContent = city.toUpperCase();

    var temp = document.getElementById("currentTemp");
    temp.textContent = "Temp: " + tempConvert(currentTemp) + " °F";

    var uvi = document.getElementById("currentUvi");
    uvi.textContent = "UVI: " + currentUvi;

    var wind = document.getElementById("currentWind");
    wind.textContent = "Wind: " + currentWind + "mph";

    var humidity = document.getElementById("currentHumidity");
    humidity.textContent = "Humidity: " + currentHumidity + "%";
}

// display five day forecast
var fiveDay = function(daily) {
    for (i = 1; i < 6; i++) {
        var weatherHolder = document.createElement("div")
        weatherHolder.className = ("card col-2 m-2");
        var weatherDate = document.createElement("h5");
        var weatherTemp = document.createElement("p");
        var weatherWind = document.createElement("p");
        var weatherHumidity = document.createElement("p");

        var convertedStartDate = new Date(daily[i].dt*1000);

        var month = convertedStartDate.getMonth() + 1;
        var day = convertedStartDate.getDate();
        var year = convertedStartDate.getFullYear();
        var shortStartDate = month + "/" + day + "/" + year;

        weatherDate.textContent = shortStartDate
        weatherTemp.textContent = "Temp: " + tempConvert(daily[i].temp.max) + " °F";
        weatherWind.textContent = "Wind: " + daily[i].wind_speed + " mph";
        weatherHumidity.textContent = "Humidity: " + daily[i].humidity + "%";


        weatherHolderEl.className = ("row");
        weatherHolder.append(weatherDate, weatherTemp, weatherWind, weatherHumidity);
        weatherHolderEl.appendChild(weatherHolder);
    }
}

//convert temp
var tempConvert = function(temp) {
    return((temp-273.15)*(9/5) + 32).toFixed(2);
}

// local storage city search history

cityInputEl.addEventListener("submit", cityFinder);

