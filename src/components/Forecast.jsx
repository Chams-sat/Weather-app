export default function Forecast({ forecast, units }) {
  if (!forecast || !forecast.list) return null;
  // Group by day (OpenWeatherMap gives 3-hour intervals)
  const days = [];
  const seen = new Set();
  forecast.list.forEach(item => {
    const date = item.dt_txt.split(' ')[0];
    if (!seen.has(date)) {
      days.push(item);
      seen.add(date);
    }
  });
  return (
    <div className="forecast">
      {days.slice(0, 5).map(day => {
        const iconUrl = `https://openweathermap.org/img/wn/${day.weather[0].icon}@2x.png`;
        return (
          <div className="forecast-card" key={day.dt}>
            <div>{new Date(day.dt_txt).toLocaleDateString(undefined, { weekday: 'short' })}</div>
            <img src={iconUrl} alt={day.weather[0].description} />
            <div>{Math.round(day.main.temp)}°{units === 'metric' ? 'C' : 'F'}</div>
            <div>{day.weather[0].main}</div>
          </div>
        );
      })}
    </div>
  );
} 