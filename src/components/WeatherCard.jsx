export default function WeatherCard( {data} ) {
    if (!data) return null;

    const name=data.name;
    const sys=data.sys;
    const main=data.main;
    const weather=data.weather;
    const wind=data.wind;

    const icon = weather?.[0]?.icon;
    const desc = weather?.[0]?.description;

    return (
    <div className="card">
      <div className="card-header">
        <h2>
          {name}
          {sys?.country ? `, ${sys.country}` : ""}         {/*sys?.country=checks if the sys object exists and has a country property*/}
        </h2>
        {icon && (                                         //only show image if icon exists
          <img
            alt={desc}
            src={`https://openweathermap.org/img/wn/${icon}@2x.png`}
          />
        )}
      </div>

      <div className="temp">{Math.round(main?.temp)}°</div>   {/*shows the temprature and rounds off to the nearest temprature */}
      <p className="desc">{desc}</p>                           {/* short description of weather like clear sky, rainy etc */}

      <ul className="meta">
        <li>Feels like: {Math.round(main?.feels_like)}°</li>    {/* additional data of the weather from the api app */}
        <li>Humidity: {main?.humidity}%</li>
        <li>Wind: {Math.round(wind?.speed)} m/s</li>
        {main?.temp_min != null && <li>Min: {Math.round(main.temp_min)}°</li>}
        {main?.temp_max != null && <li>Max: {Math.round(main.temp_max)}°</li>}
      </ul>
    </div>
  );
}
