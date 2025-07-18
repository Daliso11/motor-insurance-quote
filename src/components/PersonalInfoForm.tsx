import React from 'react';
import { PersonalInfo } from '../types/insurance';

interface Props {
  data: PersonalInfo;
  onChange: (data: PersonalInfo) => void;
  onNext: () => void;
}

export const PersonalInfoForm: React.FC<Props> = ({ data, onChange, onNext }) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange({
      ...data,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onNext();
  };

  return (
<form onSubmit={handleSubmit} className="space-y-6">
      <h2 className="text-2xl font-display text-primary-800 mb-6">Personal Information</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label htmlFor="firstName" className="block text-sm font-medium text-primary-700 mb-1">
            First Name
          </label>
          <input
            type="text"
            id="firstName"
            name="firstName"
            value={data.firstName}
            onChange={handleChange}
            required
            className="input-field"
          />
        </div>
        
        <div>
          <label htmlFor="lastName" className="block text-sm font-medium text-primary-700 mb-1">
            Last Name
          </label>
          <input
            type="text"
            id="lastName"
            name="lastName"
            value={data.lastName}
            onChange={handleChange}
            required
            className="input-field"
          />
        </div>
      </div>

      <div>
        <label htmlFor="email" className="block text-sm font-medium text-primary-700 mb-1">
          Email Address
        </label>
        <input
          type="email"
          id="email"
          name="email"
          value={data.email}
          onChange={handleChange}
          required
          className="input-field"
          placeholder="john@example.com"
        />
      </div>

      <div>
        <label htmlFor="phone" className="block text-sm font-medium text-primary-700 mb-1">
          Phone Number
        </label>
        <input
          type="tel"
          id="phone"
          name="phone"
          value={data.phone}
          onChange={handleChange}
          required
          placeholder="e.g., +1234567890"
          className="input-field"
        />
      </div>

      <button
        type="submit"
        className="btn-primary w-full mt-6"
      >
        Continue to Vehicle Details →
      </button>
    </form>
  );
};
