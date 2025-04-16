"use client";

import Link from "next/link";
import { Home, BarChart2, Menu, X, LogOut } from "lucide-react";
import { useState } from "react";

import SignOut from "./SignOut";

export default function MobileNav() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleNav = () => setIsOpen(!isOpen);

  return (
    <>
      {/* Mobile Menu Button */}
      <button
        onClick={toggleNav}
        className="fixed bottom-4 right-4 z-50 bg-purple-700 p-3 rounded-full shadow-lg md:hidden">
        {isOpen ? (
          <X className="h-6 w-6 text-white" />
        ) : (
          <Menu className="h-6 w-6 text-white" />
        )}
      </button>

      {/* Mobile Navigation Menu */}
      <nav
        className={`
        fixed bottom-20 right-4 z-40 
        bg-white rounded-lg shadow-lg 
        transform transition-transform duration-200 ease-in-out
        md:hidden
        ${isOpen ? "translate-x-0" : "translate-x-full"}
      `}>
        <ul className="p-4 space-y-4">
          <li>
            <Link
              href="/"
              className="flex items-center space-x-2 text-gray-700 hover:text-purple-700"
              onClick={toggleNav}>
              <Home className="h-5 w-5" />
              <span>Home</span>
            </Link>
          </li>
          <li>
            <Link
              href="/analytics"
              className="flex items-center space-x-2 text-gray-700 hover:text-purple-700"
              onClick={toggleNav}>
              <BarChart2 className="h-5 w-5" />
              <span>Analytics</span>
            </Link>
          </li>
          <li
            className="flex items-center space-x-2 text-gray-700 hover:text-purple-700"
            onClick={toggleNav}>
            <LogOut className="h-5 w-5" />
            <SignOut />
          </li>
        </ul>
      </nav>
    </>
  );
}
