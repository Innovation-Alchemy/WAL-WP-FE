import React, { useRef } from 'react';

interface OTPInputProps {
  length: number;
  onComplete?: (otp: string) => void;
}

const OTPInput: React.FC<OTPInputProps> = ({ length, onComplete }) => {
  const inputRefs = useRef<Array<HTMLInputElement | null>>([]);
  const otpValues = useRef<string[]>(Array(length).fill(''));

  const handleInputChange = (index: number, value: string) => {
    if (!/^\d?$/.test(value)) return;

    otpValues.current[index] = value;

    if (value && index < length - 1) {
      inputRefs.current[index + 1]?.focus();
    }

    if (onComplete && otpValues.current.join('').length === length) {
      onComplete(otpValues.current.join(''));
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent) => {
    if (
      e.key === 'Backspace' &&
      index > 0 &&
      !(e.target as HTMLInputElement).value
    ) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handleInput = (e: React.FormEvent<HTMLInputElement>) => {
    const input = e.currentTarget;
    input.value = input.value.replace(/\D/g, '');
  };

  return (
    <div className="flex mb-8 justify-between">
      {[...Array(length)].map((_, index) => (
        <input
          key={index}
          type="tel"
          maxLength={1}
          ref={(el) => {
            inputRefs.current[index] = el;
          }}
          onChange={(e) =>
            handleInputChange(index, (e.target as HTMLInputElement).value)
          }
          onInput={handleInput}
          onKeyDown={(e) => handleKeyDown(index, e)}
          className="w-10 h-12 md:w-16 md:h-16 font-bold text-center bg-primary rounded-md text-secondary text-2xl focus:outline-none focus:ring-2 focus:ring-red-300"
        />
      ))}
    </div>
  );
};

export default OTPInput;
