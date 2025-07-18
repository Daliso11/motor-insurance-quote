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
    <form onSubmit={handleSubmit} className="space-y-6 form-appear">
      <h2 className="text-2xl font-display text-primary-800 mb-6">Coverage Options</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label htmlFor="coverageType" className="block text-sm font-medium text-primary-700 mb-1">
            Coverage Type
          </label>
          <select
            id="coverageType"
            name="coverageType"
            value={data.coverageType}
            onChange={handleChange}
            required
            className="input-field"
          >
            <option value="">Select Coverage</option>
            <option value="comprehensive">Comprehensive</option>
            <option value="thirdParty">Third-party</option>
            <option value="thirdPartyFireTheft">Third-party, Fire & Theft</option>
          </select>
        </div>

        <div>
          <label htmlFor="voluntaryExcess" className="block text-sm font-medium text-primary-700 mb-1">
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
            className="input-field"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label htmlFor="additionalDrivers" className="block text-sm font-medium text-primary-700 mb-1">
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
            className="input-field"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-primary-700 mb-1">
            Add-on Options
          </label>
          <div className="flex items-center hover-lift p-2 rounded-lg hover:bg-primary-50 transition-all duration-200">
            <input
              type="checkbox"
              id="includeBreakdown"
              name="includeBreakdown"
              checked={data.includeBreakdown}
              onChange={handleChange}
              className="mr-2 w-4 h-4 text-primary-600 border-primary-300 rounded focus:ring-primary-500"
            />
            <label htmlFor="includeBreakdown" className="text-sm font-medium text-primary-700 cursor-pointer">
              Breakdown Cover
            </label>
          </div>
          <div className="flex items-center hover-lift p-2 rounded-lg hover:bg-primary-50 transition-all duration-200">
            <input
              type="checkbox"
              id="includeWindscreen"
              name="includeWindscreen"
              checked={data.includeWindscreen}
              onChange={handleChange}
              className="mr-2 w-4 h-4 text-primary-600 border-primary-300 rounded focus:ring-primary-500"
            />
            <label htmlFor="includeWindscreen" className="text-sm font-medium text-primary-700 cursor-pointer">
              Windscreen Cover
            </label>
          </div>
          <div className="flex items-center hover-lift p-2 rounded-lg hover:bg-primary-50 transition-all duration-200">
            <input
              type="checkbox"
              id="includeLegalCover"
              name="includeLegalCover"
              checked={data.includeLegalCover}
              onChange={handleChange}
              className="mr-2 w-4 h-4 text-primary-600 border-primary-300 rounded focus:ring-primary-500"
            />
            <label htmlFor="includeLegalCover" className="text-sm font-medium text-primary-700 cursor-pointer">
              Legal Cover
            </label>
          </div>
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
          Get Quote →
        </button>
      </div>
    </form>
  );
};

