//

import Header from "@/components/Home/Header";
import Main from "@/components/Home/Main";
import React from "react";

function HomePage() {
  return (
    <div className="flex h-screen bg-gray-50">
      <div className="flex-1 flex flex-col overflow-hidden md:pl-[18vw]">
      <Header /> 
      <Main />
      </div>
    </div>
  );
}

export default HomePage;
