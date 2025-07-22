import React, { useMemo } from 'react';
import { PersonalInfo, VehicleDetails, DriverInfo, CoverageOptions } from '../types/insurance';

interface Props {
  personalInfo: PersonalInfo;
  vehicleDetails: VehicleDetails;
  driverInfo: DriverInfo;
  coverageOptions: CoverageOptions;
  onBack: () => void;
  onAccept: () => void;
}

export const QuoteSummary: React.FC<Props> = ({ 
  personalInfo, 
  vehicleDetails, 
  driverInfo, 
  coverageOptions, 
  onBack,
  onAccept 
}) => {
  // Extract vehicle value for display
  const displayVehicleValue = typeof vehicleDetails.currentValue === 'number' ? vehicleDetails.currentValue : 0;
  
  const quote = useMemo(() => {
    // Base rate calculation based on vehicle value
    const vehicleValue = typeof vehicleDetails.currentValue === 'number' ? vehicleDetails.currentValue : 0;
    // Default base rate of 2.8% of vehicle value
    let baseRate = vehicleValue * 0.028;

    // Age factor
    const currentYear = new Date().getFullYear();
    const birthYear = new Date(driverInfo.dateOfBirth).getFullYear();
    const age = currentYear - birthYear;
    let ageFactor = 1;
    
    if (age < 25) ageFactor = 1.5;
    else if (age >= 25 && age < 30) ageFactor = 1.2;
    else if (age >= 30 && age < 65) ageFactor = 1.0;
    else ageFactor = 1.1;

    // Experience factor based on license issue date
    let experienceFactor = 1;
    if (driverInfo.licenseIssuedDate) {
      const licenseIssueDate = new Date(driverInfo.licenseIssuedDate);
      const today = new Date();
      const yearsSinceLicense = (today.getTime() - licenseIssueDate.getTime()) / (1000 * 60 * 60 * 24 * 365);
      
      if (yearsSinceLicense < 2) experienceFactor = 1.3;
      else if (yearsSinceLicense >= 2 && yearsSinceLicense < 5) experienceFactor = 1.1;
      else if (yearsSinceLicense >= 5) experienceFactor = 0.9;
    }

    // Remove accident factor since we no longer track accidents/claims
    let accidentFactor = 1;

    // Coverage type factor
    let coverageFactor = 1;
    if (coverageOptions.coverageType === 'comprehensive') coverageFactor = 1.0;
    else if (coverageOptions.coverageType === 'thirdPartyFireTheft') coverageFactor = 0.7;
    else if (coverageOptions.coverageType === 'thirdParty') coverageFactor = 0.5;

    // Calculate base premium
    const basePremium = baseRate * ageFactor * experienceFactor * accidentFactor * coverageFactor;

    // Additional charges (in Kwacha)
    let additionalCharges = 0;
    if (coverageOptions.includePassengerLiability) additionalCharges += 2500; // ~K2,500 for passenger liability
    if (coverageOptions.includeRiotStrike) additionalCharges += 1500; // ~K1,500 for riot & strike
    if (coverageOptions.includeExcessProtector) additionalCharges += 2000; // ~K2,000 for excess protector
    if (coverageOptions.includeCarHire) additionalCharges += 3000; // ~K3,000 for car hire
    if (coverageOptions.includeRoadsideAssistance) additionalCharges += 1800; // ~K1,800 for roadside assistance
    if (coverageOptions.includeCrossBorder) additionalCharges += 2200; // ~K2,200 for cross-border
    
    // Commercial use surcharge
    if (coverageOptions.useOfVehicle === 'commercial') {
      additionalCharges += basePremium * 0.25; // 25% surcharge for commercial use
    }
    
    // Apply excess discount if high excess is chosen
    let excessDiscount = 0;
    if (coverageOptions.excessAmount > 5000) {
      excessDiscount = basePremium * 0.05; // 5% discount for high excess
    } else if (coverageOptions.excessAmount > 10000) {
      excessDiscount = basePremium * 0.10; // 10% discount for very high excess
    }

    // Calculate annual price first
    const annualPrice = basePremium + additionalCharges - excessDiscount;
    
    // Adjust total price based on cover period
    let totalPrice = annualPrice;
    if (coverageOptions.coverPeriod === 1) {
      totalPrice = annualPrice / 12; // 1 month
    } else if (coverageOptions.coverPeriod === 3) {
      totalPrice = (annualPrice / 12) * 3; // 3 months
    } else if (coverageOptions.coverPeriod === 6) {
      totalPrice = (annualPrice / 12) * 6; // 6 months
    }
    // For 12 months, totalPrice remains as annualPrice
    
    const monthlyPrice = annualPrice / 12;

    return {
      basePrice: basePremium,
      discount: excessDiscount,
      additionalCharges: additionalCharges,
      totalPrice: totalPrice,
      monthlyPrice: monthlyPrice,
      ageFactor,
      experienceFactor,
      accidentFactor,
      coverageFactor
    };
  }, [vehicleDetails, driverInfo, coverageOptions]);

  // Helper function to format coverage type display
  const formatCoverageType = (type: string) => {
    switch(type) {
      case 'comprehensive': return 'Comprehensive';
      case 'thirdParty': return 'Third Party Only';
      case 'thirdPartyFireTheft': return 'Third Party, Fire & Theft';
      default: return type;
    }
  };

  // Calculate driver age for display
  const calculateAge = (dateOfBirth: string) => {
    const today = new Date();
    const birthDate = new Date(dateOfBirth);
    let age = today.getFullYear() - birthDate.getFullYear();
    const m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    return age;
  };

  return (
<div className="space-y-6 form-appear">
      <div className="mb-6">
        <h2 className="text-2xl font-display text-primary-800">Your Insurance Quote</h2>
      </div>
      
      {/* 2x2 Grid for Information Sections */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Customer Information */}
        <div className="bg-primary-50 p-5 rounded-xl shadow-soft hover:shadow-xl transition-all duration-300 hover-lift">
          <h3 className="text-primary-700 font-semibold text-lg mb-3">Personal Information</h3>
          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="text-primary-600">Name:</span>
              <span className="text-primary-700 font-medium">{personalInfo.firstName} {personalInfo.lastName}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-primary-600">Email:</span>
              <span className="text-primary-700 font-medium">{personalInfo.email}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-primary-600">Phone:</span>
              <span className="text-primary-700 font-medium">{personalInfo.phone}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-primary-600">National ID:</span>
              <span className="text-primary-700 font-medium">{personalInfo.nationalId}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-primary-600">Nationality:</span>
              <span className="text-primary-700 font-medium">{personalInfo.nationality}</span>
            </div>
          </div>
        </div>

        {/* Vehicle Information */}
        <div className="bg-secondary-50 p-5 rounded-xl shadow-soft hover:shadow-xl transition-all duration-300 hover-lift">
          <h3 className="text-secondary-700 font-semibold text-lg mb-3">Vehicle Details</h3>
          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="text-secondary-600">Make & Model:</span>
              <span className="text-secondary-700 font-medium">{vehicleDetails.make} {vehicleDetails.model}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-secondary-600">Registration:</span>
              <span className="text-secondary-700 font-medium">{vehicleDetails.registrationNumber}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-secondary-600">Engine Number:</span>
              <span className="text-secondary-700 font-medium">{vehicleDetails.engineNumber}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-secondary-600">Chassis Number:</span>
              <span className="text-secondary-700 font-medium">{vehicleDetails.chassisNumber}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-secondary-600">Current Value:</span>
              <span className="text-secondary-700 font-medium">{displayVehicleValue.toLocaleString('en-ZM', { style: 'currency', currency: 'ZMW' })}</span>
            </div>
          </div>
        </div>

        {/* Driver Information */}
        <div className="bg-indigo-50 p-5 rounded-xl shadow-soft hover:shadow-xl transition-all duration-300 hover-lift">
          <h3 className="text-indigo-700 font-semibold text-lg mb-3">Driver Information</h3>
          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="text-indigo-600">Age:</span>
              <span className="text-indigo-700 font-medium">{calculateAge(driverInfo.dateOfBirth)} years</span>
            </div>
            <div className="flex justify-between">
              <span className="text-indigo-600">License Number:</span>
              <span className="text-indigo-700 font-medium">{driverInfo.licenseNumber}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-indigo-600">License Code:</span>
              <span className="text-indigo-700 font-medium">{driverInfo.licenseCode}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-indigo-600">Issue Date:</span>
              <span className="text-indigo-700 font-medium">{new Date(driverInfo.licenseIssuedDate).toLocaleDateString('en-GB')}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-indigo-600">Expiry Date:</span>
              <span className="text-indigo-700 font-medium">{new Date(driverInfo.licenseExpiryDate).toLocaleDateString('en-GB')}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-indigo-600">Occupation:</span>
              <span className="text-indigo-700 font-medium">{driverInfo.occupation}</span>
            </div>
          </div>
        </div>

        {/* Coverage Summary */}
        <div className="bg-accent-50 p-5 rounded-xl shadow-soft hover:shadow-xl transition-all duration-300 hover-lift">
          <h3 className="text-accent-700 font-semibold text-lg mb-3">Coverage Summary</h3>
          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="text-accent-600">Coverage Type:</span>
              <span className="text-accent-700 font-medium">{formatCoverageType(coverageOptions.coverageType)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-accent-600">Vehicle Use:</span>
              <span className="text-accent-700 font-medium">{coverageOptions.useOfVehicle === 'private' ? 'Private' : 'Commercial'}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-accent-600">Cover Period:</span>
              <span className="text-accent-700 font-medium">{coverageOptions.coverPeriod} Month{coverageOptions.coverPeriod > 1 ? 's' : ''}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-accent-600">Excess Amount:</span>
              <span className="text-accent-700 font-medium">{coverageOptions.excessAmount.toLocaleString('en-ZM', { style: 'currency', currency: 'ZMW' })}</span>
            </div>
            {(coverageOptions.includePassengerLiability || coverageOptions.includeRiotStrike || coverageOptions.includeExcessProtector || 
              coverageOptions.includeCarHire || coverageOptions.includeRoadsideAssistance || coverageOptions.includeCrossBorder) && (
              <div className="mt-3 pt-3 border-t border-accent-200">
                <p className="text-accent-600 font-medium mb-1">Add-ons:</p>
                <div className="space-y-1">
                  {coverageOptions.includePassengerLiability && <p className="text-accent-600 text-sm fade-in">✓ Passenger Liability</p>}
                  {coverageOptions.includeRiotStrike && <p className="text-accent-600 text-sm fade-in">✓ Riot, Strike & Civil Commotion</p>}
                  {coverageOptions.includeExcessProtector && <p className="text-accent-600 text-sm fade-in">✓ Excess Protector</p>}
                  {coverageOptions.includeCarHire && <p className="text-accent-600 text-sm fade-in">✓ Car Hire (Post-accident)</p>}
                  {coverageOptions.includeRoadsideAssistance && <p className="text-accent-600 text-sm fade-in">✓ Roadside Assistance</p>}
                  {coverageOptions.includeCrossBorder && <p className="text-accent-600 text-sm fade-in">✓ Cross-Border Cover (SADC)</p>}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Quote Breakdown */}
      <div className="bg-primary-100 p-6 rounded-xl shadow-lg scale-in">
        <h3 className="text-primary-800 font-semibold text-lg mb-4">Quote Breakdown</h3>
        <div className="space-y-2">
          <div className="flex justify-between">
            <span className="text-primary-700">Base Premium:</span>
            <span className="font-medium">{quote.basePrice.toLocaleString('en-ZM', { style: 'currency', currency: 'ZMW' })}</span>
          </div>
          {quote.additionalCharges > 0 && (
            <div className="flex justify-between">
              <span className="text-primary-700">Additional Coverage:</span>
              <span className="font-medium">+{quote.additionalCharges.toLocaleString('en-ZM', { style: 'currency', currency: 'ZMW' })}</span>
            </div>
          )}
          {quote.discount > 0 && (
            <div className="flex justify-between">
              <span className="text-primary-700">Excess Discount:</span>
              <span className="font-medium text-green-600">-{quote.discount.toLocaleString('en-ZM', { style: 'currency', currency: 'ZMW' })}</span>
            </div>
          )}
          <div className="border-t-2 border-primary-300 pt-2 mt-2">
            <div className="flex justify-between text-lg font-bold text-primary-800">
              <span>Total for {coverageOptions.coverPeriod} Month{coverageOptions.coverPeriod > 1 ? 's' : ''}:</span>
              <span>{quote.totalPrice.toLocaleString('en-ZM', { style: 'currency', currency: 'ZMW' })}</span>
            </div>
            <div className="flex justify-between text-lg font-bold text-primary-600 pulse">
              <span>Monthly Payment:</span>
              <span>{quote.monthlyPrice.toLocaleString('en-ZM', { style: 'currency', currency: 'ZMW' })}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex gap-4 mt-6">
        <button
          type="button"
          onClick={onBack}
          className="btn-secondary flex-1"
        >
          ← Back
        </button>
        <button
          type="button"
          className="btn-primary flex-1 gradient-primary"
          onClick={onAccept}
        >
          Accept Quote ✓
        </button>
      </div>
    </div>
  );
};
