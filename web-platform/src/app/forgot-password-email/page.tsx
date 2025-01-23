'use client';

import React, { useState } from 'react';
import InputField from '@/components/input-field';
import RepeatedLogo from '@/components/repeated-logo';
import Button from '@/components/button';

const ForgotPasswordEmail = () => {
  const [email, setEmail] = useState<string>('');

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  return (
    <div className="flex flex-col lg:flex-row bg-black text-secondary">
      <RepeatedLogo />

      <div className="w-full lg:w-1/2 h-screen flex flex-col justify-center px-6 sm:px-8 md:px-12 lg:px-20 xl:px-32 2xl:px-60">
        <h1 className="text-2xl md:text-3xl font-bold mb-6">
          Enter your email here
        </h1>

        <form>
          <div className="mb-4">
            <label className="block mb-2 font-bold text-sm md:text-base">
              Email
            </label>
            <InputField
              type="email"
              placeholder="Your Email"
              value={email}
              onChange={handleEmailChange}
            />
          </div>

          <Button text="Reset Password" fullWidth />
        </form>
      </div>
    </div>
  );
};

export default ForgotPasswordEmail;
