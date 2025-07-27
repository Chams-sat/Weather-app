import { useState, useEffect } from 'react';
import './App.css';
import SearchBar from './components/SearchBar';
import CurrentWeather from './components/CurrentWeather';
import Forecast from './components/Forecast';
import Background from './components/Background';
import { fetchCurrentWeather, fetchForecast } from './utils/weatherApi';

const DEFAULT_CITY = localStorage.getItem('lastCity') || 'London';

function App() {
  const [city, setCity] = useState(DEFAULT_CITY);
  const [units, setUnits] = useState(localStorage.getItem('units') || 'metric');
  const [weather, setWeather] = useState(null);
  const [forecast, setForecast] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    handleSearch(city);
    // eslint-disable-next-line
  }, []);

  const handleSearch = async (searchCity) => {
    setLoading(true);
    setError('');
    try {
      const weatherData = await fetchCurrentWeather(searchCity, units);

      // UV index requires a separate call, but for demo, skip or mock
      setWeather(weatherData);
      const forecastData = await fetchForecast(searchCity, units);

      setForecast(forecastData);
      setCity(searchCity);
      localStorage.setItem('lastCity', searchCity);
    } catch (e) {
      let errorMsg = '';
      if (typeof e === 'string') errorMsg = e;
      else if (e && typeof e.message === 'string') errorMsg = e.message;
      else errorMsg = JSON.stringify(e);
      setError(errorMsg);
      setWeather(null);
      setForecast(null);
    } finally {
      setLoading(false);
    }
  };

  const handleUnitToggle = () => {
    const newUnits = units === 'metric' ? 'imperial' : 'metric';
    setUnits(newUnits);
    localStorage.setItem('units', newUnits);
    handleSearch(city);
  };

  return (
    <Background weather={weather}>
      <div className="weather-app-container">
        <h1>Weather App</h1>
        <SearchBar onSearch={handleSearch} defaultValue={city} />
        {loading && <div>Loading...</div>}
        {error && <div className="error">{error}</div>}
        <CurrentWeather weather={weather} units={units} onUnitToggle={handleUnitToggle} />
        <Forecast forecast={forecast} units={units} />
      </div>
    </Background>
  );
}

export default App;
