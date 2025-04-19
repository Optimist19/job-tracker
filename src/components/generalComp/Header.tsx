// import { Bell } from "lucide-react";
import Image from "next/image";
import { auth } from "../../../auth";
import MobileNav from "./MobileNav";

async function Header() {
  const userSession = await auth();

  return (
    <header>
      <div
        className=" border-b border-gray-200 
     flex-1 flex flex-col overflow-hidden py-[1vh] md:pl-[18vw]">
        <div className="px-6">
          <div className="flex justify-between items-center">
            <div>
              <h1 className=" text-[17px] md:text-[22px] font-[500]  text-[#121212] ">
                Job Tracker
              </h1>
              <MobileNav />
              <p className="text-[16px] text-[#888888] font-[500]  hidden md:block">
                Track and manage your job applications in one place
              </p>
            </div>
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
              {userSession?.user?.image && (
                  <Image
                    src={userSession?.user?.image || "/download.png"}
                    width={50}
                    height={50}
                    alt="user-image"
                    className="cursor-pointer"
                    style={{
                      height: "50px",
                      width: "50px",
                      borderRadius: "50%"
                    }}
                  />
                )}
                <div className="grid">
                  <p className="text-[14px] font-[400] text-[#121212] cursor-pointer">
                    {userSession?.user?.name
                      ? userSession.user.name
                          .split(" ")
                          .map((part) => part.charAt(0).toUpperCase())
                          .join("")
                      : ""}
                  </p>
                  <p className="text-[8px] font-[400] text-[#888888]">
                    {" "}
                    {userSession?.user?.email}
                  </p>
                </div>
                
              </div>
              {/* <button className="text-gray-500 hover:text-gray-700">
              <Bell className="h-5 w-5" />
            </button> */}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;
