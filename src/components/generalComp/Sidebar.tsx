"use client"

import Image from "next/image"
import Link from "next/link"
import { useState, useEffect } from "react"
import { usePathname } from "next/navigation"
import MobileNav from "./MobileNav"
import { LogOut } from "lucide-react"
import SignOut from "./SignOut"

export default function Sidebar() {
  const pathname = usePathname()
  const [activeTab, setActiveTab] = useState("")

  // Update active tab based on current path
  useEffect(() => {
    if (pathname === "/") {
      setActiveTab("home")
    } else if (pathname === "/analytics") {
      setActiveTab("analytics")
    } else if (pathname === "/signup") {
      setActiveTab("signup")
    }
  }, [pathname])

  const paths = [
    {
      path: "/",
      name: "Home",
      icon: "/home.svg",
    },
    {
      path: "/analytics",
      name: "Analytics",
      icon: "/analytics.svg",
    },
  ]

  return (
    <nav className="h-[100vh] bg-white w-[16%] fixed top-0 bottom-0 z-[10] flex flex-col items-center hidden md:block px-[7px]">
      {/* Top section with logo */}
      <div className="px-4 pt-[5vh] flex items-center">
        <Image src="/logo.svg" alt="logo" width={5} height={5} style={{ width: "50px", height: "50px" }} />

        <h1 className="text-[17px] font-bold bg-gradient-to-r from-[#E238C4] to-[#A51CD6] bg-clip-text text-transparent">
          JobTracker
        </h1>
      </div>

      {/* Main navigation links */}
      <div className="w-full pt-[7vh]">
        <div className="space-y-1 px-2">
          {paths.map((path, i) => {
            const isActive = activeTab === path.name.toLowerCase()

            return (
              <Link href={path.path} key={i}>
                <button
                  onClick={() => setActiveTab(path.name.toLowerCase())}
                  className={`flex items-center px-4 py-2 text-[18px] font-[500] rounded-md cursor-pointer w-full text-left ${
                    isActive ? "bg-[#F5DAFF] text-[#A51CD6]" : "text-[#888888] hover:bg-gray-100"
                  }`}
                >
                  <Image
                    src={path.icon || "/placeholder.svg"}
                    alt="page icon"
                    width={5}
                    height={5}
                    style={{ width: "20%", height: "20px" }}
                    className="md:hidden lg:block"
                  />
                  <span className="px-1">{path.name}</span>
                </button>
              </Link>
            )
          })}
          <MobileNav />
        </div>
      </div>

      {/* Signup button positioned at the absolute bottom */}
      <div className="absolute bottom-8 w-full px-2">
        
          <div
            className={`flex items-center px-4 py-2 text-[12px] font-[500] rounded-md cursor-pointer w-full text-left ${
              activeTab === "signup" ? "bg-[#F5DAFF] text-[#A51CD6]" : "text-[#888888] hover:bg-gray-100"
            }`}
          >
            <LogOut className="w-[1.3vw]"
            />
            <SignOut />
          </div>

      </div>
    </nav>
  )
}
