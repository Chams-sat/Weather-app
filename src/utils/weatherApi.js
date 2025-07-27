// src/utils/weatherApi.js

const API_KEY = import.meta.env.VITE_OPENWEATHER_API_KEY;
const BASE_URL = 'https://api.openweathermap.org/data/2.5';

export async function fetchCurrentWeather(city, units = 'metric') {
  const res = await fetch(
    `${BASE_URL}/weather?q=${encodeURIComponent(city)}&appid=${API_KEY}&units=${units}`
  );
  if (!res.ok) throw new Error('City not found');
  return res.json();
}

export async function fetchForecast(city, units = 'metric') {
  const res = await fetch(
    `${BASE_URL}/forecast?q=${encodeURIComponent(city)}&appid=${API_KEY}&units=${units}`
  );
  if (!res.ok) throw new Error('Forecast not found');
  return res.json();
} 