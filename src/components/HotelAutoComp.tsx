import React, { useState, useRef, useEffect, type ChangeEvent } from 'react';
import { hotelCities, type HotelCity } from '../data/hotelCities';
import '../styles/Autocomp.css';

interface HotelAutocompleteInputProps {
  label: string;
  name: string;
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement> | { target: { name: string; value: string } }) => void;
}

const HotelAutocomp: React.FC<HotelAutocompleteInputProps> = ({ label, name, value, onChange }) => {
  const [suggestions, setSuggestions] = useState<HotelCity[]>([]);
  const wrapperRef = useRef<HTMLDivElement>(null);

  const handleInput = (e: ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;
    onChange(e);

    const filtered = hotelCities.filter((city) =>
      city.name.toLowerCase().includes(inputValue.toLowerCase())
    );

    setSuggestions(filtered.slice(0, 5));
  };

  const handleSelect = (city: HotelCity) => {
    onChange({ target: { name, value: city.name } });
    setSuggestions([]);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
        setSuggestions([]);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="autocomplete-input" ref={wrapperRef}>
      <label htmlFor={name}>{label}:</label>
      <input
        id={name}
        type="text"
        name={name}
        value={value}
        onChange={handleInput}
        placeholder={`Enter ${label}`}
        autoComplete="off"
      />

      {suggestions.length > 0 && (
        <div className="autocomplete-dropdown">
          {suggestions.map((city) => (
            <div
              key={city.code}
              onMouseDown={() => handleSelect(city)}
              className="autocomplete-item"
            >
              {city.name}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default HotelAutocomp;
