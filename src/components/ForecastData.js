

const ForecastData = ({ forecastData }) => {

    return (
        <div>
            <p>Temp: {forecastData.temp.day}</p>
            {/* <p>Sunrise: {new Date(forecastData.sunrise * 1000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</p>
            <p>Sunset: {new Date(forecastData.sunset * 1000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</p> */}

        </div>



    )
}

export default ForecastData;