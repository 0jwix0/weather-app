let container = document.querySelector(".weather_card");
let search = document.querySelector("#apply");
let input = document.querySelector("#search");
let weather_icon = document.querySelector(".weather-icon");
let weather_temp = document.querySelector(".weather-temp");
let weather_card = document.querySelector(".weather-card");
let weather_data = document.querySelector(".weather-data")

let unit = "metric";
const unit_letters = ["°C", "°F", "°K", "KM/h", "M/h"];
let chosen_letters = [unit_letters[0], unit_letters[3]];

document.querySelectorAll("input[name='unit_temp']").forEach(unitRadio => {
    unitRadio.addEventListener("change", (event) => {
        if (event.target.checked) {
            switch (event.target.className) {
                case "metric":
                    chosen_letters[0] = unit_letters[0];
                    chosen_letters[1] = unit_letters[3];
                    unit = "metric";
                    console.log(`Changed to ${event.target.className}`);
                    break;
                case "imperial":
                    chosen_letters[0] = unit_letters[1];
                    chosen_letters[1] = unit_letters[4];
                    unit = "imperial";
                    console.log(`Changed to ${event.target.className}`);
                    break;
                case "scientific":
                    chosen_letters[0] = unit_letters[2];
                    chosen_letters[1] = unit_letters[3];
                    unit = "standard";
                    console.log(`Changed to ${event.target.className}`);
                    break;
            }
        }
    });
});

let intervalId;
let iteration = 0

search.addEventListener("click", () => {
    clearInterval(intervalId); // Clear the previous interval
    const apikey = "1bf1250f4069f2a707b4701764d48953";
    const city = input.value;
    iteration++;

    async function checkweather() {
        const Response = await fetch(`https://api.openweathermap.org/data/2.5/weather?units=${unit}&q=${city}&appid=${apikey}`);
        let data = await Response.json();
        if (data.cod == "404" || data.cod == "400") {
            console.log("ERROR")
        } else {
            weather_temp.style.opacity = "0";
            document.querySelector(".humid_value").style.opacity = "0";
            document.querySelector(".wind_value").style.opacity = "0";

            setTimeout(function() {
                weather_temp.textContent = `${Math.floor(data.main.temp)} ${chosen_letters[0]}`;
                document.querySelector(".humid_value").textContent = `${Math.floor(data.main.humidity)}%`;
                document.querySelector(".wind_value").textContent = `${parseFloat(data.wind.speed).toFixed(1)} ${chosen_letters[1]}`;

                weather_temp.style = "opacity: 1";
                document.querySelector(".humid_value").style = "opacity: 1";
                document.querySelector(".wind_value").style = "opacity: 1";

                d = new Date();
                localTime = d.getTime();
                localOffset = d.getTimezoneOffset() * 60000;
                utc = localTime + localOffset;
                var city_time = utc + (1000 * data.timezone);
                nd = new Date(city_time);
                let nd_value = nd.getHours();

                if (nd_value >= 6 && nd_value < 20) {
                    document.querySelector("body").style.backgroundColor = "#ff9100";
                } else {
                    document.querySelector("body").style.backgroundColor = "#524d46";
                }

                const hour = document.querySelector("#hours");
                const minute = document.querySelector("#minutes");
                const seconds = document.querySelector("#seconds");

                let hr = nd.getHours();
                let min = nd.getMinutes();
                let sec = nd.getSeconds();

                intervalId = setInterval(function time() {
                    if (sec.toString().length == 1) {
                        sec = "0" + sec;
                    }

                    if (min.toString().length == 1) {
                        min = "0" + min;
                    }

                    if (hr.toString().length == 1) {
                        hr = "0" + hr;
                    }

                    hour.textContent = hr;
                    minute.textContent = min;
                    seconds.textContent = sec;

                    sec++;
                    if (sec >= 60) {
                        sec = 0;
                        min++;
                        if (min >= 60) {
                            min = 0;
                            hr++;
                            if (hr >= 24) {
                                hr = 0
                            }
                        }
                    }
                }, 1000);

                switch(data.weather[0].description){
                    case "clear sky":
                        if (nd_value >= 6 && nd_value < 20){
                            weather_icon.src = "images/clear.png";
                        }else{
                            weather_icon.src = "images/clear night.png";
                        }
                        break;
                    case "few clouds":
                        if (nd_value >= 6 && nd_value < 20){
                            weather_icon.src = "images/few clouds.png";
                        }else{
                            weather_icon.src = "images/few clouds night.png";
                        }
                        break;
                    case "scattered clouds":
                        weather_icon.src = "images/schatered clouds.png";
                        break;
                    case "broken clouds":
                        weather_icon.src = "images/broken clouds.png";
                        break;
                    case "shower rain":
                        weather_icon.src = "images/shower rain.png";
                        break;
                    case "rain":
                        weather_icon.src = "images/rain.png";
                        break;
                    case "thunderstorm":
                        weather_icon.src = "images/thunderstorm.png";
                        break;
                    case "snow":
                        weather_icon.src = "images/snow.png";
                        break;
                    case "mist":
                        weather_icon.src = "images/mist.png";
                        break;
                    case "overcast clouds":
                        weather_icon.src = "images/broken clouds.png";
                        break;
                    case "moderate rain":
                        weather_icon.src = "images/shower rain.png";
                        break;
                    case "light rain":
                        weather_icon.src = "images/rain.png";
                        break;
                    case "heavy intensity rain":
                        weather_icon.src = "images/shower rain.png";
                        beak;
                        case "heavy rain":
                            weather_icon.src = "images/shower rain.png";
                            beak;
                }

                let date_sunrise = new Date (data.sys.sunrise * 1000).toString();
                console.log(date_sunrise);
                let sunrise = date_sunrise.slice(16,21);
    
                let date_sunset = new Date (data.sys.sunset * 1000).toString();
                console.log(date_sunset);
                let sunset = date_sunset.slice(16,21);

                weather_icon.style.display = "block";
    
                document.querySelector("#wind_direction img").style.rotate = `${data.wind.deg-180}deg`;
                document.querySelector(".max").textContent = `${Math.floor(data.main.temp_max)} ${chosen_letters[0]}`;
                document.querySelector(".min").textContent = `${Math.floor(data.main.temp_min)} ${chosen_letters[0]}`;
                document.querySelector(".feels_like").textContent = `${Math.floor(data.main.feels_like)} ${chosen_letters[0]}`;
                document.querySelector("#sun_rise p").textContent = sunrise;
                document.querySelector("#sun_set p").textContent = sunset;
                if (chosen_letters[1] == "KM/h"){
                    document.querySelector("#visibility p").textContent = `${(data.visibility/1000).toFixed(1)} km`;
                }else{
                    document.querySelector("#visibility p").textContent = `${((data.visibility*0.621371)/1000).toFixed(1)} M`
                }
            }, 500);

        }
        
    }
    checkweather();
});

