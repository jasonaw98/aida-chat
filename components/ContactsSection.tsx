"use client";
import { createChatRoom, getUserDetailsWithoutEmail, searchContacts } from "@/app/actions/actions";
import { useDebouncedCallback } from "use-debounce";
import { Input } from "./ui/input";
import { useState } from "react";
import { Card } from "./ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import LoadingCircle from "@/components/LoadingCircle";


interface ContactsType {
  userid: string;
  user_email: string;
  username: string;
  phone_number: string;
  fullname: string;
}

const Search = ({
  searchQuery,
  setSearchQuery,
  handleSearch,
  setloading,
}: {
  searchQuery: string;
  setloading: (loading: boolean) => void;
  setSearchQuery: (query: string) => void;
  handleSearch: (query: string) => void;
}) => {
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setloading(true);
    const value = e.target.value;
    setSearchQuery(value);
    handleSearch(value);
  };

  return (
    <div className="flex flex-1 flex-shrink w-full">
      <label htmlFor="search" className="sr-only">
        Search
      </label>
      <Input
        className=""
        placeholder="Search"
        value={searchQuery}
        onChange={handleInputChange}
      />
    </div>
  );
};

export default function ContactsSection() {
  const [Contactlist, setContactlist] = useState<ContactsType[] | undefined>(
    []
  );
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setloading] = useState(false);

  const handleSearch = useDebouncedCallback((query: string) => {
    const search = async () => {
      const text = await searchContacts(query);
      setContactlist(text);
      setloading(false);
    };
    if (query !== "") {
      search();
    }
  }, 500);

  const handleCreateChatRoom = async (contactUuid: string, contactName: string) => {
    try {
      const  user = await getUserDetailsWithoutEmail();
      const loggedInUserUuid = user?.uuid;
      const loggedInUserName = user?.username;
      // console.log("loggedInUserUuid", loggedInUserUuid, loggedInUserName, contactUuid, contactName);

      //   if (loggedInUserUuid && loggedInUserName && contactUuid && contactName) {
      //     const chatRoomUuid = await createChatRoom(loggedInUserUuid, loggedInUserName!, contactUuid, contactName);
      //     console.log("Chat room created with UUID:", chatRoomUuid);
      //     // Redirect to the chat room or update the UI as needed
      //   }
    } catch (error) {
      console.error("Error creating chat room:", error);
    }
  };

  return (
    <div className="flex flex-col items-center w-full">
      <Search
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        handleSearch={handleSearch}
        setloading={setloading}
      />

      {loading && searchQuery !== "" && <LoadingCircle className="pt-3" />}

      <div className="space-y-3 pt-3 w-full max-h-[calc(100%-3rem)] overflow-y-scroll">
        {Contactlist &&
          searchQuery !== "" &&
          Contactlist.map((contact, index) => {
            return (
              <Card key={index} className="p-2" onClick={() => handleCreateChatRoom(contact.userid, contact.username)}>
                <div
                  key={contact.user_email}
                  className="flex items-center justify-around"
                >
                  <Avatar className="size-8">
                    <AvatarImage
                      src={`https://api.dicebear.com/6.x/initials/svg?seed=${contact.username}`}
                      className="size-8 rounded-full"
                    />
                    <AvatarFallback>
                      {contact.username.charAt(0)}
                    </AvatarFallback>
                  </Avatar>
                  <p>{contact.username}</p>
                  <p>{contact.fullname}</p>
                </div>
              </Card>
            );
          })}
      </div>
    </div>
  );
}
