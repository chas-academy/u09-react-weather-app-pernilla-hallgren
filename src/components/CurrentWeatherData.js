
import moment from 'moment';
import { getTempFromUnit } from '../utils';
import HourlyWeatherDataCard from './HourlyWeatherDataCard';
import { Card, Col, Container, Row } from 'react-bootstrap';
import { Droplet, Sunrise, Sunset, ThermometerHalf, Wind } from 'react-bootstrap-icons';

const CurrentWeatherData = ({ data, tempUnit }) => {
    // console.log(data);
    return data.current ? 
        <div>
            <Container>
                <Card style={{ fontWeight: 'bold', width: '18rem', justifyContent: 'center', margin: '20px auto', border: 'none', background: 'none' }}>
                    <Card.Img className="fluid" src={process.env.REACT_APP_ICON_URL + data.current.weather[0].icon + "@2x.png"} alt="weather-image" />
                    <Card.Body>
                        <p>
                            <span><Sunrise style={{ marginBottom: '2px', marginRight: '2px' }}/> {new Date(data.current.sunrise * 1000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span> 
                            <span style={{ marginLeft: '4px' }}><Sunset style={{ marginBottom: '2px', marginRight: '2px' }}/> {new Date(data.current.sunset * 1000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                        </p>

                        <h3>{data.current.weather[0].main} - {data.current.weather[0].description}</h3>
                        {/* <h5>{moment().format('dddd LL')}</h5>        */}
                        {/* <p>Time: {new Date(data.current.dt * 1000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</p> */}
                        <p><ThermometerHalf /> {getTempFromUnit(tempUnit, data.current.temp)}</p>
                        <p>Feels like: {getTempFromUnit(tempUnit, data.current.feels_like)}</p>
                        <p><Droplet /> {data.current.humidity} %</p>
                        <p><Wind /> {Math.round(data.current.wind_speed)} m/h</p>
                    </Card.Body>
                </Card>
            </Container>
            
            <div>
                <h2>Details</h2>
                <Container className="fluid">
                    <Row className="text-center justify-content-center"> 
                        <Col className="justify-content-center"> 
                            <Card border="secondary" style={{ margin: '25px', padding: '20px', justifyContent: 'center', backgroundColor: '#104F8A', background: 'rgba(16, 79, 138, 0.4)', boxShadow: '5px 5px 5px #04111D', borderRadius: '20px', border: 'none' }}>
                                <p>{data.hourly.map((hourly, i) => {
                                    return i !== 0 && 
                                    <div className="houly-cards">
                                        <HourlyWeatherDataCard hourly={hourly} tempUnit={tempUnit} key={hourly.dt}/>
                                    </div>
                                })}</p>
                            </Card>
                        </Col>
                    </Row>
                </Container>
            </div>
                      
            
        </div>
    : null
}

export default CurrentWeatherData;

