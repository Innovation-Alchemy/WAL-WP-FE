'use client';
import React, { useState } from 'react';
import Link from 'next/link';
import InputField from '@/components/input-field';
import Button from '@/components/button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faApple,
  faFacebook,
  faGoogle,
} from '@fortawesome/free-brands-svg-icons';
import { INDEX_ROUTE, OTP_SIGNUP_ROUTE } from '@/utils/navigation';
import { useRouter } from 'next/navigation';
import RepeatedLogo from '@/components/repeated-logo';
import { faCheck } from '@fortawesome/free-solid-svg-icons';

const SignUp = () => {
  const router = useRouter();
  const [isChecked, setIsChecked] = useState(false);

  const toggleCheckbox = () => {
    setIsChecked(!isChecked);
  };

  const onClickSignUp = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    router.push(OTP_SIGNUP_ROUTE);
  };

  return (
    <div>
      <div className="flex flex-col lg:flex-row bg-black text-secondary">
        <RepeatedLogo />

        <div className="w-full lg:w-1/2 h-screen flex flex-col justify-center px-6 sm:px-8 md:px-12 lg:px-20 xl:px-32 2xl:px-60">
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
              <div className="flex space-x-6 mb-4">
                <div className="w-1/2">
                  <label className="block mb-2 font-bold text-sm md:text-base">
                    First Name
                  </label>
                  <InputField type="text" placeholder="Moe" />
                </div>

                <div className="w-1/2">
                  <label className="block mb-2 font-bold text-sm md:text-base">
                    Last Name
                  </label>
                  <InputField type="text" placeholder="Elias" />
                </div>
              </div>

              <div className="mb-4">
                <label className="block mb-2 font-bold text-sm md:text-base">
                  Email
                </label>
                <InputField type="email" placeholder="MoeElias@hotmail.com" />
              </div>

              <div className="mb-4">
                <label className="block mb-2 font-bold text-sm md:text-base">
                  Password
                </label>
                <InputField type="password" placeholder="Enter Your Password" />
              </div>

              <div className="mb-6 text-sm">
                <div className="flex items-center">
                  <div
                    className={`w-5 h-5 flex items-center justify-center border-2 border-primary rounded-md cursor-pointer ${
                      isChecked ? 'bg-transparent' : 'bg-transparent'
                    }`}
                    onClick={toggleCheckbox}
                  >
                    {isChecked && (
                      <FontAwesomeIcon
                        icon={faCheck}
                        className="text-primary"
                      />
                    )}
                  </div>
                  <label
                    className="ml-2 text-sm text-secondary"
                    onClick={toggleCheckbox}
                  >
                    Remember me
                  </label>
                </div>
              </div>

              <Button text="Sign Up" fullWidth onClick={onClickSignUp} />

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
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
