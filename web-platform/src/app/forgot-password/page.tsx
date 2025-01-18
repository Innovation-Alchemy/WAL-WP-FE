'use client';

import React, { useState } from 'react';
import InputField from '@/components/input-field';
import RepeatedLogo from '@/components/repeated-logo';
import Button from '@/components/button';

const ForgotPassword = () => {
  const [newpassword, setNewPassword] = useState<string>('');
  const [confirmPassword, setConfirmPassword] = useState<string>('');

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewPassword(e.target.value);
  };

  const handleConfirmPasswordChange = (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setConfirmPassword(e.target.value);
  };

  return (
    <div className="flex flex-col lg:flex-row bg-black text-secondary">
      <RepeatedLogo />

      <div className="w-full lg:w-1/2 h-screen flex flex-col justify-center px-6 sm:px-8 md:px-12 lg:px-20 xl:px-32 2xl:px-60">
        <h1 className="text-2xl md:text-3xl font-bold mb-6">
          Enter your new password
        </h1>

        <form>
          <div className="mb-4">
            <label className="block mb-2 font-bold text-sm md:text-base">
              New Password
            </label>
            <InputField
              type="password"
              placeholder="New Password"
              value={newpassword}
              onChange={handlePasswordChange}
            />
          </div>

          <div className="mb-4">
            <label className="block mb-2 font-bold text-sm md:text-base">
              Confirm Password
            </label>
            <InputField
              type="password"
              placeholder="Confirm your password"
              value={confirmPassword}
              onChange={handleConfirmPasswordChange}
            />
          </div>

          <Button text="Reset Password" fullWidth />
        </form>
      </div>
    </div>
  );
};

export default ForgotPassword;
