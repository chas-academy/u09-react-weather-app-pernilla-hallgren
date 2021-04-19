
const DegreeToggle = ({ handleChangeTempUnit, tempUnit }) => {

    return (
        <div style={{ fontSize: '18px' }}>
            <label>°F &nbsp;
                <input type="radio" value="f" data-unit="F" checked={tempUnit === 'F'} onClick={handleChangeTempUnit}></input>
            </label> &nbsp;

            <label>°C &nbsp;
                <input type="radio" value="c" data-unit="C" checked={tempUnit === 'C'} onClick={handleChangeTempUnit} ></input>
            </label>
        </div>       
    )
}

export default DegreeToggle;