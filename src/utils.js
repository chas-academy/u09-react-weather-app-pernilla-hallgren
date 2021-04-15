export const toCelsius = temp => Math.round((5/9) * (temp - 32))
export const getTempFromUnit = (unit, temp) => unit === 'C' ? toCelsius(temp) + '°C' : Math.round(temp) + '°F'  