"use client";

import React from "react";
import { MdOutlineAddCircle } from "react-icons/md";
import { HiOutlineWallet } from "react-icons/hi2";
import { ImStatsBars } from "react-icons/im";
import { usePathname } from "next/navigation";
import Link from "next/link";


function SideBar() {
  const pathname = usePathname(); // Get current route

  const paths = [
    {
      path: "/add-jobs",
      name: "Add Job",
      icon: <MdOutlineAddCircle />
    },
    {
      path: "/all-jobs",
      name: "All Job",
      icon: <HiOutlineWallet />
    },
    {
      path: "/stats",
      name: "Stats",
      icon: <ImStatsBars />
    }
  ];

  return (
    <div>
      <div className="h-[100vh] bg-gray-400 w-[16%] fixed top-0 bottom-0 z-[10] pt-[14vh] flex flex-col items-center hidden md:block px-[7px]">
        <div className="grid gap-3">
          {paths.map((path, i) => {
            const isActive = pathname === path.path; // Check if it's the active route

            return (
              <Link
                href={path.path}
                key={i}
                className={`flex items-center gap-2 font-semibold py-2 px-[3vw] rounded-xl cursor-pointer ${
  isActive ? "bg-purple-700 text-white" : "text-purple-700"
                }`}>
                <span className="hidden lg:block">{path.icon}</span>
                <button className="cursor-pointer">{path.name}</button>
              </Link>
            );
          })}
         

        </div>
      </div>




     
    </div>
  );
}

export default SideBar;
