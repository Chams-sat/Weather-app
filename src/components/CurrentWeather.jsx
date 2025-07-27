export default function CurrentWeather({ weather, units, onUnitToggle }) {
  if (!weather) return null;
  const { name, main, weather: w, wind, uvi } = weather;
  const iconUrl = w && w[0] ? `https://openweathermap.org/img/wn/${w[0].icon}@2x.png` : '';

  return (
    <div className="current-weather">
      <h2>{name}</h2>
      <div className="weather-main">
        <img src={iconUrl} alt={w[0]?.description} />
        <div>
          <div className="temp">
            {Math.round(main.temp)}°
            <button onClick={onUnitToggle} className="unit-toggle">
              {units === 'metric' ? 'C' : 'F'}
            </button>
          </div>
          <div>{w[0]?.main}</div>
        </div>
      </div>
      <div className="weather-details">
        <div>Humidity: {main.humidity}%</div>
        <div>Wind: {wind.speed} {units === 'metric' ? 'm/s' : 'mph'}</div>
        {uvi !== undefined && <div>UV Index: {uvi}</div>}
      </div>
    </div>
  );
} 