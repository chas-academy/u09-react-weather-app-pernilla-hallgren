import moment from 'moment';
import { getTempFromUnit } from '../utils';


const HourlyWeatherDataCard = ({ hourly, tempUnit }) => {

    return hourly.date !== moment().format('HH:mm:ss') ?
        <div>
            <p>Time: {moment(hourly.date).format('HH:mm')} </p>
            <img src={process.env.REACT_APP_ICON_URL + hourly.weather[0].icon + "@2x.png"} alt=""/>
            <p>Conditions: {hourly.weather[0].main} - {hourly.weather[0].description}</p>
            <p>Temp: {getTempFromUnit(tempUnit, hourly.temp)}</p>
            <p>Feels like: {getTempFromUnit(tempUnit, hourly.feels_like)}</p>
            <p>Humidity: {hourly.humidity} %</p>
            <p>Wind Speed: {hourly.wind_speed} m/s</p>
            <hr/>
        </div>
    : null
}

export default HourlyWeatherDataCard;