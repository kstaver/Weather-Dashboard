let leftColumnEL = document.querySelector("#left-column");

let citiesListContainerBtnEl = document.querySelector(".list-group-item");

let dailyWeatherContainerEl = document.querySelector("#forecast-output-container"); 

let dynFormContainer = document.createElement("form");
dynFormContainer.setAttribute("id", "dymCityForm");
dynFormContainer.classList = "city-search-forecast-container";
leftColumnEL.appendChild(dynFormContainer)

let formH3 = document.createElement("h3");
formH3.textContent = "Search for a City";
formH3.style.fontWeight = 'bold';
dynFormContainer.appendChild(formH3);

let formInput = document.createElement("input");
formInput.setAttribute("id", "city-name")
formInput.setAttribute("type", "text");
formInput.setAttribute("autofocus", "true");
formInput.classList = "form-input";
dynFormContainer.appendChild(formInput);

let formButton = document.createElement("button");
formButton.setAttribute("type", "submit");
formButton.classList= ("btn fas fa-search");
dynFormContainer.appendChild(formButton);

let seachEventHanglerEl = document.querySelector("#dymCityForm");
let searchByCityEl = document.querySelector("#city-name");

let citiesContainerEl = document.createElement("div");
citiesContainerEl.setAttribute("id", "dym-cities-list");
citiesContainerEl.classList = "list-group";

leftColumnEL.appendChild(citiesContainerEl);

let citiesListContainerEl = document.querySelector("#dym-cities-list");

var populateSavedCities = function() {
       
       let citiesLocalStorage = JSON.parse(localStorage.getItem("savedCities"));

       let cityExist = 0;
         
       if (citiesLocalStorage === null) {
                      
       } else { 

       $(".list-group-item").remove(); 
           
        for (i=0; i< citiesLocalStorage.length;i++) {

            let cityNameEl = document.createElement("a")
            let splitCityText = "";
            cityNameEl.setAttribute("href", "#");
            cityNameEl.setAttribute("data-city", citiesLocalStorage[i]);
            cityNameEl.setAttribute("id", citiesLocalStorage[i]);
            cityNameEl.setAttribute("role", "button");
            cityNameEl.classList = "list-group-item list-group-item-action list-group-item-primary";
            cityNameEl.textContent = citiesLocalStorage[i];
              
            citiesContainerEl.appendChild(cityNameEl);
        };      
    };
};

function fetchSecondCall(searchByCity, latNum, lonNum, unixTimeCurrentDay, currentDayIcon, currentTempImperial, currentHumidity, currentMPS, mphWindSpeed) {

    let openWeatherApiFiveDayUrl =  "https://api.openweathermap.org/data/2.5/onecall?lat=" + latNum + "&lon=" + lonNum + "&appid=32a27c42260b02de3ba5e1466def4861&units=imperial";
    
    fetch( 
        openWeatherApiFiveDayUrl
    )
    .then(function (response) {
      return response.json();
    })
    .then(function (secondCallData) {
        
        let uvIndex = secondCallData.current.uvi;
        
        let unix_timestamp = unixTimeCurrentDay;
        
        var date = new Date(unix_timestamp * 1000);
        
        var year = date.getFullYear(); 
        var monthOfYear = date.getMonth() + 1; 
        var dayOfMonth = date.getDate();
        var fullDayDaily = "(" + monthOfYear + "/" + dayOfMonth + "/"  + year + ")";      
                
        populateCurrentDayHtml(searchByCity, fullDayDaily, currentDayIcon, currentTempImperial, currentHumidity, currentMPS, mphWindSpeed, uvIndex);
        
        populate5DayForecast(secondCallData);
    });
};

