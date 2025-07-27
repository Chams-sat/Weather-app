import { useState } from 'react';

export default function SearchBar({ onSearch, defaultValue = '' }) {
  const [city, setCity] = useState(defaultValue);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (city.trim()) onSearch(city.trim());
  };

  return (
    <form onSubmit={handleSubmit} className="search-bar">
      <input
        type="text"
        value={city}
        onChange={e => setCity(e.target.value)}
        placeholder="Search city..."
        aria-label="Search city"
      />
      <button type="submit">Search</button>
    </form>
  );
} 