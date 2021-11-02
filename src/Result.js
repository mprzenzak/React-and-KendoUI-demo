import React from 'react';

const Result = props => {
    const { date, city, sunrise, sunset, temp, pressure, wind, err } = props.weather;

    const sunriseTime = new Date(sunrise * 1000).toLocaleTimeString();
    const sunsetTime = new Date(sunset * 1000).toLocaleTimeString();

    return (
        <div>
            <h3>Wyniki wyszukiwania dla <em>{city}</em></h3>
            <h4>Dane dla dnia i godziny: {date}</h4>
            <h4>Temperatura: {temp} &#176;C</h4>
            <h4>Wschód słońca: {sunriseTime}</h4>
            <h4>Zachód słońca: {sunsetTime}</h4>
            <h4>Siła wiatru: {wind} m/s</h4>
            <h4>Ciśnienie: {pressure} hPa</h4>
        </div>
    );
}
 
export default Result;