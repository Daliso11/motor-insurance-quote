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
      <div className="mb-6">
        <h2 className="text-2xl font-display text-primary-800">Coverage Options</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label htmlFor="coverageType" className="block text-sm font-medium text-primary-700 mb-1">
            Coverage Type <span className="text-red-500">*</span>
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
          <label htmlFor="useOfVehicle" className="block text-sm font-medium text-primary-700 mb-1">
            Use Of Vehicle <span className="text-red-500">*</span>
          </label>
          <select
            id="useOfVehicle"
            name="useOfVehicle"
            value={data.useOfVehicle}
            onChange={handleChange}
            required
            className="input-field"
          >
            <option value="">Select Use</option>
            <option value="private">Private</option>
            <option value="commercial">Commercial</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label htmlFor="coverPeriod" className="block text-sm font-medium text-primary-700 mb-1">
            Preferred Insurance Cover Period <span className="text-red-500">*</span>
          </label>
          <select
            id="coverPeriod"
            name="coverPeriod"
            value={data.coverPeriod}
            onChange={handleChange}
            required
            className="input-field"
          >
            <option value="1">1 Month</option>
            <option value="3">3 Months</option>
            <option value="6">6 Months</option>
            <option value="12">12 Months</option>
          </select>
        </div>
        
        <div>
          <label htmlFor="excessAmount" className="block text-sm font-medium text-primary-700 mb-1">
            Excess / Deductible (ZMW)
          </label>
          <input
            type="number"
            id="excessAmount"
            name="excessAmount"
            value={data.excessAmount}
            onChange={handleChange}
            min="0"
            step="500"
            className="input-field"
          />
        </div>
      </div>

      <div className="space-y-4">
        <label className="block text-sm font-medium text-primary-700 mb-1">
          Add-on Options
        </label>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <div className={`flex items-center hover-lift p-2 rounded-lg transition-all duration-200 ${data.includePassengerLiability ? 'bg-[#4cdd80]/10 border border-[#4cdd80]/30' : 'hover:bg-primary-50'}`}>
            <input
              type="checkbox"
              id="includePassengerLiability"
              name="includePassengerLiability"
              checked={data.includePassengerLiability}
              onChange={handleChange}
              className="mr-2 w-4 h-4 text-primary-600 border-primary-300 rounded focus:ring-primary-500"
            />
            <label htmlFor="includePassengerLiability" className="text-sm font-medium text-primary-700 cursor-pointer">
              Passenger Liability
            </label>
          </div>
          <div className={`flex items-center hover-lift p-2 rounded-lg transition-all duration-200 ${data.includeRiotStrike ? 'bg-[#4cdd80]/10 border border-[#4cdd80]/30' : 'hover:bg-primary-50'}`}>
            <input
              type="checkbox"
              id="includeRiotStrike"
              name="includeRiotStrike"
              checked={data.includeRiotStrike}
              onChange={handleChange}
              className="mr-2 w-4 h-4 text-primary-600 border-primary-300 rounded focus:ring-primary-500"
            />
            <label htmlFor="includeRiotStrike" className="text-sm font-medium text-primary-700 cursor-pointer">
              Riot, Strike & Civil Commotion
            </label>
          </div>
          <div className={`flex items-center hover-lift p-2 rounded-lg transition-all duration-200 ${data.includeExcessProtector ? 'bg-[#4cdd80]/10 border border-[#4cdd80]/30' : 'hover:bg-primary-50'}`}>
            <input
              type="checkbox"
              id="includeExcessProtector"
              name="includeExcessProtector"
              checked={data.includeExcessProtector}
              onChange={handleChange}
              className="mr-2 w-4 h-4 text-primary-600 border-primary-300 rounded focus:ring-primary-500"
            />
            <label htmlFor="includeExcessProtector" className="text-sm font-medium text-primary-700 cursor-pointer">
              Excess Protector
            </label>
          </div>
          <div className={`flex items-center hover-lift p-2 rounded-lg transition-all duration-200 ${data.includeCarHire ? 'bg-[#4cdd80]/10 border border-[#4cdd80]/30' : 'hover:bg-primary-50'}`}>
            <input
              type="checkbox"
              id="includeCarHire"
              name="includeCarHire"
              checked={data.includeCarHire}
              onChange={handleChange}
              className="mr-2 w-4 h-4 text-primary-600 border-primary-300 rounded focus:ring-primary-500"
            />
            <label htmlFor="includeCarHire" className="text-sm font-medium text-primary-700 cursor-pointer">
              Car Hire (Post-accident)
            </label>
          </div>
          <div className={`flex items-center hover-lift p-2 rounded-lg transition-all duration-200 ${data.includeRoadsideAssistance ? 'bg-[#4cdd80]/10 border border-[#4cdd80]/30' : 'hover:bg-primary-50'}`}>
            <input
              type="checkbox"
              id="includeRoadsideAssistance"
              name="includeRoadsideAssistance"
              checked={data.includeRoadsideAssistance}
              onChange={handleChange}
              className="mr-2 w-4 h-4 text-primary-600 border-primary-300 rounded focus:ring-primary-500"
            />
            <label htmlFor="includeRoadsideAssistance" className="text-sm font-medium text-primary-700 cursor-pointer">
              Roadside Assistance
            </label>
          </div>
          <div className={`flex items-center hover-lift p-2 rounded-lg transition-all duration-200 ${data.includeCrossBorder ? 'bg-[#4cdd80]/10 border border-[#4cdd80]/30' : 'hover:bg-primary-50'}`}>
            <input
              type="checkbox"
              id="includeCrossBorder"
              name="includeCrossBorder"
              checked={data.includeCrossBorder}
              onChange={handleChange}
              className="mr-2 w-4 h-4 text-primary-600 border-primary-300 rounded focus:ring-primary-500"
            />
            <label htmlFor="includeCrossBorder" className="text-sm font-medium text-primary-700 cursor-pointer">
              Cross-Border Cover (SADC)
            </label>
          </div>
        </div>
      </div>

      <div className="mt-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
        <h3 className="text-sm font-bold text-yellow-800 mb-2">Declaration</h3>
        <p className="text-xs text-yellow-700 mb-3">
          I confirm that the information I have provided is true and complete to the best of my knowledge. I understand that this quotation is based on the details entered and may change after further assessment or underwriting. Providing false or misleading information may affect my eligibility for cover.
        </p>
        <div className="flex items-center hover-lift">
          <input
            type="checkbox"
            id="declarationAccepted"
            name="declarationAccepted"
            checked={data.declarationAccepted}
            onChange={handleChange}
            className="mr-2 w-4 h-4 text-primary-600 border-primary-300 rounded focus:ring-primary-500"
          />
          <label htmlFor="declarationAccepted" className="text-sm font-medium text-primary-700 cursor-pointer">
            I accept the declaration <span className="text-red-500">*</span>
          </label>
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
          className={`btn-primary flex-1 ${!data.declarationAccepted ? 'opacity-50 cursor-not-allowed' : ''}`}
          disabled={!data.declarationAccepted}
        >
          Get Quote →
        </button>
      </div>
    </form>
  );
};

