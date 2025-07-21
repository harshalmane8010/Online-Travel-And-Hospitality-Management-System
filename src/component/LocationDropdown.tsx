import React from 'react';

interface LocationDropdownProps {
  label: string;
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  locations: string[];
  error?: string;
}

const LocationDropdown: React.FC<LocationDropdownProps> = ({
  label,
  name,
  value,
  onChange,
  locations,
  error,
}) => {
  return (
    <div>
      <label htmlFor={name}>{label}:</label>
      <select name={name} value={value} onChange={onChange}>
        <option value="">Select {label}</option>
        {locations.map((loc) => (
          <option key={loc} value={loc}>
            {loc}
          </option>
        ))}
      </select>
      {error && <div className="error">{error}</div>}
    </div>
  );
};

export default LocationDropdown;
