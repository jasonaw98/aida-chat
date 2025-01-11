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
            {/* <Button onClick={() => setotpSent(!otpSent)}>Test</Button> */}
          </div>
        </div>
      </div>
    </div>
  );
}
