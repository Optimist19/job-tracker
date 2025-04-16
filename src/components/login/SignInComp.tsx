"use client"
import { Bounce, toast } from "react-toastify";

import { signIn } from "next-auth/react"
export default function SignIn() {

  function loginFtn() {
    signIn("google", { callbackUrl: "/" });
    toast("Logged in successfully!", {
      position: "bottom-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: false,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
      transition: Bounce
    });
  }
  return (
    
      <button type="submit" onClick={loginFtn} className="text-[14px] font-[400] cursor-pointer">
        Login with Google
      </button>
  );
}



 