function populateCurrentDayHtml(searchByCity, fullDayDaily, currentDayIcon, currentTempImperial, currentHumidity, currentMPS, mphWindSpeed, uvIndex) {
    
    let dailyForecastContainerEl = document.createElement("div");
    dailyForecastContainerEl.setAttribute("id", "daily-forecast-container");
    dailyForecastContainerEl.classList = "borderDiv";

    let currentDayTitle = document.createElement("h3");
    currentDayTitle.textContent = ( searchByCity.charAt(0).toUpperCase() + searchByCity.slice(1) + " " + fullDayDaily);

    let currentIconEl = document.createElement("span")
   
    let currentIconSymbol = "http://openweathermap.org/img/wn/" + currentDayIcon + "@2x.png";
    currentIconEl.innerHTML = "<img src=" + currentIconSymbol + "></img>";
    currentDayTitle.append(currentIconEl);
    
    let currentTempEl = document.createElement("p");
    let currentHumidityEl = document.createElement("p");
    let currentWinSpEl = document.createElement("p");
    let currentUvIEl = document.createElement("p");
    let uvISpan = document.createElement("span");
    let uvISpan2 = document.createElement("span");
    
    currentTempEl.textContent = "Temperature: " + (currentTempImperial.toFixed(1)) + " °F";
    currentHumidityEl.textContent = "Humidity: " + currentHumidity + "%";
    currentWinSpEl.textContent = "Wind Speed: " + currentMPS + " MPH";

    uvISpan.textContent = "UV Index: ";
    uvISpan2.textContent = uvIndex;

    if(uvIndex < 3 ){
      uvISpan2.className = "low";
    }else if (uvIndex < 6 ){
      uvISpan2.className = "medium";
    }else if(uvIndex < 8){
      uvISpan2.className = "high";
    }else if(uvIndex < 10){
      uvISpan2.className = "very-high";
    }else{
      uvISpan2.className = "extremely-high";
    }

    $("#daily-forecast-container").remove(); 
    
    dailyWeatherContainerEl.appendChild(dailyForecastContainerEl);
    dailyForecastContainerEl.appendChild(currentDayTitle);
    dailyForecastContainerEl.appendChild(currentTempEl);
    dailyForecastContainerEl.appendChild(currentHumidityEl);
    dailyForecastContainerEl.appendChild(currentWinSpEl);
    dailyForecastContainerEl.appendChild(uvISpan);
    dailyForecastContainerEl.appendChild(uvISpan2);

};

function populate5DayForecast(secondCallData) {
    
    $("#weekly-forecast-container").remove(); 

    let weeklyForecastContainerEl = document.createElement("div");
    weeklyForecastContainerEl.setAttribute("id", "weekly-forecast-container");
    
    weeklyForecastContainerEl.classList = "border-Div-right-column"; 

    let fiveDayForecast = document.createElement("h3");
    fiveDayForecast.textContent = "5-Day Forecast:"

    dailyWeatherContainerEl.appendChild(weeklyForecastContainerEl);
    weeklyForecastContainerEl.appendChild(fiveDayForecast);
    
    let weeklyFlexContainerEL = document.createElement("div");
    weeklyFlexContainerEL.classList = "weekly-flex-conatiner"
    
    weeklyForecastContainerEl.appendChild(weeklyFlexContainerEL);

    for (i=1; i <= 5; i++) { 
        let unixTime = secondCallData.daily[i].dt;
        
        let unix_timestamp = unixTime;
            
        var date = new Date(unix_timestamp * 1000);
        
        var year = date.getFullYear();
        var monthOfYear = date.getMonth() + 1;
        var dayOfMonth = date.getDate();
    
        var fullDay = (monthOfYear) + "/" + dayOfMonth + "/"  + year; 
        var iconWeather = secondCallData.daily[i].weather[0].icon 
        let fahrenheitTemp = secondCallData.daily[i].temp.day 
        let humidity = secondCallData.daily[i].humidity;
        let windSpeed = secondCallData.daily[i].wind;
        
        let eachDayContainer = document.createElement("div");
        eachDayContainer.setAttribute("id", ("day=" + [i]));
        eachDayContainer.classList = "border-div-five-day-forecast";
       
        let currentDayTitle = document.createElement("p");
        currentDayTitle.textContent = (fullDay);

        let iconSpan = document.createElement("p");
        iconSpan.textContent = "";

        let currentIconEl = document.createElement("span")
        let currentIconSymbol = "http://openweathermap.org/img/wn/" + iconWeather + "@2x.png";
        
        currentIconEl.innerHTML = "<img src=" + currentIconSymbol + "></img>";
        iconSpan.append(currentIconEl)
        
        let currentTempEl = document.createElement("p");
        let currentHumidityEl = document.createElement("p");
        let currentWinSpEl = document.createElement("p");
        
        currentTempEl.textContent = "Temperature: " +  (fahrenheitTemp.toFixed(2)) + " °F";
        currentHumidityEl.textContent = "Humidity: " + humidity + "%";
        currentWinSpEl.textContent = "Wind Speed: " + windSpeed+ "mps";
           
        eachDayContainer.appendChild(currentDayTitle);
        eachDayContainer.appendChild(currentIconEl);
        eachDayContainer.appendChild(currentTempEl);
        eachDayContainer.appendChild(currentHumidityEl);
        
        weeklyFlexContainerEL.appendChild(eachDayContainer);
    };
};

