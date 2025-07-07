import React, { useState, useEffect, useRef, type ChangeEvent } from 'react';
import { airportOptions } from '../data/airportOptions';
import '../styles/Autocomp.css';

interface Airport {
  name: string;
  code: string;
}

interface AutocompleteInputProps {
  label: string;
  name: string;
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement> | { target: { name: string; value: string } }) => void;
}

const AutocompleteInput: React.FC<AutocompleteInputProps> = ({ label, name, value, onChange }) => {
  const [suggestions, setSuggestions] = useState<Airport[]>([]);
  const wrapperRef = useRef<HTMLDivElement>(null);

  const handleInput = (e: ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;
    onChange(e);

    const filtered = airportOptions.filter((airport) =>
      airport.name.toLowerCase().includes(inputValue.toLowerCase()) ||
      airport.code.toLowerCase().includes(inputValue.toLowerCase())
    );

    setSuggestions(filtered.slice(0, 5));
  };

  const handleSelect = (airport: Airport) => {
    const cityName = airport.name.split('-')[0].trim();
    onChange({ target: { name, value: `${cityName} (${airport.code})` } });
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
          {suggestions.map((airport) => (
            <div
              key={airport.code}
              onMouseDown={() => handleSelect(airport)}
              className="autocomplete-item"
            >
              {airport.name} ({airport.code})
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AutocompleteInput;
