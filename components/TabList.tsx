import {
  BrainIcon,
  MessageCircleMoreIcon,
  NotebookTabsIcon,
  UserRoundIcon,
} from "lucide-react";
import { TabsTrigger, TabsList } from "./ui/tabs";
import { AdsSection } from "./AdsSection";

const TabListNav = () => {
  return (
    <div className="w-full">
      <div className=""><AdsSection/></div>
      <TabsList className="flex justify-evenly h-full pb-3">
        <TabsTrigger value="chats">
          <div className="flex flex-col items-center">
            <MessageCircleMoreIcon />
            <p>Chats</p>
          </div>
        </TabsTrigger>
        <TabsTrigger value="contacts">
          <div className="flex flex-col items-center">
            <NotebookTabsIcon />
            <p>Contacts</p>
          </div>
        </TabsTrigger>
        <TabsTrigger value="AI">
          <div className="flex flex-col items-center">
            <BrainIcon />
            <p>AI</p>
          </div>
        </TabsTrigger>
        <TabsTrigger value="profile">
          <div className="flex flex-col items-center">
            <UserRoundIcon />
            <p>Profile</p>
          </div>
        </TabsTrigger>
      </TabsList>
    </div>
  );
};

export default TabListNav;
