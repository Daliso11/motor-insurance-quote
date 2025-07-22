import React, { useState, useEffect } from 'react';

interface DateInputProps {
  id: string;
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  required?: boolean;
  className?: string;
  min?: string;
  max?: string;
}

export const DateInput: React.FC<DateInputProps> = ({ 
  id, 
  name, 
  value, 
  onChange, 
  required = false,
  className = '',
  min,
  max
}) => {
  // Convert yyyy-mm-dd to dd/mm/yyyy for display
  const formatDateForDisplay = (dateStr: string): string => {
    if (!dateStr) return '';
    const [year, month, day] = dateStr.split('-');
    return `${day}/${month}/${year}`;
  };

  // Validate if a date is valid
  const isValidDate = (day: string, month: string, year: string): boolean => {
    const dayNum = parseInt(day, 10);
    const monthNum = parseInt(month, 10);
    const yearNum = parseInt(year, 10);

    // Check basic ranges
    if (dayNum < 1 || dayNum > 31) return false;
    if (monthNum < 1 || monthNum > 12) return false;
    if (year.length !== 4 || isNaN(yearNum)) return false;

    // Check if month/day combination is valid
    const date = new Date(yearNum, monthNum - 1, dayNum);
    return date.getFullYear() === yearNum && date.getMonth() === monthNum - 1 && date.getDate() === dayNum;
  };

  // Convert dd/mm/yyyy to yyyy-mm-dd for storage

  const [displayValue, setDisplayValue] = useState(formatDateForDisplay(value));
  const [isInvalid, setIsInvalid] = useState(false);

  useEffect(() => {
    setDisplayValue(formatDateForDisplay(value));
  }, [value]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const input = e.target.value;
    const previousValue = displayValue;
    
    // Allow only digits and forward slashes
    let formatted = input.replace(/[^\d/]/g, '');
    
    // Only auto-add slashes when typing forward (not when deleting)
    if (formatted.length > previousValue.length) {
      // Remove any existing slashes to properly format
      const digitsOnly = formatted.replace(/\//g, '');
      
      // Re-add slashes at appropriate positions based on digit count
      if (digitsOnly.length > 2) {
        formatted = digitsOnly.slice(0, 2) + '/' + digitsOnly.slice(2);
      }
      if (digitsOnly.length > 4) {
        formatted = digitsOnly.slice(0, 2) + '/' + digitsOnly.slice(2, 4) + '/' + digitsOnly.slice(4);
      }
      
      // Limit to 8 digits (dd/mm/yyyy)
      if (digitsOnly.length > 8) {
        formatted = digitsOnly.slice(0, 2) + '/' + digitsOnly.slice(2, 4) + '/' + digitsOnly.slice(4, 8);
      }
    }
    
    // Limit total length
    formatted = formatted.slice(0, 10);
    const digitsOnly = formatted.replace(/\//g, '');
    if (digitsOnly.length === 8) {
      const day = digitsOnly.slice(0, 2);
      const month = digitsOnly.slice(2, 4);
      const year = digitsOnly.slice(4, 8);

      if (isValidDate(day, month, year)) {
        const storageFormat = `${year}-${month}-${day}`;
        
        // Check min/max constraints
        if (min && storageFormat < min) {
          setIsInvalid(true);
          setDisplayValue(formatted);
          return;
        }
        if (max && storageFormat > max) {
          setIsInvalid(true);
          setDisplayValue(formatted);
          return;
        }
        
        setIsInvalid(false);
        setDisplayValue(formatted);
        
        // Create synthetic event
        const syntheticEvent = {
          target: {
            name: name,
            value: storageFormat
          }
        } as React.ChangeEvent<HTMLInputElement>;
        onChange(syntheticEvent);
      } else {
        // Invalid date - show visual feedback
        setIsInvalid(true);
        setDisplayValue(formatted);
      }
    } else {
      // Clear or partial date
      setIsInvalid(false);
      setDisplayValue(formatted);
      const syntheticEvent = {
        target: {
          name: name,
          value: ''
        }
      } as React.ChangeEvent<HTMLInputElement>;
      onChange(syntheticEvent);
    }
  };

  // Combine classes - add red border if invalid
  const combinedClassName = `${className} ${isInvalid ? 'border-red-500 focus:border-red-500' : ''}`;

  return (
    <>
      <input
        type="text"
        id={id}
        name={name}
        value={displayValue}
        onChange={handleChange}
        placeholder="dd/mm/yyyy"
        required={required}
        className={combinedClassName}
        maxLength={10}
      />
      {isInvalid && displayValue.length === 10 && (
        <p className="mt-1 text-sm text-red-600">Please enter a valid date</p>
      )}
    </>
  );
};
