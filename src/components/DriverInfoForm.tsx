import React from 'react';
import { DriverInfo } from '../types/insurance';
import { DateInput } from './DateInput';

interface Props {
  data: DriverInfo;
  onChange: (data: DriverInfo) => void;
  onNext: () => void;
  onBack: () => void;
}

export const DriverInfoForm: React.FC<Props> = ({ data, onChange, onNext, onBack }) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    onChange({
      ...data,
      [name]: value
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onNext();
  };

  // Calculate date constraints
  const today = new Date();
  const maxDOB = new Date(today.getFullYear() - 18, today.getMonth(), today.getDate()).toISOString().split('T')[0]; // Must be at least 18 years old
  const minDOB = new Date(today.getFullYear() - 100, today.getMonth(), today.getDate()).toISOString().split('T')[0]; // Maximum 100 years old
  const todayStr = today.toISOString().split('T')[0];
  const futureDate = new Date(today.getFullYear() + 10, today.getMonth(), today.getDate()).toISOString().split('T')[0]; // License can expire up to 10 years in future

  return (
    <form onSubmit={handleSubmit} className="space-y-6 form-appear">
      <div className="flex items-center gap-3 mb-6">
        <h2 className="text-2xl font-display text-primary-800">Driver Information</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label htmlFor="dateOfBirth" className="block text-sm font-medium text-primary-700 mb-1">
            Date of Birth <span className="text-red-500">*</span>
          </label>
          <DateInput
            id="dateOfBirth"
            name="dateOfBirth"
            value={data.dateOfBirth || ''}
            onChange={handleChange}
            required
            className="input-field"
            min={minDOB}
            max={maxDOB}
          />
        </div>

        <div>
          <label htmlFor="licenseNumber" className="block text-sm font-medium text-primary-700 mb-1">
            Driver's License Number <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            id="licenseNumber"
            name="licenseNumber"
            value={data.licenseNumber || ''}
            onChange={handleChange}
            required
            className="input-field"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label htmlFor="licenseIssuedDate" className="block text-sm font-medium text-primary-700 mb-1">
            Date Issued <span className="text-red-500">*</span>
          </label>
          <DateInput
            id="licenseIssuedDate"
            name="licenseIssuedDate"
            value={data.licenseIssuedDate || ''}
            onChange={handleChange}
            required
            className="input-field"
            max={todayStr}
          />
        </div>

        <div>
          <label htmlFor="licenseExpiryDate" className="block text-sm font-medium text-primary-700 mb-1">
            Expiry Date <span className="text-red-500">*</span>
          </label>
          <DateInput
            id="licenseExpiryDate"
            name="licenseExpiryDate"
            value={data.licenseExpiryDate || ''}
            onChange={handleChange}
            required
            className="input-field"
            min={todayStr}
            max={futureDate}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label htmlFor="licenseCode" className="block text-sm font-medium text-primary-700 mb-1">
            Driver's Licence Code <span className="text-red-500">*</span>
          </label>
          <select
            id="licenseCode"
            name="licenseCode"
            value={data.licenseCode || ''}
            onChange={handleChange}
            required
            className="input-field"
          >
            <option value="">Select License Code</option>
            <option value="A1">A1</option>
            <option value="A">A</option>
            <option value="B1">B1</option>
            <option value="B">B</option>
            <option value="C1">C1</option>
            <option value="C">C</option>
            <option value="D1">D1</option>
            <option value="D">D</option>
            <option value="BE">BE</option>
            <option value="C1E">C1E</option>
            <option value="CE">CE</option>
            <option value="D1E">D1E</option>
            <option value="DE">DE</option>
          </select>
        </div>

        <div>
          <label htmlFor="occupation" className="block text-sm font-medium text-primary-700 mb-1">
            Occupation
          </label>
          <input
            type="text"
            id="occupation"
            name="occupation"
            value={data.occupation || ''}
            onChange={handleChange}
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
          Continue to Coverage →
        </button>
      </div>
    </form>
  );
};

