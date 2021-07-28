import axios from "axios";

/**
 * PwaWeatherTest
 * PwP8XCdwVG6B6Yj
 */
const URL = 'https://api.openweathermap.org/data/2.5/weather';
const API_KEY = '5e14aceab3c9ff135c2ec40278677268';

export const fetchWeather = async (query) => {
  const {data} = await axios.get(URL, { params: {q:query, units:'metric', APPID:API_KEY} })
  return data;
};

