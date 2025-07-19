export interface PersonalInfo {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  nationalId: string;
  gender: 'male' | 'female' | '';
  maritalStatus: 'single' | 'married' | 'divorced' | 'widowed' | '';
  address: string;
  city: string;
  postalCode: string;
}

export interface VehicleDetails {
  make: string;
  model: string;
  year: number;
  registrationNumber: string;
  vehicleType: 'car' | 'motorcycle' | 'van';
  currentValue: number;
}

export interface DriverInfo {
  dateOfBirth: string;
  licenseYears: number;
  hasAccidents: boolean;
  numberOfClaims: number;
  occupation: string;
}

export interface CoverageOptions {
  coverageType: 'comprehensive' | 'thirdParty' | 'thirdPartyFireTheft';
  voluntaryExcess: number;
  additionalDrivers: number;
  includeBreakdown: boolean;
  includeWindscreen: boolean;
  includeLegalCover: boolean;
}

export interface QuoteData {
  personal: PersonalInfo;
  vehicle: VehicleDetails;
  driver: DriverInfo;
  coverage: CoverageOptions;
}

export interface Quote {
  basePrice: number;
  discount: number;
  additionalCharges: number;
  totalPrice: number;
  monthlyPrice: number;
}