let a = 1;

let timeline = gsap.timeline({defaults: {duration: .07}});
function advanced(){
    if (a === 1){
        console.log("starting 1");
        timeline
            .to(weather_card,{width: "99%",height: "900px", ease: "none"})
            .to(document.querySelector(".weth_icon_cont"),{x:"-780px", y:"-240px",ease:"none"})
            .to(document.querySelector(".temp_container"), {x: "-400px", y: "-480px", ease: "none"})
            .to(weather_data,{x:"-400px",y:"-480px",ease:"none"})
            .to(document.querySelector(".input_ui") , {x:"84%",y:"-170%", ease: "none"})
            .to(input,{width:"600px"})
            .to(document.querySelector(".advanced_options"),{opacity:"1",display:"flex"})
            .to(document.querySelector("#clock"),{opacity: "1"});
            a=2;
            console.log("finished 1");
    } else {
        if (a === 2) {
            console.log("starting 2");
            document.querySelector(".advanced_options").style.display = "none";
            timeline.reverse();
            document.querySelector
            a = 1;
            timeline = gsap.timeline({defaults: {duration: .07}});
            setTimeout(() => {
                
                weather_card.style.width = "700px"
            }, 520);
            console.log("finished 2");
        }
    }
}

let b = true;

function settings(){
    if(b){
        document.querySelector(".consol").style.opacity = "1";
        b= false;
    }else{
        document.querySelector(".consol").style.opacity = "0";
        b = true;
    }
}