import React from "react";
import AllJobsComp from "@/components/AllJobsComp";
import { auth } from "../../../auth";
import { redirect } from "next/navigation";

async function AllJobs() {
  const session = await auth();
  if (!session?.user) return redirect("/");

  // const data = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/jobs`)
  // const res = await data.json()
  // console.log(res, "res")
  return (
    <div>
      <AllJobsComp />
    </div>
  );
}

export default AllJobs;
