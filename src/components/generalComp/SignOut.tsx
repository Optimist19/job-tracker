"use client";

import { signOut } from "next-auth/react";


export default function SignOut() {

  
  async function logOutFtn() {
    await signOut({ 
      redirect: true,
      callbackUrl: "/login"
    });
 
  }

  return (
    <button className="cursor-pointer" onClick={logOutFtn}>
      Log out
    </button>
  );
}