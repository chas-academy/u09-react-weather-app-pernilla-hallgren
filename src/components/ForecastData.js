import moment from 'moment';
import { Card, Col } from 'react-bootstrap';
import { Sunrise, Sunset, ThermometerHigh, ThermometerLow } from 'react-bootstrap-icons'
import { getTempFromUnit } from '../utils';

const ForecastData = ({ forecastData, tempUnit }) => {
   
    return (
        <div>
            <Col className="justify-content-center" >  
                <Card style={{ margin: '10px', padding: '20px', justifyContent: 'center', borderRadius: '20px', backgroundColor: '#104F8A', background: 'rgba(16, 79, 138, 0.4)', boxShadow: '5px 5px 5px #04111D' }}>
                    <Card.Title>
                        <h4>{moment.unix(forecastData.dt).format('dddd')}</h4>
                    </Card.Title>
                    <Card.Img src={process.env.REACT_APP_ICON_URL + forecastData.weather[0].icon + '@2x.png'} alt='' />
                    <Card.Body>
                        <p>{forecastData.weather[0].main}</p>
                        <p>
                            <span><Sunrise style={{ marginBottom: '2px', marginRight: '2px' }}/> {new Date(forecastData.sunrise * 1000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                            <span style={{ marginLeft: '8px' }}><Sunset style={{ marginBottom: '2px', marginRight: '2px' }}/> {new Date(forecastData.sunset * 1000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                        </p>
                        <p><ThermometerHigh />{getTempFromUnit(tempUnit, forecastData.temp.day)}</p>
                        
                        <p><ThermometerLow />{getTempFromUnit(tempUnit, forecastData.temp.min)}</p>
                    </Card.Body>
                </Card>
            </Col>
                        
        </div>
    )
}

export default ForecastData;

