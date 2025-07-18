import React, { useState } from 'react';
import './App.css';
import { Logo } from './components/Logo';
import { PersonalInfoForm } from './components/PersonalInfoForm';
import { VehicleDetailsForm } from './components/VehicleDetailsForm';
import { DriverInfoForm } from './components/DriverInfoForm';
import { CoverageForm } from './components/CoverageForm';
import { QuoteSummary } from './components/QuoteSummary';
import { PersonalInfo, VehicleDetails, DriverInfo, CoverageOptions } from './types/insurance';

function App() {
  const [currentStep, setCurrentStep] = useState(1);
  
  const [personalInfo, setPersonalInfo] = useState<PersonalInfo>({
    firstName: '',
    lastName: '',
    email: '',
    phone: ''
  });

  const [vehicleDetails, setVehicleDetails] = useState<VehicleDetails>({
    make: '',
    model: '',
    year: new Date().getFullYear(),
    registrationNumber: '',
    vehicleType: 'car',
    currentValue: 0
  });

  const [driverInfo, setDriverInfo] = useState<DriverInfo>({
    dateOfBirth: '',
    licenseYears: 0,
    hasAccidents: false,
    numberOfClaims: 0,
    occupation: ''
  });

  const [coverageOptions, setCoverageOptions] = useState<CoverageOptions>({
    coverageType: 'comprehensive' as const,
    voluntaryExcess: 0,
    additionalDrivers: 0,
    includeBreakdown: false,
    includeWindscreen: false,
    includeLegalCover: false
  });

  const nextStep = () => setCurrentStep(currentStep + 1);
  const prevStep = () => setCurrentStep(currentStep - 1);

  return (
    <div className="min-h-screen relative">
      {/* Background Image */}
      <div 
        className="fixed inset-0 z-0"
        style={{
          backgroundImage: 'url(/lusaka-city-skyline.png)',
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'center bottom',
          backgroundSize: 'contain'
        }}
      />
      
      {/* Content */}
      <div className="container mx-auto px-4 py-8 relative z-10">
        <div className="max-w-4xl mx-auto">
          {/* Logo and Header */}
          <Logo />
          
          {/* Main content area */}
          <div className="bg-white rounded-3xl shadow-2xl p-8 md:p-10">
            {/* Header */}
            <div className="text-center mb-10">
              <h2 className="text-3xl font-display font-bold text-neutral-800 mb-3">Get Your Motor Insurance Quote</h2>
              <p className="text-lg text-neutral-600">Simple, fast, and tailored just for you</p>
            </div>

            {/* Enhanced Progress Bar */}
            <div className="mb-10">
              <div className="flex items-center justify-between relative">
                {/* Progress line */}
                <div className="absolute left-0 right-0 top-5 h-0.5 bg-neutral-200"></div>
                <div 
                  className="absolute left-0 top-5 h-0.5 bg-primary-500 transition-all duration-500"
                  style={{ width: `${((currentStep - 1) / 4) * 100}%` }}
                ></div>
                
                {/* Steps */}
                {[
                  { num: 1, label: 'Personal', icon: '👤' },
                  { num: 2, label: 'Vehicle', icon: '🚗' },
                  { num: 3, label: 'Driver', icon: '📋' },
                  { num: 4, label: 'Coverage', icon: '🛡️' },
                  { num: 5, label: 'Quote', icon: '💰' }
                ].map((step) => (
                  <div key={step.num} className="relative z-10 flex-1 flex flex-col items-center">
                    <div
                      className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 ${
                        step.num <= currentStep
                          ? 'bg-primary-500 text-white shadow-lg scale-110'
                          : 'bg-white border-2 border-neutral-300 text-neutral-500'
                      }`}
                    >
                      <span className="text-lg">{step.icon}</span>
                    </div>
                    <span className={`mt-2 text-xs font-medium transition-all duration-300 ${
                      step.num <= currentStep ? 'text-primary-700' : 'text-neutral-500'
                    }`}>
                      {step.label}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Form Container with enhanced styling */}
            <div className="bg-white rounded-2xl shadow-lg p-8 transition-all duration-500 relative">
              {currentStep === 1 && (
                <PersonalInfoForm
                  data={personalInfo}
                  onChange={setPersonalInfo}
                  onNext={nextStep}
                />
              )}
              {currentStep === 2 && (
                <VehicleDetailsForm
                  data={vehicleDetails}
                  onChange={setVehicleDetails}
                  onNext={nextStep}
                  onBack={prevStep}
                />
              )}
              {currentStep === 3 && (
                <DriverInfoForm
                  data={driverInfo}
                  onChange={setDriverInfo}
                  onNext={nextStep}
                  onBack={prevStep}
                />
              )}
              {currentStep === 4 && (
                <CoverageForm
                  data={coverageOptions}
                  onChange={setCoverageOptions}
                  onNext={nextStep}
                  onBack={prevStep}
                />
              )}
              {currentStep === 5 && (
                <QuoteSummary
                  personalInfo={personalInfo}
                  vehicleDetails={vehicleDetails}
                  driverInfo={driverInfo}
                  coverageOptions={coverageOptions}
                  onBack={prevStep}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
