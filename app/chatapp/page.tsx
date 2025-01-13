import EmbedPage from "@/components/EmbedGradio";
import Chats from "@/components/pages/Chats";
import { Contacts } from "@/components/pages/Contacts";
import { Profile } from "@/components/pages/Profile";
import { TabsContent } from "@/components/ui/tabs";
import { getUser } from "../(auth)/login/actions";
import { redirect } from "next/navigation";
import { getUserData } from "../actions/actions";
import AIzone from "@/components/pages/AIzone";

const page = async () => {
  const { user } = await getUser();
  if (!user) {
    redirect("/");
  }

  const userData = await getUserData(user.email!);
  if (!userData.phone_number) {
    redirect("/signup");
  }

  return (
    <div className="flex flex-col h-full">
      <div className="flex flex-col w-full h-full">
        <TabsContent value="AI" className="flex w-full">
          <AIzone/>
        </TabsContent>

        <TabsContent value="chats" className="flex w-full">
          <Chats />
        </TabsContent>

        <TabsContent value="contacts" className="h-full">
          <Contacts />
        </TabsContent>

        <TabsContent value="gradio" className="p-2 h-full">
          <EmbedPage />
        </TabsContent>

        <TabsContent value="profile" className="h-full">
          <Profile />
        </TabsContent>
      </div>
    </div>
  );
};

export default page;
