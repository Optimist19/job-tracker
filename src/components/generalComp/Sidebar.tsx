"use client"
import React, { useState } from 'react'
import Link from 'next/link';
import Image from 'next/image';

function Sidebar() {
	const [activeTab, setActiveTab] = useState("home")

    // const paths = [
    //   {
    //     path: "/",
    //     name: "Home",
    //     icon: "/home.svg"
    //   },

    //   {
    //     path: "/analytics",
    //     name: "Analytics",
    //     icon: "/analytics.svg"
    //   }
    // ];

  return (
	// <div className="w-56 bg-white border-r border-gray-200 flex flex-col">
	<div className="h-[100vh] w-[16%] fixed top-0 bottom-0 z-[10]  flex flex-col items-center hidden md:block px-[7px]">
        <div className="px-4 pt-[5vh]">
          <Image src="/logo.svg" alt="logo" width={20} height={20} style={{width: "100%", height: "auto"}}/>
          <h2 className="text-[#E238C4] text-[17px] font-bold flex items-center">
            <span className="ml-2">JobTracker</span>
          </h2>
        </div>
        <div className="flex-1 pb-4 pt-[7vh]">
          <nav className="space-y-1 px-2">
            {
              paths.map((path, i) => {
                const isActive = activeTab === path.name.toLowerCase(); // Check if it's the active route

                return (
                  <Link href={path.path} key={i}>
                  <button
                    onClick={() => setActiveTab(path.name.toLowerCase())}
                    className={`flex items-center px-4 py-2 text-sm font-medium rounded-md cursor-pointer w-full text-left  ${
                      isActive ? "bg-purple-100 text-purple-700" : "text-gray-600 hover:bg-gray-100"
                    }`}
                  >
< Image src={path.icon} alt='page icon' width={5} height={5} style={{width: "20%", height: "20px"}}/>
                    <span className="px-1">{path.name}</span>
                  </button>
                  </Link>

                );
              })
            }
            
          </nav>
        </div>
      </div>
  )
}

export default Sidebar