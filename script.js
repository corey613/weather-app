var btn = document.getElementById("submit");
var inputValue = document.getElementById("inputValue");
var backgroundC = document.getElementById("container");
var weatherCont = document.getElementById("weather");

var cityName = document.getElementById("city");
var currentDate = document.getElementById("date");
var temp = document.getElementById("temp");
var forcast = document.getElementById("forcast");
var hiLow = document.getElementById("hiLow");




const api = {
    key : "74df72e1c8e62b6a7b9e999c556337b6",
    base: "https://api.openweathermap.org/data/2.5/",
}

inputValue.addEventListener("keypress", setKey);
btn.addEventListener("click", getInput);





function setKey(evt){
    if(evt.keyCode == 13){
          findResults(inputValue.value);
    }
}

function findResults(query){
    fetch(`${api.base}weather?q=${query}&units=metric&APPID=${api.key}`)
    .then(weather => {
        return weather.json();
    }).then(showResults);
}

function getInput(){
    findResults(inputValue.value);
}

function showResults(weather){
    console.log(weather);
    cityName.innerText=`${weather.name}`;
    if(`${weather.name}` == "undefined"){
        weatherCont.style.display = "none";
        cityName.style.display = "block";
        cityName.innerText= "Not Found";
    }

    let now = new Date();
    currentDate.innerText= dateBuilder(now);
    temp.innerText = `${Math.round(weather.main.temp)}°c`;

    if (`${Math.round(weather.main.temp)}` > 15 ){
        backgroundC.style.background = "url(/img/hot.jpg)"; 
     }  
    if(`${Math.round(weather.main.temp)}` < 15 ){
        backgroundC.style.background = "url(/img/mid.jpg)";
     }  
    if (`${Math.round(weather.main.temp)}` <= 0 ){
       backgroundC.style.background = "url(/img/cold.jpg)";
    } 
   
   



    forcast.innerText= `${weather.weather[0].main}`;
    hiLow.innerText = `${Math.round(weather.main.temp_min)}°c / ${Math.round(weather.main.temp_max)}°c`;
}



function dateBuilder (d) {
    let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  
    let day = days[d.getDay()];
    let date = d.getDate();
    let month = months[d.getMonth()];
    let year = d.getFullYear();
  
    return `${day} ${date} ${month} ${year}`;
  }
