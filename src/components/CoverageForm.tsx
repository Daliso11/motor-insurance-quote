import React from 'react';
import { CoverageOptions } from '../types/insurance';

interface Props {
  data: CoverageOptions;
  onChange: (data: CoverageOptions) => void;
  onNext: () => void;
  onBack: () => void;
}

export const CoverageForm: React.FC<Props> = ({ data, onChange, onNext, onBack }) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    const checked = type === 'checkbox' ? (e.target as HTMLInputElement).checked : undefined;
    
    onChange({
      ...data,
      [name]: type === 'checkbox' ? checked : value
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onNext();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Coverage Options</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label htmlFor="coverageType" className="block text-sm font-medium text-gray-700 mb-1">
            Coverage Type
          </label>
          <select
            id="coverageType"
            name="coverageType"
            value={data.coverageType}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Select Coverage</option>
            <option value="comprehensive">Comprehensive</option>
            <option value="thirdParty">Third-party</option>
            <option value="thirdPartyFireTheft">Third-party, Fire & Theft</option>
          </select>
        </div>

        <div>
          <label htmlFor="voluntaryExcess" className="block text-sm font-medium text-gray-700 mb-1">
            Voluntary Excess
          </label>
          <input
            type="number"
            id="voluntaryExcess"
            name="voluntaryExcess"
            value={data.voluntaryExcess}
            onChange={handleChange}
            required
            min="0"
            step="50"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label htmlFor="additionalDrivers" className="block text-sm font-medium text-gray-700 mb-1">
            Additional Drivers
          </label>
          <input
            type="number"
            id="additionalDrivers"
            name="additionalDrivers"
            value={data.additionalDrivers}
            onChange={handleChange}
            required
            min="0"
            max="4"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Add-on Options
          </label>
          <div className="flex items-center">
            <input
              type="checkbox"
              id="includeBreakdown"
              name="includeBreakdown"
              checked={data.includeBreakdown}
              onChange={handleChange}
              className="mr-2"
            />
            <label htmlFor="includeBreakdown" className="text-sm font-medium text-gray-700">
              Breakdown Cover
            </label>
          </div>
          <div className="flex items-center">
            <input
              type="checkbox"
              id="includeWindscreen"
              name="includeWindscreen"
              checked={data.includeWindscreen}
              onChange={handleChange}
              className="mr-2"
            />
            <label htmlFor="includeWindscreen" className="text-sm font-medium text-gray-700">
              Windscreen Cover
            </label>
          </div>
          <div className="flex items-center">
            <input
              type="checkbox"
              id="includeLegalCover"
              name="includeLegalCover"
              checked={data.includeLegalCover}
              onChange={handleChange}
              className="mr-2"
            />
            <label htmlFor="includeLegalCover" className="text-sm font-medium text-gray-700">
              Legal Cover
            </label>
          </div>
        </div>
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

