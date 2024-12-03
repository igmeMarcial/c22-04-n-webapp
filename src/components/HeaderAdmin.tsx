"use client";
import { Search, Bell } from "lucide-react";
import { Input } from "./ui/input";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { Button } from "./ui/button";
import { useSession } from "next-auth/react";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";

const HeaderDashboard = () => {
  const session = useSession();

  return (
    <>
      <nav className="w-full bg-gray-300 px-4 py-3 fixed top-0 z-50">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          {/* Logo Section */}
          <div className="flex items-center space-x-2">
            <div className="flex items-center">
              <div className="w-12 h-12 bg-[#4A55A2] rounded-full flex items-center justify-center">
                <svg
                  viewBox="0 0 24 24"
                  fill="white"
                  className="w-8 h-8"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M12,2C7.04,2,3,6.04,3,11c0,3.86,2.45,7.13,5.88,8.31V22h6.25v-2.69C18.55,18.13,21,14.86,21,11C21,6.04,16.96,2,12,2z M12,4c1.93,0,3.5,1.57,3.5,3.5S13.93,11,12,11s-3.5-1.57-3.5-3.5S10.07,4,12,4z M12,18.5c-2.76,0-5-2.24-5-5s2.24-5,5-5s5,2.24,5,5S14.76,18.5,12,18.5z" />
                </svg>
              </div>
              <div className="ml-2">
                <h1 className="text-2xl font-bold text-[#4A55A2]">PetCare</h1>
                <p className="text-xs text-gray-600">
                  Conecta, cuida, comparte
                </p>
              </div>
            </div>
          </div>

          {/* Actions Section */}
          <div className="flex items-center space-x-6">
            <Dialog>
              <DialogTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="hover:bg-transparent"
                >
                  <Search className="w-6 h-6 text-gray-600" />
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                  <DialogTitle>Buscar</DialogTitle>
                </DialogHeader>
                <div className="relative">
                  <Input
                    type="text"
                    placeholder="¿Qué estás buscando?"
                    className="w-full pl-10"
                  />
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                </div>
              </DialogContent>
            </Dialog>

            <button className="p-2 hover:bg-gray-200 rounded-full relative">
              <Bell className="w-6 h-6 text-gray-600" />
              <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full"></span>
            </button>

            <div className="w-10 h-10 rounded-full overflow-hidden">
              <Avatar>
                <AvatarImage
                  src={session.data?.user.image ?? ""}
                  alt="Profile"
                />
                <AvatarFallback>U</AvatarFallback>
              </Avatar>
            </div>
          </div>
        </div>
      </nav>
      <div className="h-[72px]"></div>
    </>
  );
};

export default HeaderDashboard;
