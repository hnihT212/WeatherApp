citySearch = []

var getWeatherInfo = function (city) {
    var apiUrl = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=0e450fa9a4e7801cd2fc1c5ae48d0e9c"
    
    fetch(apiUrl).then(function (response) {
        response.json().then(function (data) {

            if (response.ok) {
                if (citySearch.includes)
            }
        })
    })
}