import Nav from "@/components/generalComp/Nav";
import Sidebar from "@/components/generalComp/Sidebar";
import Main from "@/components/Home/Main";
import React from "react";

function HomePage() {
  return (
    <div>
      <Sidebar />
      <Nav />
      <div className="bg-gray-50">
        <div className="flex-1 flex flex-col overflow-hidden md:pl-[18vw]">
          <Main />
        </div>
      </div>
    </div>
  );
}

export default HomePage;
