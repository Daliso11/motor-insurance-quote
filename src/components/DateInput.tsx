import React, { useState, useEffect } from 'react';

interface DateInputProps {
  id: string;
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  required?: boolean;
  className?: string;
}

export const DateInput: React.FC<DateInputProps> = ({ 
  id, 
  name, 
  value, 
  onChange, 
  required = false,
  className = ''
}) => {
  const [displayValue, setDisplayValue] = useState('');

  // Convert ISO date (yyyy-mm-dd) to dd/mm/yyyy for display
  useEffect(() => {
    if (value) {
      const [year, month, day] = value.split('-');
      if (year && month && day) {
        setDisplayValue(`${day}/${month}/${year}`);
      }
    } else {
      setDisplayValue('');
    }
  }, [value]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let input = e.target.value;
    
    // Remove non-numeric characters except slashes
    input = input.replace(/[^\d/]/g, '');
    
    // Auto-add slashes
    if (input.length === 2 || input.length === 5) {
      if (!input.endsWith('/')) {
        input += '/';
      }
    }
    
    // Limit to 10 characters (dd/mm/yyyy)
    if (input.length > 10) {
      input = input.slice(0, 10);
    }
    
    setDisplayValue(input);
    
    // If we have a complete date, convert to ISO format
    if (input.length === 10) {
      const [day, month, year] = input.split('/');
      if (day && month && year) {
        const isoDate = `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`;
        
        // Create a synthetic event
        const syntheticEvent = {
          target: {
            name: name,
            value: isoDate
          }
        } as React.ChangeEvent<HTMLInputElement>;
        
        onChange(syntheticEvent);
      }
    } else {
      // Clear the value if date is incomplete
      const syntheticEvent = {
        target: {
          name: name,
          value: ''
        }
      } as React.ChangeEvent<HTMLInputElement>;
      
      onChange(syntheticEvent);
    }
  };

  const handleBlur = () => {
    // Validate date on blur
    if (displayValue.length === 10) {
      const [day, month, year] = displayValue.split('/');
      const dayNum = parseInt(day);
      const monthNum = parseInt(month);
      const yearNum = parseInt(year);
      
      // Basic validation
      if (dayNum < 1 || dayNum > 31 || monthNum < 1 || monthNum > 12 || yearNum < 1900 || yearNum > 2100) {
        setDisplayValue('');
        const syntheticEvent = {
          target: {
            name: name,
            value: ''
          }
        } as React.ChangeEvent<HTMLInputElement>;
        onChange(syntheticEvent);
      }
    }
  };

  return (
    <input
      type="text"
      id={id}
      name={name}
      value={displayValue}
      onChange={handleInputChange}
      onBlur={handleBlur}
      placeholder="dd/mm/yyyy"
      required={required}
      className={className}
      maxLength={10}
      pattern="\d{2}/\d{2}/\d{4}"
    />
  );
};
