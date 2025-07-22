import { QuoteData, Quote } from '../types/insurance';

export const calculateQuote = (data: QuoteData): Quote => {
  let basePrice = 500; // Base annual price
  let discount = 0;
  let additionalCharges = 0;

  // Vehicle value factor - use 2.5% of vehicle value as base
  const vehicleValue = typeof data.vehicle.currentValue === 'number' ? data.vehicle.currentValue : 0;
  basePrice += vehicleValue * 0.025;

  // Driver age factor
  const driverAge = new Date().getFullYear() - new Date(data.driver.dateOfBirth).getFullYear();
  if (driverAge < 25) {
    basePrice *= 1.5;
  } else if (driverAge > 50) {
    discount += basePrice * 0.1;
  }

  // Experience factor based on license issue date
  if (data.driver.licenseIssuedDate) {
    const licenseIssueDate = new Date(data.driver.licenseIssuedDate);
    const today = new Date();
    const yearsSinceLicense = (today.getTime() - licenseIssueDate.getTime()) / (1000 * 60 * 60 * 24 * 365);
    
    if (yearsSinceLicense > 10) {
      discount += basePrice * 0.15;
    } else if (yearsSinceLicense < 2) {
      basePrice *= 1.3;
    }
  }

  // No claims bonus - always apply since we don't track claims anymore
  discount += basePrice * 0.2;

  // Coverage type
  if (data.coverage.coverageType === 'comprehensive') {
    basePrice *= 1.3;
  } else if (data.coverage.coverageType === 'thirdParty') {
    basePrice *= 0.6;
  } else {
    basePrice *= 0.8;
  }

  // Additional options
  if (data.coverage.includePassengerLiability) additionalCharges += 120;
  if (data.coverage.includeRiotStrike) additionalCharges += 80;
  if (data.coverage.includeExcessProtector) additionalCharges += 100;
  if (data.coverage.includeCarHire) additionalCharges += 150;
  if (data.coverage.includeRoadsideAssistance) additionalCharges += 90;
  if (data.coverage.includeCrossBorder) additionalCharges += 110;
  
  // Commercial use surcharge
  if (data.coverage.useOfVehicle === 'commercial') {
    additionalCharges += basePrice * 0.25; // 25% surcharge for commercial use
  }
  
  // Apply excess discount
  if (data.coverage.excessAmount > 5000) {
    discount += basePrice * 0.05; // 5% discount for high excess
  } else if (data.coverage.excessAmount > 10000) {
    discount += basePrice * 0.10; // 10% discount for very high excess
  }

  // Calculate annual price first
  const annualPrice = Math.max(basePrice - discount + additionalCharges, 200);
  
  // Calculate total price based on cover period
  let totalPrice = annualPrice; // Default for 12 months
  
  if (data.coverage.coverPeriod === 1) {
    totalPrice = annualPrice / 12; // 1 month
  } else if (data.coverage.coverPeriod === 3) {
    totalPrice = (annualPrice / 12) * 3; // 3 months
  } else if (data.coverage.coverPeriod === 6) {
    totalPrice = (annualPrice / 12) * 6; // 6 months
  }
  // For 12 months, totalPrice remains as annualPrice
  
  // Monthly payment is total price divided by coverage period
  const monthlyPrice = totalPrice / data.coverage.coverPeriod;

  return {
    basePrice: Math.round(basePrice), // Always show annual base premium
    discount: Math.round(discount), // Always show annual discount
    additionalCharges: Math.round(additionalCharges), // Always show annual additional charges
    totalPrice: Math.round(totalPrice), // Period-adjusted total
    monthlyPrice: Math.round(monthlyPrice * 100) / 100 // Total divided by period
  };
};
