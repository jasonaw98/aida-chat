import { getUser, signOut } from "@/app/(auth)/login/actions";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { User, Mail, Phone, Calendar } from "lucide-react";
import Image from "next/image";
import { redirect } from "next/navigation";
import { getUserData } from "@/app/actions/actions";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Button } from "../ui/button";

export const Profile = async () => {
  const { user } = await getUser();
  if (!user) {
    redirect("/");
  }
  if (!user.email) {
    return (
      <div className="text-red-500 text-xl font-semibold flex flex-col items-center justify-center h-full">
        Error: User is not Logged In
      </div>
    );
  }

  try {
    const userdata = await getUserData(user.email);

    return (
      <div className="flex w-full px-4 h-[95%]">
        <Card className="h-full w-full shadow-inner shadow-white/20">
          <CardHeader>
            <CardTitle className="text-2xl text-transparent font-bold bg-clip-text bg-linear-to-b from-zinc-100 to-zinc-400 -mt-2">
              Profile
            </CardTitle>
            <div className="flex justify-center">
              <Avatar>
                <AvatarImage
                  src={`https://api.dicebear.com/6.x/initials/svg?seed=${userdata.username}`}
                />
                <AvatarFallback>{user.email.charAt(0)}</AvatarFallback>
              </Avatar>
            </div>
          </CardHeader>
          <CardContent>
            {user && (
              <div className="flex flex-col gap-20">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <InfoItem
                    icon={<User className="w-5 h-5" />}
                    label="Username"
                    value={userdata.username ?? "Anonymous"}
                  />
                  <InfoItem
                    icon={<Mail className="w-5 h-5" />}
                    label="Email"
                    value={user.email ?? "Anonymous"}
                  />
                  <InfoItem
                    icon={<Phone className="w-5 h-5" />}
                    label="Phone"
                    value={userdata.phone_number ?? "Anonymous"}
                  />

                  <InfoItem
                    icon={<Calendar className="w-5 h-5" />}
                    label="Joined"
                    value={new Date(user.created_at).toLocaleDateString(
                      "en-US",
                      {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      }
                    )}
                  />
                </div>

                <form action={signOut} className="flex justify-center">
                  <Button variant={"destructive"} className="w-1/2" type="submit">
                    Sign Out
                  </Button>
                </form>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    );
  } catch (error) {
    console.error("Failed to fetch user data:", error);
    return (
      <div className="text-red-500 text-xl font-semibold flex flex-col items-center justify-center h-full">
        Error: Failed to fetch user data.
      </div>
    );
  }
};

function InfoItem({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string | null;
}) {
  return (
    <div className="flex items-center space-x-3 p-3 rounded-lg bg-secondary">
      <div className="shrink-0">{icon}</div>
      <div>
        <p className="text-sm font-medium text-muted-foreground">{label}</p>
        <p className="text-base font-semibold">{value}</p>
      </div>
    </div>
  );
}