var getWeatherData = function(event , cityClicked) {
    
    event.preventDefault() 

    if (cityClicked) {
         
        var searchByCity = cityClicked.trim();
    } else { 
        
        var searchByCity = searchByCityEl.value.trim();        
    };

    if (searchByCity == "") {
        
        alert("Please do not leave city name blank.");
        searchByCityEl.value = "";
        return 
    } else {  
        
        searchByCityEl.value = "";
    };
         
    let citiesLocalStorage = JSON.parse(localStorage.getItem("savedCities"));
    
    let cityExist = 0;

    if (citiesLocalStorage === null) {
        
        citiesSearched =  new Array();
        
    } else { 
        
        citiesSearched = citiesLocalStorage;
    };
 
    let openWeatherApiUrl = "https://api.openweathermap.org/data/2.5/weather?q=" + searchByCity + "&appid=32a27c42260b02de3ba5e1466def4861&units=imperial";

    fetch(openWeatherApiUrl).then(function (weatherResponse) {
        
        if(weatherResponse.ok) { 
            
            return weatherResponse.json();
        } else {
            
            window.alert("Error: " + weatherResponse.statusText + "\nPlease re-enter a valid city");
            
            searchByCityEl.value = "";
            
            return;
        }
    }).then(function (weatherLatLon) {
        
        let latNum = weatherLatLon.coord.lat;
        let lonNum = weatherLatLon.coord.lon;
        let unixTimeCurrentDay = weatherLatLon.dt;
        let currentDayIcon = weatherLatLon.weather[0].icon;
        let currentTempImperial = weatherLatLon.main.temp;
        let currentHumidity = weatherLatLon.main.humidity;
        let currentMPS = weatherLatLon.wind.speed;
        let mphWindSpeed = Math.round(currentMPS * 2.237);
    
        for (i=0; i < citiesSearched.length; i++) {

            if (searchByCity.toLowerCase() === citiesSearched[i].toLowerCase()) {
                
                cityExist =1
                break;
            };
        };
        
        if (cityExist === 0) {
            
            citiesSearched.push(searchByCity.toLowerCase().split(' ').map(word => word.charAt(0).toUpperCase() + word.substring(1)).join(' '));
            
            localStorage.setItem("savedCities", JSON.stringify(citiesSearched));
        }
        
        fetchSecondCall(searchByCity.toLowerCase().split(' ').map(word => word.charAt(0).toUpperCase() + word.substring(1)).join(' '), latNum, lonNum, unixTimeCurrentDay, currentDayIcon, currentTempImperial, currentHumidity, currentMPS, mphWindSpeed);
              
        populateSavedCities(); 
      }).catch(function(error) { 
          
        return;
      });
};

seachEventHanglerEl.addEventListener("submit",getWeatherData);

var cityClicked = function (event) {
     
    let cityClicked = event.target.getAttribute("data-city");

    if (cityClicked){
        getWeatherData(event, cityClicked);
    } else {
        alert("Internal erro found, please email esroleo@gmail.com.\nPlease provide story of issue in order for it to be fixed");
    };
};

citiesContainerEl.addEventListener("click", cityClicked);

populateSavedCities();


