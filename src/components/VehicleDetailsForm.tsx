import React from 'react';
import { VehicleDetails } from '../types/insurance';

interface Props {
  data: VehicleDetails;
  onChange: (data: VehicleDetails) => void;
  onNext: () => void;
  onBack: () => void;
}

export const VehicleDetailsForm: React.FC<Props> = ({ data, onChange, onNext, onBack }) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    onChange({
      ...data,
      [name]: name === 'year' || name === 'currentValue' ? Number(value) : value
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onNext();
  };

  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 30 }, (_, i) => currentYear - i);

  return (
    <form onSubmit={handleSubmit} className="space-y-6 form-appear">
      <h2 className="text-2xl font-display text-primary-800 mb-6">Vehicle Details</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label htmlFor="make" className="block text-sm font-medium text-primary-700 mb-1">
            Vehicle Make
          </label>
          <input
            type="text"
            id="make"
            name="make"
            value={data.make}
            onChange={handleChange}
            required
            placeholder="e.g., Toyota"
            className="input-field"
          />
        </div>
        
        <div>
          <label htmlFor="model" className="block text-sm font-medium text-primary-700 mb-1">
            Vehicle Model
          </label>
          <input
            type="text"
            id="model"
            name="model"
            value={data.model}
            onChange={handleChange}
            required
            placeholder="e.g., Camry"
            className="input-field"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label htmlFor="year" className="block text-sm font-medium text-primary-700 mb-1">
            Year
          </label>
          <select
            id="year"
            name="year"
            value={data.year}
            onChange={handleChange}
            required
            className="input-field"
          >
            <option value="">Select Year</option>
            {years.map(year => (
              <option key={year} value={year}>{year}</option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="vehicleType" className="block text-sm font-medium text-primary-700 mb-1">
            Vehicle Type
          </label>
          <select
            id="vehicleType"
            name="vehicleType"
            value={data.vehicleType}
            onChange={handleChange}
            required
            className="input-field"
          >
            <option value="">Select Type</option>
            <option value="car">Car</option>
            <option value="motorcycle">Motorcycle</option>
            <option value="van">Van</option>
          </select>
        </div>
      </div>

      <div>
        <label htmlFor="registrationNumber" className="block text-sm font-medium text-primary-700 mb-1">
          Registration Number
        </label>
        <input
          type="text"
          id="registrationNumber"
          name="registrationNumber"
          value={data.registrationNumber}
          onChange={handleChange}
          required
          placeholder="e.g., ABC123"
          className="input-field"
        />
      </div>

      <div>
        <label htmlFor="currentValue" className="block text-sm font-medium text-primary-700 mb-1">
          Current Vehicle Value (ZMW)
        </label>
        <input
          type="number"
          id="currentValue"
          name="currentValue"
          value={data.currentValue}
          onChange={handleChange}
          required
          min="1000"
          step="100"
          placeholder="e.g., 25000"
          className="input-field"
        />
      </div>

      <div className="flex gap-4 mt-6">
        <button
          type="button"
          onClick={onBack}
          className="btn-secondary flex-1"
        >
          ← Back
        </button>
        <button
          type="submit"
          className="btn-primary flex-1"
        >
          Continue to Driver Info →
        </button>
      </div>
    </form>
  );
};
