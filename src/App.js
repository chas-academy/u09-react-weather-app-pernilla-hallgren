import './App.css';
import React, { useEffect, useState } from "react";

console.log(process.env.REACT_APP_API_URL);

function App() {

  const [weatherData, setWeatherData] = useState([]);
  // const [currentWeatherData, setCurrentWeatherData] = useState({});
  // const [dailyWeatherData, setDailyWeatherData] = useState({});
  // const [hourlyWeatherData, setHourlyWeatherData] = useState({});

  // GEOLOCATION 
  useEffect(() => {
      navigator.geolocation.getCurrentPosition(position => {

      // FETCHA LOCATION POSTITION BASED ON LAT AND LONG    
        fetch(`${process.env.REACT_APP_API_URL}/onecall?lat=${position.coords.latitude}&lon=${position.coords.longitude}&units=imperial&exclude=minutely,alerts&appid=${process.env.REACT_APP_API_KEY}`)
          .then(res => res.json())
          .then(result => {
            setWeatherData(result)
            console.log(result);
          });
      });
    // console.log("Latitude is:", lat)
    // console.log("Longitude is:", long)
  }, [])

  return (
    <div className="App">

    </div>
  );
}

export default App;
