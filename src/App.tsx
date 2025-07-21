import React, { useState } from 'react';
import './App.css';
import { Logo } from './components/Logo';
import { PersonalInfoForm } from './components/PersonalInfoForm';
import { VehicleDetailsForm } from './components/VehicleDetailsForm';
import { DriverInfoForm } from './components/DriverInfoForm';
import { CoverageForm } from './components/CoverageForm';
import { QuoteSummary } from './components/QuoteSummary';
import { Toast } from './components/Toast';
import { PersonalInfo, VehicleDetails, DriverInfo, CoverageOptions } from './types/insurance';

function App() {
  const [currentStep, setCurrentStep] = useState(1);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [toastType, setToastType] = useState<'success' | 'error' | 'info'>('success');
  
  const [personalInfo, setPersonalInfo] = useState<PersonalInfo>({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    nationalId: '',
    gender: '',
    maritalStatus: '',
    address: '',
    city: '',
    postalCode: ''
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
  
  const handleAcceptQuote = () => {
    setToastMessage('🎉 Quote accepted successfully! Our team will contact you within 24 hours.');
    setToastType('success');
    setShowToast(true);
    
    // Reset form after a delay
    setTimeout(() => {
      setCurrentStep(1);
      // Reset all form data
      setPersonalInfo({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        nationalId: '',
        gender: '',
        maritalStatus: '',
        address: '',
        city: '',
        postalCode: ''
      });
      setVehicleDetails({
        make: '',
        model: '',
        year: new Date().getFullYear(),
        registrationNumber: '',
        vehicleType: 'car',
        currentValue: 0
      });
      setDriverInfo({
        dateOfBirth: '',
        licenseYears: 0,
        hasAccidents: false,
        numberOfClaims: 0,
        occupation: ''
      });
      setCoverageOptions({
        coverageType: 'comprehensive' as const,
        voluntaryExcess: 0,
        additionalDrivers: 0,
        includeBreakdown: false,
        includeWindscreen: false,
        includeLegalCover: false
      });
    }, 3000);
  };

  return (
    <div className="min-h-screen relative">
      {/* Background Image */}
      <div 
        className="fixed inset-0 z-0"
        style={{
          backgroundImage: 'url(/lusaka.png)',
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
                  { num: 1, label: 'Personal', icon: (
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                    </svg>
                  )},
                  { num: 2, label: 'Vehicle', icon: (
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M8 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM15 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z" />
                      <path d="M3 4a1 1 0 00-1 1v10a1 1 0 001 1h1.05a2.5 2.5 0 014.9 0H10a1 1 0 001-1V5a1 1 0 00-1-1H3zM14 7a1 1 0 00-1 1v6.05A2.5 2.5 0 0115.95 16H17a1 1 0 001-1v-5a1 1 0 00-.293-.707l-2-2A1 1 0 0015 7h-1z" />
                    </svg>
                  )},
                  { num: 3, label: 'Driver', icon: (
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-6-3a2 2 0 11-4 0 2 2 0 014 0zm-2 4a5 5 0 00-4.546 2.916A5.986 5.986 0 0010 16a5.986 5.986 0 004.546-2.084A5 5 0 0010 11z" clipRule="evenodd" />
                    </svg>
                  )},
                  { num: 4, label: 'Coverage', icon: (
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                  )},
                  { num: 5, label: 'Quote', icon: (
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M8.433 7.418c.155-.103.346-.196.567-.267v1.698a2.305 2.305 0 01-.567-.267C8.07 8.34 8 8.114 8 8c0-.114.07-.34.433-.582zM11 12.849v-1.698c.22.071.412.164.567.267.364.243.433.468.433.582 0 .114-.07.34-.433.582a2.305 2.305 0 01-.567.267z" />
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-13a1 1 0 10-2 0v.092a4.535 4.535 0 00-1.676.662C6.602 6.234 6 7.009 6 8c0 .99.602 1.765 1.324 2.246.48.32 1.054.545 1.676.662v1.941c-.391-.127-.68-.317-.843-.504a1 1 0 10-1.51 1.31c.562.649 1.413 1.076 2.353 1.253V15a1 1 0 102 0v-.092a4.535 4.535 0 001.676-.662C13.398 13.766 14 12.991 14 12c0-.99-.602-1.765-1.324-2.246A4.535 4.535 0 0011 9.092V7.151c.391.127.68.317.843.504a1 1 0 101.511-1.31c-.563-.649-1.413-1.076-2.354-1.253V5z" clipRule="evenodd" />
                    </svg>
                  )}
                ].map((step) => (
                  <div key={step.num} className="relative z-10 flex-1 flex flex-col items-center">
                    <div
                      className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 ${
                        step.num <= currentStep
                          ? 'bg-primary-500 text-white shadow-lg scale-110'
                          : 'bg-white border-2 border-neutral-300 text-neutral-500'
                      }`}
                    >
                      {step.icon}
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

            {/* Form Content */}
            <div className="transition-all duration-500">
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
                  onAccept={handleAcceptQuote}
                />
              )}
            </div>
          </div>
        </div>
      </div>
      
      {/* Toast Notification */}
      {showToast && (
        <Toast
          message={toastMessage}
          type={toastType}
          onClose={() => setShowToast(false)}
        />
      )}
    </div>
  );
}

export default App;
