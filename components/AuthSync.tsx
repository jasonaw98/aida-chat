import { createUser, getUserData } from "@/app/actions/actions";
import { createClient } from "@/utils/supabase/cloudserver";
import { redirect } from "next/navigation";

export default async function AuthSync() {
  const supabase = await createClient();
  const { data } = await supabase.auth.getUser();

  if (data.user) {
    try {
      const primaryEmail = data.user.email;

      if (primaryEmail) {
        const { user: dbUser, error } = await createUser(primaryEmail);

        if (error) {
          console.error("Error syncing user to database:", error);
        } else {
          const userData = await getUserData(primaryEmail);
          if (!userData.phone_number) {
            return redirect("/signup");
          }
        }
      }
    } catch (error) {
      console.error("Error in user sync:", error);
    }
  }

  return null;
}
