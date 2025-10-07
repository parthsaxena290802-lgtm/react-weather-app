export async function fetchWeatherByCity(city, units = "metric") {
    const API_KEY= process.env.REACT_APP_OPENWEATHER_KEY;

    const url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(
    city
    )}&appid=${API_KEY}&units=${units}`;

  const res = await fetch(url);
  const data = await res.json().catch(() => ({}));  //.catch(() => ({}));--safely handle cases where the response isn’t valid JSON, returning {} instead of crashing.   
  if (!res.ok) {
    throw new Error(data?.message || "Failed to fetch ");
  }
  return data;
}

export async function fetchWeatherByCoords(lat, lon, units = "metric") {
  const API_KEY = process.env.REACT_APP_OPENWEATHER_KEY;
  const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=${units}`;

  const res = await fetch(url);
  const data = await res.json().catch(() => ({}));

  if (!res.ok) {
    throw new Error(data?.message || "Failed to fetch ");
  }
  return data;
}


