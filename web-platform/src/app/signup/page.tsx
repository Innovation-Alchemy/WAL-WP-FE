'use client';
import React, { useState } from 'react';
import Link from 'next/link';
import InputField from '@/components/input-field';
import Button from '@/components/button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faApple, faFacebook, faGoogle } from '@fortawesome/free-brands-svg-icons';
import {INDEX_ROUTE,VERIFY_EMAIL_ROUTE } from '@/utils/navigation';
import { useRouter } from 'next/navigation';
import RepeatedLogo from '@/components/repeated-logo';
import GenderInput from '@/components/gender-input';
import BirthdateInput from '@/components/birthdate-input';
import PhoneNumberInput from '@/components/phonenumber-input';
import { countryOptions } from '@/utils/country-codes';

const SignUp = () => {
  const router = useRouter();
  const [isChecked, setIsChecked] = useState(false);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [selectedGender, setSelectedGender] = useState('');
  const [birthdate, setBirthdate] = useState('');
  const [countryCode, setCountryCode] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const baseURL = "https://wal-wp-be.onrender.com";
  const handleDateChange = (date: string) => {
    setBirthdate(date);
  };

  const toggleCheckbox = () => {
    setIsChecked(!isChecked);
  };

  const validateInputs = () => {
    if (!firstName || !lastName) return 'First Name and Last Name are required.';
    if (!email) return 'Email is required.';
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) return 'Invalid email format.';
    if (!password || password.length < 8) return 'Password must be at least 8 characters long.';
    if (!selectedGender) return 'Gender is required.';
    if (!birthdate) return 'Birthdate is required.';
    if (!phoneNumber || !/^\d+$/.test(phoneNumber)) return 'Phone number must contain only digits.';
    return null;
  };

  const handleSignUp = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    // Input Validation
    const validationError = validateInputs();
    if (validationError) {
      setErrorMessage(validationError);
      return;
    }

    const payload = {
      name: `${firstName} ${lastName}`,
      email,
      password,
      gender: selectedGender.toLowerCase(),
      birthdate,
      role: 'User',
      phone_number: `${countryCode}${phoneNumber}`,
    };
    try {
      const response = await fetch(`${baseURL}/api/auth/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      if (!response.ok) {
        setErrorMessage(data.message || 'An error occurred. Please try again.');
        return;
      }

      // Redirect on success
      router.push(VERIFY_EMAIL_ROUTE);
    } catch (error) {
      setErrorMessage('An unexpected error occurred. Please try again.');
    }
  };

  return (
    <div>
      <div className="flex flex-col lg:flex-row bg-black text-secondary">
        <RepeatedLogo />

        <div className="w-full container mx-auto lg:w-1/2 min-h-screen flex flex-col justify-center px-6 lg:px-8 xl:px-32 2xl:px-48 my-20 lg:my-12">
          <div>
            <div className="py-6">
              <h1 className="text-2xl md:text-3xl font-bold mb-2">
                Sign up now!
              </h1>
              <p className="text-sm md:text-bas">
                Enter your details to create your account
              </p>
            </div>

            <form>
              {errorMessage && (
                <p className="text-red-500 text-sm mb-4">{errorMessage}</p>
              )}

              <div className="flex space-x-6 mb-4">
                <div className="w-1/2">
                  <label className="block mb-2 font-bold text-sm md:text-base">
                    First Name
                  </label>
                  <InputField
                    type="text"
                    placeholder="Moe"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                  />
                </div>

                <div className="w-1/2">
                  <label className="block mb-2 font-bold text-sm md:text-base">
                    Last Name
                  </label>
                  <InputField
                    type="text"
                    placeholder="Elias"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                  />
                </div>
              </div>

              <div className="py-2">
                <label className="block mb-2 font-bold text-sm md:text-base">
                  Phone Number
                </label>
                <PhoneNumberInput
                  countryCode={countryCode}
                  onCountryCodeChange={setCountryCode}
                  phoneNumber={phoneNumber}
                  onPhoneNumberChange={setPhoneNumber}
                  countryOptions={countryOptions}
                />
              </div>

              <div className="flex space-x-6 py-2">
                <div className="w-1/2">
                  <label className="block mb-2 font-bold text-sm md:text-base">
                    Birthdate
                  </label>
                  <BirthdateInput
                    date={birthdate}
                    onDateChange={handleDateChange}
                  />
                </div>
                <div className="w-1/2">
                  <label className="block mb-2 font-bold text-sm md:text-base">
                    Gender
                  </label>
                  <GenderInput
                    selectedGender={selectedGender}
                    onGenderChange={setSelectedGender}
                  />
                </div>
              </div>

              <div className="py-2">
                <label className="block mb-2 font-bold text-sm md:text-base">
                  Email
                </label>
                <InputField
                  type="email"
                  placeholder="MoeElias@hotmail.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>

              <div className="py-2">
                <label className="block mb-2 font-bold text-sm md:text-base">
                  Password
                </label>
                <InputField
                  type="password"
                  placeholder="Enter Your Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>

              <Button text="Sign Up" fullWidth onClick={handleSignUp} />

              <p className="mt-4 text-center">
                already have an account?{' '}
                <Link
                  href={INDEX_ROUTE}
                  className="text-primary underline font-bold hover:text-red-400"
                >
                  sign in
                </Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;