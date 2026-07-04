const apiKey = "YOUR_API_KEY";

const cityInput = document.getElementById("city");
const searchBtn = document.getElementById("searchBtn");

const cityName = document.getElementById("cityName");
const temperature = document.getElementById("temperature");
const humidity = document.getElementById("humidity");
const wind = document.getElementById("wind");
const condition = document.getElementById("condition");
const error = document.getElementById("error");

async function getWeather(city){

    try{

        error.textContent = "";

        const response = await fetch(
            `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`
        );

        if(!response.ok){
            throw new Error("City not found");
        }

        const data = await response.json();

        cityName.textContent = `${data.name}, ${data.sys.country}`;

        temperature.textContent =
            `🌡 Temperature : ${data.main.temp} °C`;

        humidity.textContent =
            `💧 Humidity : ${data.main.humidity}%`;

        wind.textContent =
            `🌬 Wind Speed : ${data.wind.speed} m/s`;

        condition.textContent =
            `☁ Weather : ${data.weather[0].description}`;

    }
    catch(err){

        cityName.textContent="";
        temperature.textContent="";
        humidity.textContent="";
        wind.textContent="";
        condition.textContent="";

        error.textContent = err.message;
    }

}

searchBtn.addEventListener("click",()=>{

    const city = cityInput.value.trim();

    if(city===""){
        error.textContent="Please enter a city name.";
        return;
    }

    getWeather(city);

});

cityInput.addEventListener("keypress",(e)=>{

    if(e.key==="Enter"){

        searchBtn.click();

    }

});
