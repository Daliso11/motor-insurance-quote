export interface PersonalInfo {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  nationalId: string;
  nationality: string;
  maritalStatus: 'single' | 'married' | 'divorced' | 'widowed' | '';
  address: string;
}

export interface VehicleDetails {
  make: string;
  model: string;
  engineNumber: string;
  chassisNumber: string;
  registrationNumber: string;
  currentValue: number;
}

export interface DriverInfo {
  dateOfBirth: string;
  licenseNumber: string;
  licenseIssuedDate: string;
  licenseExpiryDate: string;
  licenseCode: string;
  occupation: string;
}

export interface CoverageOptions {
  coverageType: 'comprehensive' | 'thirdParty' | 'thirdPartyFireTheft';
  useOfVehicle: 'private' | 'commercial' | '';
  coverPeriod: 1 | 3 | 6 | 12;
  excessAmount: number;
  includePassengerLiability: boolean;
  includeRiotStrike: boolean;
  includeExcessProtector: boolean;
  includeCarHire: boolean;
  includeRoadsideAssistance: boolean;
  includeCrossBorder: boolean;
  declarationAccepted: boolean;
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
