import EmbedPage from "@/components/EmbedGradio";
import Chats from "@/components/pages/Chats";
import { TabsContent } from "@/components/ui/tabs";
import React from "react";

const page = () => {
  return (
    <div className="flex flex-col">
      <div className="flex flex-col w-full">
        <TabsContent value="chats" className="flex w-full">
          <Chats/>
        </TabsContent>

        <TabsContent value="contacts" className="">
          Messages
        </TabsContent>
        <TabsContent value="AI" className="">
          <EmbedPage />
        </TabsContent>
        <TabsContent value="profile" className="">
          Messages
        </TabsContent>
      </div>
    </div>
  );
};

export default page;
