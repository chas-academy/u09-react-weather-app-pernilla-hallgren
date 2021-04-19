import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useEffect, useState } from "react";
import moment from 'moment';
import { Container, Row } from 'react-bootstrap';
import CurrentWeatherData from './components/CurrentWeatherData';
import ForecastData from './components/ForecastData';
import DegreeToggle from './components/DegreeToggle';
import Header from './components/Header';
import Footer from './components/Footer';

function App() {

  const [weatherData, setWeatherData] = useState({});
  const [city, setCity] = useState([])
  const [approved, setApproved] = useState(false)
  const [tempUnit, setTempUnit] = useState('F')

  const handleSetTempUnit = (e) => {
    const unit = e.target.dataset.unit
    setTempUnit(unit)
  }

  useEffect(() => {
      
      if(approved === false) return
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
            result.hourly = result.hourly.map(value => {   
              value.date = moment.unix(value.dt).format("YYYY-MM-DD HH:mm:ss"); 
              if(moment(value.date).isSame(moment(), 'day')) {  
                return value 
              } 

            }).filter(removeUndefinedAndNull)  
              .filter(extractEveryThirdHour) 

            setWeatherData(result)
            console.log(result);
          });
        // FETCH NAME OF CURRENT LOCATION BASED ON LAT & LONG  
        fetch(`${REACT_APP_API_GEO_REVERSE_URL}reverse?lat=${latitude}&lon=${longitude}&appid=${REACT_APP_API_KEY}`)
          .then(res => res.json())
          .then(result => {
            setCity(result[0].name); 
          })
        }); 
  }, [approved])

  useEffect(() => {
      navigator.permissions.query({
        name: 'geolocation'
      }).then(({state}) => setApproved(state === 'granted'))
  }, [])

  return  (
    <div className="container-main text-center">
      <main>
          <Header />
          <hr />
            <h2>{city}</h2>
            <DegreeToggle data={weatherData} handleChangeTempUnit={handleSetTempUnit} tempUnit={tempUnit} />
            <Container className="fluid">
              <Row className="text-center justify-content-center">
                <CurrentWeatherData data={weatherData} tempUnit={tempUnit} key={weatherData.dt} />
              </Row>
            </Container>
            <h2 style={{ margin: '10px' }}>Weakly Weather Report</h2>
            <Container className="fluid">
              <Row className="text-center justify-content-center"> 
                  {weatherData.daily && weatherData.daily.map((forecastData, i) => {
                    return i !== 0 && 
                        <ForecastData forecastData={forecastData} tempUnit={tempUnit} key={forecastData.dt}/>
                    }) 
                  } 
              </Row>
            </Container> 
          <Footer />
        </main>
    </div>
  );
}

export default App;
