import moment from 'moment';
import { Card } from 'react-bootstrap';
import { Droplet, Sunrise, Sunset, ThermometerHalf, Wind} from 'react-bootstrap-icons';
import { getTempFromUnit } from '../utils';


const HourlyWeatherDataCard = ({ hourly, tempUnit }) => {

    return hourly.date !== moment().format('HH:mm:ss') ?
        <div>
            <h5>{moment(hourly.date).format('HH:mm')} </h5>
            <Card.Img src={process.env.REACT_APP_ICON_URL + hourly.weather[0].icon + "@2x.png"} alt="weather-image" />
            <Card.Body>
                <p style={{ fontSize: '20px'}}>{hourly.weather[0].main}</p>
                <p><ThermometerHalf /> {getTempFromUnit(tempUnit, hourly.temp)}</p>
                <p>Feels like: {getTempFromUnit(tempUnit, hourly.feels_like)}</p>
                <p><Droplet /> {hourly.humidity} %</p>
                <p><Wind /> {Math.round(hourly.wind_speed)} m/s</p>
            </Card.Body>
        </div>
    : null
}

export default HourlyWeatherDataCard;