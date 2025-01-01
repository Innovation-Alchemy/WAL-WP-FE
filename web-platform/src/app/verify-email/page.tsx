'use client';
import React from 'react';
import Link from 'next/link';
import Button from '@/components/button';
import OTPInput from '@/components/otp-input';
import RepeatedLogo from '@/components/repeated-logo';
import { useRouter } from 'next/navigation';
import { INDEX_ROUTE } from '@/utils/navigation';

const VerifyEmail = () => {
  const router = useRouter();

  return (
    <div className="flex flex-col lg:flex-row bg-black text-secondary">
      <RepeatedLogo />

      <div className="w-full lg:w-1/2 h-screen flex flex-col justify-center px-6 sm:px-8 md:px-12 lg:px-20 xl:px-32 2xl:px-60">
        <h1 className="text-2xl md:text-3xl font-bold mb-6 leading-snug">
          Welcome To <br /> We Are Lebanon!
        </h1>
        <p className="text-sm md:text-base mb-6">
          We have sent you an email to verify your account. Please Log In after you verify your account.
        </p>
        <Button text="Continue" fullWidth onClick={() => router.push(INDEX_ROUTE)} />
      </div>
    </div>
  );
};

export default VerifyEmail;
