import './Background.css';

export default function Background({ weather, children }) {
  let bgClass = 'bg-default';
  if (weather && weather.weather && weather.weather[0]) {
    const main = weather.weather[0].main.toLowerCase();
    if (main.includes('cloud')) bgClass = 'bg-cloudy';
    else if (main.includes('rain') || main.includes('drizzle')) bgClass = 'bg-rainy';
    else if (main.includes('clear')) bgClass = 'bg-sunny';
    else if (main.includes('snow')) bgClass = 'bg-snowy';
    else if (main.includes('thunder')) bgClass = 'bg-thunder';
  }
  return <div className={`background ${bgClass}`}>{children}</div>;
} 