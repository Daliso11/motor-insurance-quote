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
      [name]: name === 'currentValue' ? (value === '' ? '' : Number(value)) : value
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onNext();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 form-appear">
      <h2 className="text-2xl font-display text-primary-800 mb-6">Vehicle Details</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label htmlFor="make" className="block text-sm font-medium text-primary-700 mb-1">
            Vehicle Make <span className="text-red-500">*</span>
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
            Vehicle Model <span className="text-red-500">*</span>
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
          <label htmlFor="engineNumber" className="block text-sm font-medium text-primary-700 mb-1">
            Engine Number <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            id="engineNumber"
            name="engineNumber"
            value={data.engineNumber}
            onChange={handleChange}
            required
            placeholder="e.g., ABCD1234567890"
            className="input-field"
          />
        </div>

        <div>
          <label htmlFor="chassisNumber" className="block text-sm font-medium text-primary-700 mb-1">
            Chassis Number <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            id="chassisNumber"
            name="chassisNumber"
            value={data.chassisNumber}
            onChange={handleChange}
            required
            placeholder="e.g., VIN1234567890123"
            className="input-field"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label htmlFor="registrationNumber" className="block text-sm font-medium text-primary-700 mb-1">
            Registration Number <span className="text-red-500">*</span>
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
            Current Vehicle Value (ZMW) <span className="text-red-500">*</span>
          </label>
          <input
            type="number"
            id="currentValue"
            name="currentValue"
            value={data.currentValue === 0 ? '' : data.currentValue}
            onChange={handleChange}
            required
            min="1000"
            step="100"
            placeholder="e.g., 25000"
            className="input-field"
          />
        </div>
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
