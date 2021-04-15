
import moment from 'moment';
import { getTempFromUnit } from '../utils';
import HourlyWeatherDataCard from './HourlyWeatherDataCard';

const CurrentWeatherData = ({ data, tempUnit }) => {
    // console.log(data);
    return data.current ? 
        <div>
            {/* <h2>{data.current}</h2> */}
            <h4>{moment().format('dddd LL')}</h4>       
            <p>{new Date(data.current.dt * 1000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</p>
            {/* <h5>{new Date(data.current.dt * 1000).toLocaleDateString()}</h5> */}
            <img src={process.env.REACT_APP_ICON_URL + data.current.weather[0].icon + "@2x.png"} alt="" />
            <p>Temp: {getTempFromUnit(tempUnit, data.current.temp)}</p>
            <p>Feels like: {getTempFromUnit(tempUnit, data.current.feels_like)}</p>
            <p>Conditions: {data.current.weather[0].main} - {data.current.weather[0].description}</p>
            <p>Humidity: {data.current.humidity} %</p>
            <p>Wind Speed: {data.current.wind_speed} m/s</p>
            <p>Sunrise: {new Date(data.current.sunrise * 1000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</p>
            <p>Sunset: {new Date(data.current.sunset * 1000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</p>
            <hr/>
            <div>
                <h2>Details</h2>
                <p>{data.hourly.map((hourly, i) => {
                    return i !== 0 && 
                    <div className=''>
                        <HourlyWeatherDataCard hourly={hourly} tempUnit={tempUnit}/>
                    </div>
                })}</p>
                
            </div>
        </div>
    : null
}

export default CurrentWeatherData;