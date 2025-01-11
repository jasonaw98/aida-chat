"use client";

import { signInWithOTP, verifyOTP } from "./actions";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { cn } from "@/lib/utils";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { REGEXP_ONLY_DIGITS } from "input-otp";

export default function LoginPage() {
  const [otpSent, setotpSent] = useState(false);
  const [setOtp, setSetOtp] = useState("");
  const [email, setEmail] = useState("");
  const [isEmailValid, setIsEmailValid] = useState(true);
  const [loading, setloading] = useState(false);

  const handleInputChange = (newValue: string) => {
    setSetOtp(newValue);
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setEmail(value);
    setIsEmailValid(validateEmail(value));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setloading(true);
    const formData = new FormData();
    formData.append("email", email);
    formData.append("otp", setOtp);
    await verifyOTP(formData);
  };

  const validateEmail = (email: string) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };

  return (
    <div className="flex flex-col items-center pt-24 h-screen">
      <div className="w-full max-w-md overflow-hidden">
        <div
          className={cn(
            "w-[200%] flex transition-transform duration-500 ease-in-out",
            otpSent ? " -translate-x-1/2" : "translate-x-0"
          )}
        >
          <div className="flex flex-col items-center gap-8 w-1/2">
            <h1 className="text-4xl text-transparent font-bold bg-clip-text bg-gradient-to-b from-zinc-100 to-zinc-400">
              Enter Your Email
            </h1>
            <form className="flex flex-col gap-8 items-center mt-4 w-full px-4">
              <input
                id="email"
                name="email"
                type="email"
                required
                onChange={handleEmailChange}
                className={cn(
                  "w-full bg-gradient-to-b from-zinc-800 to-zinc-900 text-lg rounded-sm px-2 py-1 focus:outline-none ring-2 ring-slate-700 focus:ring-slate-500 shadow-xl shadow-white/10",
                  !isEmailValid && "ring-2 ring-red-500 focus:ring-red-500"
                )}
              />
              <Button
                formAction={signInWithOTP}
                disabled={!isEmailValid}
                onClick={() => setotpSent(!otpSent)}
              >
                Send OTP
              </Button>
            </form>
            {/* <Button onClick={() => setotpSent(!otpSent)}>Test</Button> */}
          </div>

          <div className="flex flex-col items-center gap-8 w-1/2">
            <h1 className="text-4xl text-transparent font-bold bg-clip-text bg-gradient-to-b from-zinc-100 to-zinc-400">
              Enter Your OTP
            </h1>
            <form
              // action={verifyOTP}
              onSubmit={handleSubmit}
              className="flex flex-col gap-8 items-center mt-4"
            >
              <InputOTP
                maxLength={6}
                pattern={REGEXP_ONLY_DIGITS}
                onChange={handleInputChange}
              >
                <InputOTPGroup>
                  <InputOTPSlot index={0} />
                  <InputOTPSlot index={1} />
                  <InputOTPSlot index={2} />
                  <InputOTPSlot index={3} />
                  <InputOTPSlot index={4} />
                  <InputOTPSlot index={5} />
                </InputOTPGroup>
              </InputOTP>
              <Button type="submit" disabled={setOtp.length < 6}>
                Verify OTP
              </Button>
            </form>

            {loading && (
              <div role="status">
                <svg
                  aria-hidden="true"
                  className="w-8 h-8 text-gray-700 animate-spin dark:text-gray-600 fill-blue-600"
                  viewBox="0 0 100 101"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                    fill="currentColor"
                  />
                  <path
                    d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                    fill="currentFill"
                  />
                </svg>
                <span className="sr-only">Loading...</span>
              </div>
            )}

            {/* <Button onClick={() => setotpSent(!otpSent)}>Test</Button> */}
          </div>
        </div>
      </div>
    </div>
  );
}
