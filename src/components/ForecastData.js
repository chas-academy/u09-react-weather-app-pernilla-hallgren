import moment from 'moment';
import { getTempFromUnit } from '../utils';

const ForecastData = ({ forecastData, tempUnit }) => {
    // console.log(forecastData)
   
    return (
      
        <div>
            <h4>{moment.unix(forecastData.dt).format('dddd LL')}</h4> 
            <img src={process.env.REACT_APP_ICON_URL + forecastData.weather[0].icon + '@2x.png'} alt='' />
            <p>Temp: {forecastData.temp.day} - Temp.min {forecastData.temp.min}</p>
            <p>Sunrise: {new Date(forecastData.sunrise * 1000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</p>
            <p>Sunset: {new Date(forecastData.sunset * 1000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</p>
            <hr/>
        </div>
    )
}

export default ForecastData;