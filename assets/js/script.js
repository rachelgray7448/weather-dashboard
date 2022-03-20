var cityInputEl = document.querySelector("#cityinput");




var getWeather = function(lat, lon, cityname) {
    var apiUrl = "https://api.openweathermap.org/data/2.5/onecall?lat=" + lat + "&lon=" + lon + "&exclude=minutely&appid=f40ba3cdc60652f681607937c3b81a09";
    fetch(apiUrl).then(function(response) {

        if(response.ok) {
            response.json().then(function(data) {
                //pass response
                console.log(data);
            })
        }
    })
    }

var getCity = function(cityname){
    var apiUrl = "https://api.openweathermap.org/data/2.5/weather?q={cityname}&appid=f40ba3cdc60652f681607937c3b81a09";
    fetch(apiUrl).then(function(response) {
        if (response.ok) {
            response.json().then(function(data) {
                console.log(data);
                var lat = data.coord.lat;
                var lon = data.coord.lon;
                getWeather(lat, lon, cityname)
            })
        }
    })
}

var cityFinder = function(event) {
    event.preventDefault();
    var city = cityInputEl.value.trim();
    getCity(city);
};

// local storage city search history

cityInputEl.addEventListener("submit", cityFinder)

getWeather();