import './App.css';
import React, { useEffect, useState } from "react";
import moment from 'moment';
import CurrentWeatherData from './components/CurrentWeatherData';
import ForecastData from './components/ForecastData';

function App() {

  const [weatherData, setWeatherData] = useState({});
  const [city, setCity] = useState([])
  const [hourlyWeatherData, setHourlyWeatherData] = useState({});
  const [loading, setLoading] = useState('false')
  // const [currentWeatherData, setCurrentWeatherData] = useState({});
  // const [dailyWeatherData, setDailyWeatherData] = useState({});

  // GEOLOCATION 
  useEffect(() => {
      navigator.geolocation.getCurrentPosition(position => {

        const { latitude, longitude } = position.coords // destructuring
        const { REACT_APP_API_URL, REACT_APP_API_KEY, REACT_APP_API_GEO_REVERSE_URL } = process.env // destructuring 

        const removeUndefinedAndNull = value => value
        const extractEveryThirdHour = (value, index) => {
              return index % 3 === 0; 
            }   
    
        // FETCH LOCATION POSTITION BASED ON LAT AND LONG    
        fetch(`${REACT_APP_API_URL}/onecall?lat=${latitude}&lon=${longitude}&units=imperial&appid=${REACT_APP_API_KEY}`)
          .then(res => res.json())
          .then(result => {
          // .then({hourly}) => { då får jag bara ut hourly data

            // value är all data varje index postion håller i objektet
            // result.hourly döper vi den nya arrayen till som map returnerar
            result.hourly = result.hourly.map(value => {   // dot notation detta samt det ovan är två sätt att skriva det på 
              value.date = moment.unix(value.dt).format("YYYY-MM-DD HH:mm:ss"); // jag skapar ett nytt property object som heter value.date som vi sätter till dagens datum
              if(moment(value.date).isSame(moment(), 'day')) { // returnerar en boolean 
                return value // returnerar en array med samma längd många undefiend
              } 
            // filter returnerar ett värde där det totala uttrycket (boolean) är sant 
            // tex om index är 9 då får 3 plats tre gånger där och det blir == 0 över 
            // vilket är sant och den tas med i den nya arrayen
            }).filter(removeUndefinedAndNull)  // tar bort dom värderna som är undefiend 
              .filter(extractEveryThirdHour) // tar ut var 3:e timme i value arryen

            setWeatherData(result)
            // console.log(result);
          });
        });     
  }, [])

  // console.log(weatherData.lat)

  // useEffect(() => {
    
  //     // FETCH NAME OF CURRENT LOCATION BASED ON LAT & LONG 
  //     fetch(`${process.env.REACT_APP_API_GEO_REVERSE_URL}reverse?lat=${weatherData.lat}&lon=${weatherData.lon}&appid=${process.env.REACT_APP_API_KEY}`)
  //       .then(res => res.json())
  //       .then(result => {
          
  //         setCity(result.name);
          
  //       }) 
  // }, [weatherData])
  
  return  (
    
    <div className="App">
      {/* <button onClick={handleClick}>Current Location</button> */}
      <div>
        <CurrentWeatherData data={weatherData} />
            {weatherData.daily && weatherData.daily.map((forecastData, i) => {
              return i != 0 && <ForecastData forecastData={forecastData}/>
            }) 
           
        }
      </div>

    </div>
  );
}

export default App;
