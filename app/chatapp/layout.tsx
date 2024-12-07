import { ReactNode } from "react";
import TabListNav from "@/components/TabList";
import { Tabs } from "@/components/ui/tabs";

interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <main className="bg-background flex flex-col h-full">
      <Tabs defaultValue="chats" className="flex flex-col h-full justify-between">
        {children}
        <TabListNav />
      </Tabs>
    </main>
  );
};

export default Layout;
