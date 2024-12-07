import { SignIn } from "@clerk/nextjs";

export default function Page() {
  return (
    <div className="flex items-center justify-center pt-12">
      <SignIn
        signUpFallbackRedirectUrl={"/chatapp"}
        fallbackRedirectUrl={"/chatapp"}
      />
    </div>
  );
}
