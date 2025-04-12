"use client";
import Link from "next/link";
import React, { useState } from "react";
import { RxHamburgerMenu } from "react-icons/rx";

import { MdOutlineAddCircle } from "react-icons/md";
import { HiOutlineWallet } from "react-icons/hi2";
import { ImStatsBars } from "react-icons/im";



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


function MobileNav() {
	const [showNavBar, setShowNavBar] = useState(false);

	function showNavBarFtn(){
		setShowNavBar(!showNavBar)
	}

  return (
	<div>
<RxHamburgerMenu className="font-bold text-[26px] md:hidden absolute top-3 right-7" onClick={showNavBarFtn}/>
   {showNavBar && <div className="grid gap-3 ring-1 ring-gray-300 w-[30vw] fixed z-10 top-[4vh] right-7 bg-gray-300 md:hidden">
      {paths.map((path, i) => {
        return (
          <Link
            href={path.path}
            key={i}
            className={`flex justify-center items-center gap-2 font-semibold py-2 px-[3vw] rounded-xl cursor-pointer
		  }`}  onClick={showNavBarFtn}>
            <span className="cursor-pointer">{path.icon}</span>
            {/* <button className="cursor-pointer">{path.name}</button> */}
          </Link>
        );
	})}
    </div>}
	</div>
  );
}

export default MobileNav;
