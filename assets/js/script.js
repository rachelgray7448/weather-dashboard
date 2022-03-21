var cityEl = document.getElementById("city");
var cityInputEl = document.getElementById("cityinput");
var currentEl = document.getElementById("current");
var weatherHolderEl = document.getElementById("weatherHolder");
var displayCityHistoryEl = document.getElementById("history");
//var newArr = [] || ;
var searchHistory = JSON.parse(localStorage.getItem("city")) || [];

console.log(searchHistory);

var cityFinder = function(event) {
    event.preventDefault();
    weatherHolderEl.innerHTML = ""
    var city = cityEl.value.trim();
    getWeather(city);
    searchHistory.push(city)
    localStorage.setItem("city", JSON.stringify(searchHistory));
    cityHistory();
    console.log("test")
};


var cityHistory = function () {
    displayCityHistoryEl.innerHTML = "";

    for (i = 0; i < searchHistory.length; i++) {
        var pastSearches = document.createElement("li");
        displayCityHistoryEl.appendChild(pastSearches);
        pastSearches.innerHTML = "<button class=btn-block>" + searchHistory[i] + "</button>"
    }

}

var buttonHandler = function (event) {
    if (cityButton.innerHTML = "submit") {
        return;
    }
    var cityButton = event.target;
    getWeather(cityButton.innerHTML);
    
}

cityHistory();


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
                        var weatherIcon = data.current.weather[0].icon;
                        var daily = data.daily;
                        currentWeather(currentTemp, currentUvi, currentWind, currentHumidity, city, weatherIcon);
                        fiveDay(daily);
                        })
                    }
                })
            })
        }
    })    
};

// display current data
var currentWeather = function(currentTemp, currentUvi, currentWind, currentHumidity, city, weatherIcon) {
    var today = new Date();
    var dd = String(today.getDate())
    var mm = String(today.getMonth() + 1)
    var yyyy = today.getFullYear();
    today = " - " + mm + '/' + dd + '/' + yyyy;
    
    var currentCity = document.getElementById("currentCity");
    currentCity.textContent = city.toUpperCase().concat(today);

    var DOM_img = document.createElement("img");
    DOM_img.src = "http://openweathermap.org/img/wn/" + weatherIcon + "@2x.png";
    currentCity.appendChild(DOM_img);

    var temp = document.getElementById("currentTemp");
    temp.textContent = "Temp: " + tempConvert(currentTemp) + " °F";

    var uvi = document.getElementById("currentUvi");
    uvi.textContent = "UVI: " + currentUvi;

    var wind = document.getElementById("currentWind");
    wind.textContent = "Wind: " + currentWind + "mph";

    var humidity = document.getElementById("currentHumidity");
    humidity.textContent = "Humidity: " + currentHumidity + "%";

    var uviCode = function (currentUvi) {
        if (currentUvi >= 8) {
            console.log(currentUvi);
            document.getElementById("currentUvi").classList = "bg-danger"
        }
        else if (currentUvi <= 7 && currentUvi >= 3) {
            document.getElementById("currentUvi").classList = "bg-warning"
        }
        else if (currentUvi <= 2) {
            document.getElementById("currentUvi").classList = "bg-success"
        }
    }

    uviCode(currentUvi);
}

// display five day forecast
var fiveDay = function(daily) {
    for (i = 1; i < 6; i++) {
        var weatherHolder = document.createElement("div")
        weatherHolder.className = ("card col-2 m-2 bg-secondary text-light");
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

        var DOM_img = document.createElement("img");
        DOM_img.src = "http://openweathermap.org/img/wn/" + daily[i].weather[0].icon + "@2x.png";
        weatherHolder.append(DOM_img);

        weatherHolderEl.className = ("row");
        weatherHolder.append(weatherDate, weatherTemp, weatherWind, weatherHumidity);
        weatherHolderEl.appendChild(weatherHolder);
    }
}


//convert temp
var tempConvert = function(temp) {
    return((temp-273.15)*(9/5) + 32).toFixed(1);
}




cityInputEl.addEventListener("submit", cityFinder);

displayCityHistoryEl.addEventListener("click", buttonHandler);
