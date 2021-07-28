import React from "react";

function Weather(props) {
  console.log(props);
  return (
    <div className="city">
      <h2 className="city-name">
        <span>{props.data.name}</span>
        <sup>{props.data.sys.country}</sup>
      </h2>
      <div className="city-temp">
        {Math.round(props.data.main.temp)}
        <sup>&deg;C</sup>
        <div className="info">
          <img
            className="city-icon"
            src={`https://openweathermap.org/img/wn/${props.data.weather[0].icon}@2x.png`}
            alt={props.data.weather[0].description}
          />
          <p>{props.data.weather[0].description}</p>
        </div>
      </div>
    </div>
  );
}

export default Weather;
