const API_KEY = "b7c1cab82280c33e8abe9093c1a26b44";

// tabs
const userTab = document.querySelector('[data-userWeather]');
const searchTab = document.querySelector('[data-searchWeather]');


// containers
const searchContainer = document.querySelector('.SearchContainer');
const userInfoContainer = document.querySelector('.userInfoContainer');
const notFound = document.querySelector('.error-container');
const grantLocation = document.querySelector('.grant-Location')
const loadingContainer = document.querySelector('.loadingContainer');

// error-container elements
const errorImage = document.querySelector('[error-image]');
const errorBtn = document.querySelector('[error-button]');
const errorText = document.querySelector('[data-errorText]');


//handling tabs
let currentTab = userTab;
currentTab.classList.add('currentTab');
getFromSessionStorage();
function switchTab(newTab){
    notFound.classList.remove('active');
    if(currentTab!=newTab){
        currentTab.classList.remove('currentTab');
        currentTab = newTab;
        currentTab.classList.add('currentTab');
        if(!searchContainer.classList.contains('active')){
            searchContainer.classList.add('active');
            userInfoContainer.classList.remove('active');
            grantLocation.classList.remove('active');
        }
        else{
            searchContainer.classList.remove('active');
            userInfoContainer.classList.remove('active');
            getFromSessionStorage();
        }
    }
}

userTab.addEventListener('click',()=>{
    switchTab(userTab);
});
searchTab.addEventListener('click',()=>{
    switchTab(searchTab);
});

function getFromSessionStorage(){
    const localCoordinates = sessionStorage.getItem('userCoordinates');
    if(!localCoordinates){
        grantLocation.classList.add('active');        
    }
    else{
        const coordinates = JSON.parse(localCoordinates);
        fetchWeatherInfo(coordinates);
    }
}

// fetching api
async function fetchWeatherInfo(coordinates){
    const {lat,lon} = coordinates;
    notFound.classList.remove('active');
    grantLocation.classList.remove('active');
    loadingContainer.classList.add('active');
    try{
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}`);
        const data = await response.json();
        if(!data.sys){
            throw data;
        }
        // console.log(lat,lon);
        loadingContainer.classList.remove('active');
        userInfoContainer.classList.add('active');
        renderWeatherInfo(data);
    }
    catch(err){
        loadingContainer.classList.remove('active');
        notFound.classList.add('active');
        errorImage.style.display = 'block';
        // errorText.innerText.display =  `Error: ${err?.message}`;
        errorText.innerText = `${err?.message}`;
        errorBtn.style.display = `block`;
        errorBtn.addEventListener('click',fetchWeatherInfo);
    }
}

//display information of weather
function renderWeatherInfo(weatherInfo){
    const cityName = document.querySelector('[weather-city-name]');
    const countryFlag = document.querySelector('[country-flag]');
    const description = document.querySelector('[weather-description]');
    const weatherIcon = document.querySelector('[weather-image]');
    const temp = document.querySelector('[weather-temp]');
    const windSpeed = document.querySelector('[data-windSpeed]');
    const humidity = document.querySelector('[data-humidity]');
    const clouds = document.querySelector('[data-clouds]');

    cityName.innerText = weatherInfo?.name;
    countryFlag.src = `https://flagcdn.com/144x108/${weatherInfo?.sys?.country.toLowerCase()}.png`;
    description.innerText = weatherInfo?.weather?.[0]?.description;
    weatherIcon.src = `http://openweathermap.org/img/w/${weatherInfo?.weather?.[0]?.icon}.png`;
    temp.innerText = `${weatherInfo?.main?.temp.toFixed()} °C`;
    windSpeed.innerText = `${weatherInfo?.wind?.speed.toFixed(2)} m/s`;
    humidity.innerText = `${weatherInfo?.main?.humidity.toFixed(2)} %`;
    clouds.innerText = `${weatherInfo?.clouds?.all.toFixed(2)} %`;
}

const grantAccessButton = document.querySelector('.location-access-button');

//retrieving information of location
function getLocation(){
    if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition(showPosition);
    }
    else{
        grantAccessButton.style.display = 'none';
    }
}

function showPosition(position){
    const userCoordinates ={
        lat: position.coords.latitude,
        lon: position.coords.longitude
    };
    sessionStorage.setItem('userCoordinates',JSON.stringify(userCoordinates));
    fetchWeatherInfo(userCoordinates);
    console.log(userCoordinates);
}

grantAccessButton.addEventListener('click',getLocation);
const searchInput = document.querySelector('[data-searchInput]');


searchContainer.addEventListener('submit', (e) => {
    e.preventDefault();
    if (searchInput.value === "") {
        return;
    }
    // console.log(searchInput.value);
    fetchSearchWeatherInfo(searchInput.value);
    searchInput.value = "";
});

// fetching information of wether for searchContainer
async function fetchSearchWeatherInfo(city) {
    loadingContainer.classList.add("active");
    userInfoContainer.classList.remove("active");
    grantLocation.classList.remove("active");
    notFound.classList.remove("active");
    try {
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`);

        const data = await response.json();
        if (!data.sys) {
            throw data;
        }
        loadingContainer.classList.remove('active');
        userInfoContainer.classList.add('active');
        renderWeatherInfo(data);
        // console.log(data);
    }
    catch (err) {
        loadingContainer.classList.remove('active');
        userInfoContainer.classList.remove('active');
        if(searchTab){
            notFound.classList.add('active');
            errorText.innerText = `${err?.message}`;
            errorBtn.style.display = "none";
        }
    }
}
