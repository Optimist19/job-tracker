// import { Bell } from "lucide-react";
import Image from "next/image";
import { auth } from "../../../auth";

async function Header() {
  const userSession = await auth();

  return (
    <header className=" border-b border-gray-200">
      <div className="px-6 py-4">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-[22px] font-[500]  text-[#121212]">Job Tracker</h1>
            <p className="text-[16px] text-[#888888] font-[500]  hidden md:block">
              Track and manage your job applications in one place
            </p>
          </div>
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <div className="grid">
              <p className="text-[14px] font-[400] text-[#121212] cursor-pointer">
                {userSession?.user?.name || "User"}
              </p>
              <p className="text-[8px] font-[400] text-[#888888]">                {userSession?.user?.email}
              </p>

              </div>
              <Image
                src={userSession?.user?.image || "/download.png"}
                width={50}
                height={50}
                alt="user-image"
                className="cursor-pointer"
                style={{ height: "50px", width: "50px", borderRadius: "50%" }}
              />
            </div>
            {/* <button className="text-gray-500 hover:text-gray-700">
              <Bell className="h-5 w-5" />
            </button> */}
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;
