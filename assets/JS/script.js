let leftColumnEl = document.querySelector("#left-column");
let citiesListContainerBtnEl = document.querySelector(".list-group-item");
let dailyWeatherContainerEl = document.querySelector("#forecast-output-container");

let dynFormContainer = document.createElement("form");
dynFormContainer.setAttribute("id", "dymCityForm");
dynFormContainer.classList = "city-search-forecast-container";
leftColumnEl.appendChild(dynFormContainer);

let formH3 = document.createElement("h3");
formH3.textContent = "Search for a City";
dynFormContainer.appendChild(formH3);

let formInput = document.createElement("input");
formInput.setAttribute("id", "city-name");
formInput.setAttribute("type", "text");
formInput.setAttribute("autofocus", "true");
formInput.classList = "form-input";
dynFormContainer.appendChild(formInput);

let formButton = document.createElement("button");
formButton.setAttribute("type", "submit");
formButton.classList = ("btn fas fa-search");
dynFormContainer.appendChild(formButton);

let searchEventHanglerEl = document.querySelector("#dymCityForm");
let searchByCityEl = document.querySelector("#city-name");

let citiesContainerEl = document.querySelector("dymCityForm");
citiesContainerEl.setAttribute("id", "dym-cities-list");
citiesContainerEl.classList = "list-group";

leftColumnEl.appendChild(citiesContainerEl);

let citiesListContainerBtnEl = document.querySelector("dym-cities-list");

var populateSavedCities = function(){

    let citiesLocalStorage = JSON.parse(localStorage.getItem("savedCities"));

    let cityexist = 0;

    if(citiesLocalStorage === null){

    } else{

        $(".list-group-item").remove();

        for (i=0; i < citiesLocalStorage.length; i++){

            let cityNameEl = document.createElement("a");
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
