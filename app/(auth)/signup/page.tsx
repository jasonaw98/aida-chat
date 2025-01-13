import { uploadUserDetails } from "@/app/actions/actions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import React from "react";
import { getUser } from "../login/actions";

export default async function page() {
  const { user } = await getUser();

  return (
    <div className="flex flex-col items-center p-10">
      <h1 className="text-4xl text-transparent font-bold bg-clip-text bg-gradient-to-b from-zinc-100 to-zinc-400">
        Enter Your Details
      </h1>
      <form
        className="flex flex-col gap-7 items-center mt-6 w-full px-4"
        action={uploadUserDetails}
      >
        <div className="flex flex-col gap-2 w-full">
          <label className="text-sm" htmlFor="name">
            Your Email
          </label>
          <Input type="email" disabled value={user?.email} />
          <input type="hidden" name="email" value={user?.email} />
        </div>
        <div className="flex flex-col gap-2 w-full">
          <label className="text-sm" htmlFor="name">
            Enter Your Full Name
          </label>
          <Input
            name="full_name"
            type="text"
            placeholder="Full Name"
            required
          />
        </div>
        <div className="flex flex-col gap-2 w-full">
          <label className="text-sm" htmlFor="name">
            Enter Your Phone Number
          </label>
          <Input
            name="phone_number"
            type="text"
            placeholder="Phone Number"
            required
          />
        </div>
        <div className="flex flex-col gap-2 w-full">
          <label className="text-sm" htmlFor="name">
            Enter Your Username
          </label>
          <Input name="username" type="text" placeholder="Username" required />
        </div>
        <Button type="submit">Submit</Button>
      </form>
    </div>
  );
}
