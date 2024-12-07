import EmbedPage from "@/components/EmbedGradio";
import Chats from "@/components/pages/Chats";
import { Contacts } from "@/components/pages/Contacts";
import { Profile } from "@/components/pages/Profile";
import { TabsContent } from "@/components/ui/tabs";

const page = () => {
  return (
    <div className="flex flex-col h-full">
      <div className="flex flex-col w-full h-full">
        <TabsContent value="chats" className="flex w-full">
          <Chats />
        </TabsContent>

        <TabsContent value="contacts" className="h-full">
          <Contacts />
        </TabsContent>

        <TabsContent value="AI" className="p-2 h-full">
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
