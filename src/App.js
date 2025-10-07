import { useState } from "react";
import WeatherCard from "./components/WeatherCard";
import SearchBar from "./components/SearchBar";
import { fetchWeatherByCity, fetchWeatherByCoords } from "./services/weatherApi";
import "./App.css";

function App() {
  const [weather, setWeather] = useState(null);
  const [units, setUnits] = useState("metric"); // "metric" °C, "imperial" °F
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  
  async function handleSearch(city) {
  setLoading(true);
  setError("");           // clear any error that had occured before

  try {
    const data = await fetchWeatherByCity(city, units);
    setWeather(data);                    // store weather information
  } catch (err) {
    setWeather(null);                   // clear any old data
    setError(err.message || "Something went wrong");
  } finally {
    setLoading(false);                 // stop it from loading
  }
}
async function handleUseMyLocation() {
    if (!navigator.geolocation) {
      setError("Geolocation is not supported by your browser.");
      return;
    }

    setLoading(true);
    setError("");

    navigator.geolocation.getCurrentPosition(
      async (pos) => {
        try {
          const { latitude, longitude } = pos.coords;
          const data = await fetchWeatherByCoords(latitude, longitude, units);
          setWeather(data);
        } catch (err) {
          setWeather(null);
          setError(err.message || "Failed to fetch current location weather");
        } finally {
          setLoading(false);
        }
      },
      (geoErr) => {
        setLoading(false);
        setError(geoErr.message || "Unable to retrieve your location");
      }
    );
  }

  return (
    <div className="App">
      <h1>React Weather</h1>

      {/* Controls: search, units, location */}
      <div className="controls">
        <SearchBar onSearch={handleSearch} />
        <select
          value={units}
          onChange={(e) => setUnits(e.target.value)}
          aria-label="Units"
        >
          <option value="metric">°C</option>
          <option value="imperial">°F</option>
        </select>
        <button onClick={handleUseMyLocation}>Use my location</button>
      </div>

      {/* Loader, error, and weather display */}
      {loading && <p>Loading...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}
      <WeatherCard data={weather} />
    </div>
  );
}

export default App;



