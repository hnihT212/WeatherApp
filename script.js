
citySearch = []
var getWeatherInfo = function (city) {
    var apiURL = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=0e450fa9a4e7801cd2fc1c5ae48d0e9c"

    fetch(apiURL).then(function (response) {
        response.json().then(function (data) {
            if (response.ok) {
                if(citySearch.includes(data.name) === false) {
                    pastSearchBtn(data.name)
                    citySearch.push(data.name)
                }
                localStorage.setItem("citySearch", JSON.stringify(citySearch))
                fetch(`https://api.openweathermap.org/data/3.0/onecall?lat=${data.coord.lat}&lon=${data.coord.lon}&units=imperial&exclude=hourly,minutely,alerts&appid=0e450fa9a4e7801cd2fc1c5ae48d0e9c`)
                    .then(function (res) {
                        res.json().then(function (data) {
                            createWeatherInfo(data, city)
                            createFiveDay(data)
                        })
                    }) 
            }

        }) 
    }) 
}
var createWeatherInfo = function (info, city) {
    var currentContainer = $("#current-result")

    currentContainer.children().remove()

    var date = $("<h2>").text(moment().format("L"))
    currentContainer.append(date)

    var cityName = $("<h3>").text(city.toUpperCase())
    currentContainer.append(cityName)

    var img = $("<img>").attr("src", "http://openweathermap.org/img/wn/" + info.current.weather[0].icon + "@2x.png")
    currentContainer.append(img)

    var temp = $("<div>").text("Temperature: " + Math.floor(info.current.temp))
    currentContainer.append(temp)

    var wind = $("<div>").text("Wind Speed: " + Math.floor(info.current.wind_speed) + " MPH")
    currentContainer.append(wind)

    var humidity = $("<div>").text("Humidity: " + info.current.humidity + "%")
    currentContainer.append(humidity)
}
var createFiveDay = function (info) {
    var fiveDayContainer = $("#five-day")
    fiveDayContainer.children().remove()

    for (var i = 1; i <= 5; i++) {
        var oneDayContainer = $("<div>")
        oneDayContainer.addClass("col-2 mx-2 bg-info rounded justify-content-center text-center card")

        var date = $("<h6>").text(moment().add(i, "days").format("L"))
        date.addClass("card-header bg-light rounded")
        oneDayContainer.append(date)

        var img = $("<img>").attr("src", "http://openweathermap.org/img/wn/" + info.daily[i].weather[0].icon + "@2x.png")
        oneDayContainer.append(img)

        var dayTemp = $("<div>").text("Temp: " + Math.floor(info.daily[i].temp.day))
        oneDayContainer.append(dayTemp)

        var windSpeed = $("<div>").text("Wind: " + Math.floor(info.daily[i].wind_speed) + " MPH")
        oneDayContainer.append(windSpeed)

        var humidity = $("<div>").text("Humidity: " + info.daily[i].humidity + "%")
        oneDayContainer.append(humidity)

        fiveDayContainer.append(oneDayContainer)
    }

}
$("#city-search").on("submit", function (event) {
    event.preventDefault();

    var cityName = $("#city-input").val().trim()
    getWeatherInfo(cityName)

    $("#city-input").val("")
})
var pastSearchBtn = function (cityName) {
    var pastSearchContainer = $("#past-seraches")
    var pastSearch = $("<button>").text(cityName).addClass("btn-secondary rounded text-dark text-center my-1 w-100 prev-search")
    pastSearchContainer.append(pastSearch)
}
$("#past-seraches").on("click", ".prev-search", function (event) {
    event.preventDefault();

    var cityName = $($(this)).text().trim()
    getWeatherInfo(cityName)
})
var loadSave = function() {
    var city = JSON.parse(localStorage.getItem("citySearch"))
    if (city){
        citySearch = JSON.parse(localStorage.getItem("citySearch"))
        for (var i = 0; i < city.length; i++) {
            pastSearchBtn(city[i])
        }
    }  
}

loadSave()
