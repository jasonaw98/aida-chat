import { currentUser } from "@clerk/nextjs/server";
import { UserButton } from "@clerk/nextjs";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { User, Mail, Phone, Calendar } from "lucide-react";
import Image from "next/image";
// import { redirect } from "next/navigation";

export const Profile = async () => {
  const user = await currentUser();
  // if (!user) {
  //   redirect("/");
  // }

  return (
    <div className="flex w-full px-4 h-[95%]">
      <Card className="h-full w-full shadow-inner shadow-white/20">
        <CardHeader>
          <CardTitle className="text-xl font-bold flex justify-between -mt-2">
            Profile
            <UserButton />
          </CardTitle>
          <div className="flex justify-center">
            {user?.imageUrl && (
              
            <Image
              src={user.imageUrl}
              alt="User Avatar"
              width={60}
              height={60}
              className="rounded-full"
            />
            )}
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <InfoItem
              icon={<User className="w-5 h-5" />}
              label="Username"
              value={user?.username ?? "Anonymous"}
            />
            <InfoItem
              icon={<Mail className="w-5 h-5" />}
              label="Email"
              value={user?.emailAddresses[0].emailAddress ?? "Anonymous"}
            />
            <InfoItem
              icon={<Phone className="w-5 h-5" />}
              label="Phone"
              value={user?.phoneNumbers[0].phoneNumber ?? "Anonymous"}
            />
            {user && (
              
            <InfoItem
              icon={<Calendar className="w-5 h-5" />}
              label="Joined"
              value={new Date(user.createdAt).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            />
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
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
      <div className="flex-shrink-0">{icon}</div>
      <div>
        <p className="text-sm font-medium text-muted-foreground">{label}</p>
        <p className="text-base font-semibold">{value}</p>
      </div>
    </div>
  );
}
