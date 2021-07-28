import React from "react";
import { useState } from "react";
import { fetchWeather } from "./api/fetchWeather";
import "./App.css";
import Weather from "./Weather";

const App = () => {
  const [query, setQuery] = useState("");
  const [weather, setWeather] = useState({});

  const search = async (e) => {
    if (e.key === "Enter") {
      const data = await fetchWeather(query);
      setQuery("");
      setWeather(data);
    }
  };
  return (
    <div className="main-container">
      <input
        type="text"
        className="search"
        placeholder="Search..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onKeyPress={search}
      ></input>
      {weather.main && (
      <Weather data={weather}></Weather>
      )}
    </div>
  );
};

export default App;
