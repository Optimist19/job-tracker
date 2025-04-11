"use client";

import { signIn } from "next-auth/react";

export default function SignInComp() {
  return <button className="cursor-pointer" onClick={() => signIn("google")}>Log In</button>;
}
