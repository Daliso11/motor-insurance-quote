import { QuoteData, Quote } from '../types/insurance';

export const calculateQuote = (data: QuoteData): Quote => {
  let basePrice = 500; // Base annual price
  let discount = 0;
  let additionalCharges = 0;

  // Vehicle factors
  const vehicleAge = new Date().getFullYear() - data.vehicle.year;
  if (vehicleAge > 10) {
    basePrice += 200;
  } else if (vehicleAge < 3) {
    basePrice += 100;
  }

  // Vehicle value factor
  basePrice += data.vehicle.currentValue * 0.02;

  // Vehicle type factor
  if (data.vehicle.vehicleType === 'motorcycle') {
    basePrice *= 0.8;
  } else if (data.vehicle.vehicleType === 'van') {
    basePrice *= 1.2;
  }

  // Driver age factor
  const driverAge = new Date().getFullYear() - new Date(data.driver.dateOfBirth).getFullYear();
  if (driverAge < 25) {
    basePrice *= 1.5;
  } else if (driverAge > 50) {
    discount += basePrice * 0.1;
  }

  // Experience factor
  if (data.driver.licenseYears > 10) {
    discount += basePrice * 0.15;
  } else if (data.driver.licenseYears < 2) {
    basePrice *= 1.3;
  }

  // Claims history
  if (data.driver.hasAccidents || data.driver.numberOfClaims > 0) {
    basePrice += data.driver.numberOfClaims * 200;
  } else {
    discount += basePrice * 0.2; // No claims bonus
  }

  // Coverage type
  if (data.coverage.coverageType === 'comprehensive') {
    basePrice *= 1.3;
  } else if (data.coverage.coverageType === 'thirdParty') {
    basePrice *= 0.6;
  } else {
    basePrice *= 0.8;
  }

  // Additional options
  if (data.coverage.includeBreakdown) additionalCharges += 80;
  if (data.coverage.includeWindscreen) additionalCharges += 60;
  if (data.coverage.includeLegalCover) additionalCharges += 40;
  
  // Additional drivers
  additionalCharges += data.coverage.additionalDrivers * 150;

  // Voluntary excess discount
  if (data.coverage.voluntaryExcess >= 500) {
    discount += basePrice * 0.1;
  }

  const totalPrice = Math.max(basePrice - discount + additionalCharges, 200);
  const monthlyPrice = totalPrice / 12;

  return {
    basePrice: Math.round(basePrice),
    discount: Math.round(discount),
    additionalCharges: Math.round(additionalCharges),
    totalPrice: Math.round(totalPrice),
    monthlyPrice: Math.round(monthlyPrice * 100) / 100
  };
};
