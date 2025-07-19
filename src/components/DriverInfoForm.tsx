import React from 'react';
import { DriverInfo } from '../types/insurance';

interface Props {
  data: DriverInfo;
  onChange: (data: DriverInfo) => void;
  onNext: () => void;
  onBack: () => void;
}

export const DriverInfoForm: React.FC<Props> = ({ data, onChange, onNext, onBack }) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    if (name === 'hasAccidents') {
      onChange({
        ...data,
        hasAccidents: value === 'yes'
      });
    } else {
      onChange({
        ...data,
        [name]: name === 'licenseYears' || name === 'numberOfClaims' ? Number(value) : value
      });
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onNext();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 form-appear">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 bg-primary-100 rounded-full flex items-center justify-center">
          <span className="text-xl">📋</span>
        </div>
        <h2 className="text-2xl font-display text-primary-800">Driver Information</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label htmlFor="dateOfBirth" className="block text-sm font-medium text-primary-700 mb-1">
            Date of Birth
          </label>
          <input
            type="date"
            id="dateOfBirth"
            name="dateOfBirth"
            value={data.dateOfBirth || ''}
            onChange={handleChange}
            required
            className="input-field"
          />
        </div>

        <div>
          <label htmlFor="licenseYears" className="block text-sm font-medium text-primary-700 mb-1">
            Years with License
          </label>
          <input
            type="number"
            id="licenseYears"
            name="licenseYears"
            value={data.licenseYears}
            onChange={handleChange}
            required
            min="0"
            className="input-field"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label htmlFor="hasAccidents" className="block text-sm font-medium text-primary-700 mb-1">
            Any Accidents?
          </label>
          <select
            id="hasAccidents"
            name="hasAccidents"
            value={data.hasAccidents ? 'yes' : 'no'}
            onChange={handleChange}
            required
            className="input-field"
          >
            <option value="no">No</option>
            <option value="yes">Yes</option>
          </select>
        </div>

        <div>
          <label htmlFor="numberOfClaims" className="block text-sm font-medium text-primary-700 mb-1">
            Number of Claims
          </label>
          <input
            type="number"
            id="numberOfClaims"
            name="numberOfClaims"
            value={data.numberOfClaims}
            onChange={handleChange}
            required
            min="0"
            className="input-field"
          />
        </div>
      </div>

      <div>
        <label htmlFor="occupation" className="block text-sm font-medium text-primary-700 mb-1">
          Occupation
        </label>
        <input
          type="text"
          id="occupation"
          name="occupation"
          value={data.occupation}
          onChange={handleChange}
          required
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
          Continue to Coverage →
        </button>
      </div>
    </form>
  );
};

