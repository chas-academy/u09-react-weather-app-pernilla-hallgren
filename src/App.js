import './App.css';
import React, { useEffect, useState } from "react";
import moment from 'moment';
import CurrentWeatherData from './components/CurrentWeatherData';
import ForecastData from './components/ForecastData';
import DegreeToggle from './components/DegreeToggle';
import Header from './components/Header';
import Footer from './components/Footer';

function App() {

  const [weatherData, setWeatherData] = useState({});
  // const [city, setCity] = useState([])
  const [approved, setApproved] = useState(false)
  const [tempUnit, setTempUnit] = useState('F')
  // const [loading, setLoading] = useState('false')
  
  const handleSetTempUnit = (e) => {
    const unit = e.target.dataset.unit
    setTempUnit(unit)
  }

  // GEOLOCATION 
  useEffect(() => {
      
      if(approved === false) return
      navigator.geolocation.getCurrentPosition(position => {
        
        const { latitude, longitude } = position.coords // destructuring
        const { REACT_APP_API_URL, REACT_APP_API_KEY } = process.env // destructuring 

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
            console.log(result);
          });
        }); 
  }, [approved])

  useEffect(() => {
      navigator.permissions.query({
        name: 'geolocation'
      }).then(({state}) => setApproved(state === 'granted'))
  }, [])

  // useEffect(() => {
    
  //     // FETCH NAME OF CURRENT LOCATION BASED ON LAT & LONG 
  //     fetch(`${process.env.REACT_APP_API_GEO_REVERSE_URL}reverse?lat=${weatherData.lat}&lon=${weatherData.lon}&appid=${process.env.REACT_APP_API_KEY}`)
  //       .then(res => res.json())
  //       .then(result => {
  //         setCity(result.name);
  //       }) 
  // }, [])
  
  return  (
    <div className="App">
      <main>
        <Header />
        <div>
          <h2>Today</h2>
          <DegreeToggle data={weatherData} handleChangeTempUnit={handleSetTempUnit} tempUnit={tempUnit}/>
          <CurrentWeatherData data={weatherData} tempUnit={tempUnit}/>
          </div>
          <div>
              <h2>Weakly Weather Report</h2>
                <div>
                    {weatherData.daily && weatherData.daily.map((forecastData, i) => {
                      return i !== 0 && 
                      <ForecastData forecastData={forecastData} tempUnit={tempUnit}/> 
                      }) 
                    } 
                </div>

          </div>
          <Footer />
        </main>
    </div>
  );
}

export default App;
