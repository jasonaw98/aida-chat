import ContactsSection from "../ContactsSection";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";

export const Contacts = () => {
  return (
    <div className="flex w-full px-4 h-[95%]">
      <Card className="h-full w-full shadow-inner shadow-white/20">
        <CardHeader>
          <CardTitle className="text-2xl text-transparent font-bold bg-clip-text bg-gradient-to-b from-zinc-100 to-zinc-400 -mt-2">
            Contacts
          </CardTitle>
          <div className="flex justify-center"></div>
        </CardHeader>
        <CardContent>
          <ContactsSection/>
        </CardContent>
      </Card>
    </div>
  );
};
