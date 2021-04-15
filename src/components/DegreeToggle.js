
const DegreeToggle = ({ data, handleChangeTempUnit, tempUnit }) => {
    console.log(tempUnit)
    // const condition = data.current
    // const time = new Date(data.dt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    // const allDates = new Date(data.dt).toLocaleDateString()
    // const todaysDate = new Date().toLocaleDateString()
    
    // const switchToC = () => setOption('celsius')
    // const switchToF = () => setOption('fahrenheit')

    return (
        <div>
            <label>°F &nbsp;
                <input type="radio" value="f" data-unit="F" checked={tempUnit === 'F'} onClick={handleChangeTempUnit}></input>
            </label> &nbsp;

            <label>°C &nbsp;
                <input type="radio" value="c" data-unit="C" checked={tempUnit === 'C'} onClick={handleChangeTempUnit}></input>
            </label>

            {/* <p>Conditions: {data.weather[0].main} - {data.weather[0].description}</p>
            <p>Temperature: {option === 'fahrenheit' ? `${Math.round(condition.temp)} °F` : `${toCelsius(condition.temp)} °C `} </p>
            <p>Min temp: {option === 'fahrenheit' ? `${Math.round(condition.temp_min)} °F` : `${toCelsius(condition.temp_min)} °C `} </p>
            <p>Max temp: {option === 'fahrenheit' ? `${Math.round(condition.temp_max)} °F` : `${toCelsius(condition.temp_max)} °C `}</p>
            <p>Feels like: {option === 'fahrenheit' ? `${Math.round(condition.feels_like)} °F` : `${toCelsius(condition.feels_like)} °C `}</p>
            <p>Humidity: {condition.humidity} %</p>
            <p>Wind Speed: {condition.wind} m/s</p> */}
        </div>

        
    )
}

export default DegreeToggle;