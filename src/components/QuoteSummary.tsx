import React, { useMemo } from 'react';
import { PersonalInfo, VehicleDetails, DriverInfo, CoverageOptions } from '../types/insurance';

interface Props {
  personalInfo: PersonalInfo;
  vehicleDetails: VehicleDetails;
  driverInfo: DriverInfo;
  coverageOptions: CoverageOptions;
  onBack: () => void;
}

export const QuoteSummary: React.FC<Props> = ({ 
  personalInfo, 
  vehicleDetails, 
  driverInfo, 
  coverageOptions, 
  onBack 
}) => {
  const quote = useMemo(() => {
    // Base rate calculation based on vehicle value and type
    let baseRate = 0;
    const vehicleValue = vehicleDetails.currentValue;
    
    // Base rates by vehicle type
    if (vehicleDetails.vehicleType === 'car') {
      baseRate = vehicleValue * 0.025; // 2.5% of vehicle value
    } else if (vehicleDetails.vehicleType === 'motorcycle') {
      baseRate = vehicleValue * 0.035; // 3.5% of vehicle value
    } else if (vehicleDetails.vehicleType === 'van') {
      baseRate = vehicleValue * 0.03; // 3% of vehicle value
    }

    // Age factor
    const currentYear = new Date().getFullYear();
    const birthYear = new Date(driverInfo.dateOfBirth).getFullYear();
    const age = currentYear - birthYear;
    let ageFactor = 1;
    
    if (age < 25) ageFactor = 1.5;
    else if (age >= 25 && age < 30) ageFactor = 1.2;
    else if (age >= 30 && age < 65) ageFactor = 1.0;
    else ageFactor = 1.1;

    // Experience factor
    let experienceFactor = 1;
    if (driverInfo.licenseYears < 2) experienceFactor = 1.3;
    else if (driverInfo.licenseYears >= 2 && driverInfo.licenseYears < 5) experienceFactor = 1.1;
    else if (driverInfo.licenseYears >= 5) experienceFactor = 0.9;

    // Accident factor
    let accidentFactor = 1;
    if (driverInfo.hasAccidents) {
      accidentFactor = 1 + (driverInfo.numberOfClaims * 0.2);
    }

    // Coverage type factor
    let coverageFactor = 1;
    if (coverageOptions.coverageType === 'comprehensive') coverageFactor = 1.0;
    else if (coverageOptions.coverageType === 'thirdPartyFireTheft') coverageFactor = 0.7;
    else if (coverageOptions.coverageType === 'thirdParty') coverageFactor = 0.5;

    // Calculate base premium
    const basePremium = baseRate * ageFactor * experienceFactor * accidentFactor * coverageFactor;

    // Additional charges (in Kwacha)
    let additionalCharges = 0;
    if (coverageOptions.includeBreakdown) additionalCharges += 1800; // ~K1,800 for breakdown cover
    if (coverageOptions.includeWindscreen) additionalCharges += 1200; // ~K1,200 for windscreen
    if (coverageOptions.includeLegalCover) additionalCharges += 800; // ~K800 for legal cover
    additionalCharges += coverageOptions.additionalDrivers * 3500; // ~K3,500 per additional driver

    // Apply voluntary excess discount
    let excessDiscount = 0;
    if (coverageOptions.voluntaryExcess > 0) {
      excessDiscount = basePremium * (coverageOptions.voluntaryExcess / 10000); // Max 10% discount
      excessDiscount = Math.min(excessDiscount, basePremium * 0.1);
    }

    const totalAnnual = basePremium + additionalCharges - excessDiscount;
    const monthlyPrice = totalAnnual / 12;

    return {
      basePrice: basePremium,
      discount: excessDiscount,
      additionalCharges: additionalCharges,
      totalPrice: totalAnnual,
      monthlyPrice: monthlyPrice,
      ageFactor,
      experienceFactor,
      accidentFactor,
      coverageFactor
    };
  }, [vehicleDetails, driverInfo, coverageOptions]);

  return (
<div className="space-y-6">
      <h2 className="text-2xl font-display text-gradient mb-6">Your Insurance Quote</h2>
      
      {/* Customer Information */}
      <div className="bg-gray-50 p-4 rounded-xl shadow-soft hover:shadow-xl transition-all duration-300">
        <h3 className="text-primary-600 font-semibold text-lg mb-2">Customer Information</h3>
        <p className="text-gray-700">{personalInfo.firstName} {personalInfo.lastName}</p>
        <p className="text-gray-700">{personalInfo.email}</p>
        <p className="text-gray-700">{personalInfo.phone}</p>
      </div>

      {/* Vehicle Information */}
      <div className="bg-gray-50 p-4 rounded-lg">
        <h3 className="font-semibold text-lg mb-2">Vehicle Details</h3>
        <p className="text-gray-700">{vehicleDetails.year} {vehicleDetails.make} {vehicleDetails.model}</p>
        <p className="text-gray-700">Registration: {vehicleDetails.registrationNumber}</p>
        <p className="text-gray-700">Current Value: {vehicleDetails.currentValue.toLocaleString('en-ZM', { style: 'currency', currency: 'ZMW' })}</p>
      </div>

      {/* Coverage Summary */}
      <div className="bg-gray-50 p-4 rounded-lg">
        <h3 className="font-semibold text-lg mb-2">Coverage Summary</h3>
        <p className="text-gray-700">Coverage Type: {coverageOptions.coverageType}</p>
        <p className="text-gray-700">Voluntary Excess: {coverageOptions.voluntaryExcess.toLocaleString('en-ZM', { style: 'currency', currency: 'ZMW' })}</p>
        <p className="text-gray-700">Additional Drivers: {coverageOptions.additionalDrivers}</p>
        <div className="mt-2">
          {coverageOptions.includeBreakdown && <p className="text-gray-700">✓ Breakdown Cover</p>}
          {coverageOptions.includeWindscreen && <p className="text-gray-700">✓ Windscreen Cover</p>}
          {coverageOptions.includeLegalCover && <p className="text-gray-700">✓ Legal Cover</p>}
        </div>
      </div>

      {/* Quote Breakdown */}
      <div className="bg-blue-50 p-6 rounded-lg">
        <h3 className="font-semibold text-lg mb-4">Quote Breakdown</h3>
        <div className="space-y-2">
          <div className="flex justify-between">
            <span className="text-gray-700">Base Premium:</span>
            <span className="font-medium">{quote.basePrice.toLocaleString('en-ZM', { style: 'currency', currency: 'ZMW' })}</span>
          </div>
          {quote.additionalCharges > 0 && (
            <div className="flex justify-between">
              <span className="text-gray-700">Additional Coverage:</span>
              <span className="font-medium">+{quote.additionalCharges.toLocaleString('en-ZM', { style: 'currency', currency: 'ZMW' })}</span>
            </div>
          )}
          {quote.discount > 0 && (
            <div className="flex justify-between">
              <span className="text-gray-700">Voluntary Excess Discount:</span>
              <span className="font-medium text-green-600">-{quote.discount.toLocaleString('en-ZM', { style: 'currency', currency: 'ZMW' })}</span>
            </div>
          )}
          <div className="border-t pt-2 mt-2">
            <div className="flex justify-between text-lg font-bold">
              <span>Annual Total:</span>
              <span>{quote.totalPrice.toLocaleString('en-ZM', { style: 'currency', currency: 'ZMW' })}</span>
            </div>
            <div className="flex justify-between text-lg font-bold text-blue-600">
              <span>Monthly Payment:</span>
              <span>{quote.monthlyPrice.toLocaleString('en-ZM', { style: 'currency', currency: 'ZMW' })}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex gap-4">
        <button
          type="button"
          onClick={onBack}
          className="flex-1 bg-gray-300 text-gray-700 py-2 px-4 rounded-md hover:bg-gray-400 transition duration-200"
        >
          Back
        </button>
        <button
          type="button"
          className="flex-1 bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-700 transition duration-200"
          onClick={() => alert('Quote saved! A representative will contact you soon.')}
        >
          Accept Quote
        </button>
      </div>
    </div>
  );
};
