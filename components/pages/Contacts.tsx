import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";

export const Contacts = () => {
  return (
    <div className="flex w-full px-4 h-[95%]">
      <Card className="h-full w-full shadow-inner shadow-white/20">
        <CardHeader>
          <CardTitle className="text-xl font-bold flex justify-between -mt-2">
            Contacts
          </CardTitle>
          <div className="flex justify-center"></div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">hi</div>
        </CardContent>
      </Card>
    </div>
  );
};
