'use client';
import React from 'react';
import Link from 'next/link';
import Button from '@/components/button';
import OTPInput from '@/components/otp-input';
import RepeatedLogo from '@/components/repeated-logo';
import { useRouter } from 'next/navigation';
import { HOBBIES_ROUTE } from '@/utils/navigation';

const OTPPage = () => {
  const router = useRouter();

  const handleOTPSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log('Form submitted with OTP');
    router.push(HOBBIES_ROUTE);
  };

  const handleOTPComplete = (otp: string) => {
    console.log('Entered OTP:', otp);
  };

  return (
    <div className="flex flex-col lg:flex-row bg-black text-secondary">
      <RepeatedLogo />

      <div className="w-full lg:w-1/2 h-screen flex flex-col justify-center px-6 sm:px-8 md:px-12 lg:px-20 xl:px-32 2xl:px-60">
        <h1 className="text-2xl md:text-3xl font-bold mb-6 leading-snug">
          Enter the code that was sent <br /> to your email address
        </h1>

        <form onSubmit={handleOTPSubmit} className="w-full">
          <OTPInput length={6} onComplete={handleOTPComplete} />

          <Button text="Continue" fullWidth />

          <p className="mt-4 text-center text-sm">
            didn’t receive a code?{' '}
            <Link href="#" className="text-primary underline font-bold">
              resend
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default OTPPage;
