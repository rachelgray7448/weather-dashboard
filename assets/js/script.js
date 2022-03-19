var lat = 42.6073;
var lon = 83.9294;


var getWeather = function() {
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

// local storage city search history

getWeather();