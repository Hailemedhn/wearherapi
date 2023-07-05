import React, {useState} from "react";
import axios from "axios";

function App() {
  const [data,setData] = useState({
    main: {
      temp:"",
      feels_like: "",
      humidity: ""
    },
    weather:[{
      description : ""
    }
    ],
    wind:{
      speed:""
    }
  })
  const [location,setLocation] = useState("");

  const url =  "http://api.openweathermap.org/data/2.5/weather?q=" + location + "&APPID=b813b2de137c942538a58dc8d8c428f0";
  const searchLocation = (event)=> {
    if(event.key === "Enter"){
      axios.get(url).then((response) => {
        setData(response.data)
      })
      searchLocation("")
    }
  }
  return (
    <div className="app">
      <div className="search">
        <input className="input"
        value = {location}
        onChange={event => setLocation(event.target.value)}
        onKeyDown={searchLocation}
        placeholder="Enter Location"
        type = "text" />
      </div>
      <div className="container">
        <div className="top">
          <div className="location">
           {data.name ? <p>{data.name}</p> : null}
          </div> 
          <div className="temp">
            {data.main.temp ? <h1>{Math.floor(data.main.temp-273)} °C</h1> : null}
          </div> 
          <div className="description">
           {data.weather[0].description ? <p>{data.weather[0].description}</p> : null}
          </div>

        </div> 
        <div className="bottom">
          <div className="feels">
            {data.main.feels_like ? <p className="bold">{Math.floor(data.main.feels_like-273)} °C</p> : null}
            <p>Feels Like</p> 
          </div> 
          <div className="humidity">
            {data.main.humidity ? <p className ="bold">{data.main.humidity} %</p> : null}
            <p>Humidity</p>
          </div> 
          <div className="wind">
           {data.wind.speed ? <p className ="bold">{data.wind.speed} KPH</p> : null}
            <p>wind</p>
          </div>
        </div> 
      </div> 
    </div>
  );
}

export default App;
