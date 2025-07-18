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
    <form onSubmit={handleSubmit} className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Driver Information</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label htmlFor="dateOfBirth" className="block text-sm font-medium text-gray-700 mb-1">
            Date of Birth
          </label>
          <input
            type="date"
            id="dateOfBirth"
            name="dateOfBirth"
            value={data.dateOfBirth || ''}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label htmlFor="licenseYears" className="block text-sm font-medium text-gray-700 mb-1">
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
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label htmlFor="hasAccidents" className="block text-sm font-medium text-gray-700 mb-1">
            Any Accidents?
          </label>
          <select
            id="hasAccidents"
            name="hasAccidents"
            value={data.hasAccidents ? 'yes' : 'no'}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="no">No</option>
            <option value="yes">Yes</option>
          </select>
        </div>

        <div>
          <label htmlFor="numberOfClaims" className="block text-sm font-medium text-gray-700 mb-1">
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
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>

      <div>
        <label htmlFor="occupation" className="block text-sm font-medium text-gray-700 mb-1">
          Occupation
        </label>
        <input
          type="text"
          id="occupation"
          name="occupation"
          value={data.occupation}
          onChange={handleChange}
          required
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div className="flex gap-4">
        <button
          type="button"
          onClick={onBack}
          className="flex-1 bg-gray-300 text-gray-700 py-2 px-4 rounded-md hover:bg-gray-400 transition duration-200"
        >
          Back
        </button>
        <button
          type="submit"
          className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition duration-200"
        >
          Next Step
        </button>
      </div>
    </form>
  );
};

