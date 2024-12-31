'use client';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import InputField from '@/components/input-field';
import Button from '@/components/button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck } from '@fortawesome/free-solid-svg-icons';
// import { faApple, faFacebook, faGoogle } from '@fortawesome/free-brands-svg-icons';
import { FORGOTPASSWORD_ROUTE, SINGUP_ROUTE } from '@/utils/navigation';
import RepeatedLogo from '@/components/repeated-logo';

export default function Home() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [isChecked, setIsChecked] = useState(false);
  const baseURL = "http://localhost:8080";
  const router = useRouter();

  const toggleCheckbox = () => {
    setIsChecked(!isChecked);
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const isValidEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
  
    if (!isValidEmail(email)) {
      setErrorMessage('Please enter a valid email address.');
      return;
    }
  
    if (!password) {
      setErrorMessage('Password cannot be empty.');
      return;
    }
  
    try {
      const response = await fetch(`${baseURL}/api/auth/login`, { // Use your actual base URL here
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });
  
      const data = await response.json();
  
      if (!response.ok) {
        setErrorMessage(data.message || 'An error occurred. Please try again.');
        return;
      }
  
      // Store the token based on the "Remember Me" checkbox state
      if (isChecked) {
        localStorage.setItem('token', data.token); // Persistent storage
      } else {
        sessionStorage.setItem('token', data.token); // Session-only storage
      }
  
      // Redirect based on hobbies
      if (!data.data.hobbies) {
        router.push('/hobbies');
      } else {
        router.push('/events');
      }
    } catch (error) {
      setErrorMessage('An unexpected error occurred. Please try again.');
    }
  };

  return (
    <div className="flex flex-col lg:flex-row bg-black text-secondary">
      <RepeatedLogo />

      <div className="w-full lg:w-1/2 h-screen flex flex-col justify-center px-6 sm:px-8 md:px-12 lg:px-20 xl:px-32 2xl:px-60">
        <h1 className="text-2xl md:text-3xl font-bold mb-6">
          Log in to your Account
        </h1>

        <form onSubmit={handleLogin}>
          {errorMessage && (
            <p className="text-red-500 text-sm mb-4">{errorMessage}</p>
          )}

          <div className="mb-4">
            <label className="block mb-2 font-bold text-sm md:text-base">
              Email
            </label>
            <InputField
              type="email"
              placeholder="example@mail.com"
              value={email}
              onChange={handleEmailChange}
            />
          </div>

          <div className="mb-4">
            <label className="block mb-2 font-bold text-sm md:text-base">
              Password
            </label>
            <InputField
              type="password"
              placeholder="Enter Your Password"
              value={password}
              onChange={handlePasswordChange}
            />
          </div>

          <div className="flex justify-between items-center mb-6 text-sm">
            <label className="flex items-center cursor-pointer">
              <input
                type="checkbox"
                className="hidden"
                checked={isChecked}
                onChange={toggleCheckbox}
              />
              <div
                className={`w-5 h-5 flex items-center justify-center border-2 border-primary rounded-md ${
                  isChecked ? 'bg-primary' : 'bg-transparent'
                }`}
              >
                {isChecked && <FontAwesomeIcon icon={faCheck} className="text-white" />}
              </div>
              <span className="ml-2 text-sm text-secondary">Remember me</span>
            </label>
            <Link
              href={FORGOTPASSWORD_ROUTE}
              className="text-primary underline"
            >
              Forgot Password?
            </Link>
          </div>

          <Button text="Sign In" fullWidth />

          <p className="mt-4 text-center">
            don’t have an account?{' '}
            <Link
              href={SINGUP_ROUTE}
              className="text-primary underline font-bold hover:text-red-400"
            >
              sign up
            </Link>
          </p>
        </form>
{/* 
        <div className="flex justify-center mt-6 space-x-10">
          <button className="flex items-center justify-center w-6 h-6 ">
            <FontAwesomeIcon
              icon={faGoogle}
              className="text-secondary"
              size="lg"
            />
          </button>

          <button className="flex items-center justify-center w-6 h-6 ">
            <FontAwesomeIcon
              icon={faFacebook}
              className="text-secondary"
              size="lg"
            />
          </button>

          <button className="flex items-center justify-center w-6 h-6 ">
            <FontAwesomeIcon
              icon={faApple}
              className="text-secondary"
              size="lg"
            />
          </button>
        </div> */}
      </div>
    </div>
  );
}