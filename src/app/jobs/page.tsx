import React from "react";
import AllJobsComp from "@/components/AllJobsComp";
import { auth } from "../../../auth";
import { redirect } from "next/navigation";

async function AllJobs() {
  const session = await auth();
  if (!session?.user) {
    return redirect("/login");
  } else {
    return redirect("not-found");
  }

  return <div>{/* <AllJobsComp /> */}</div>;
}

export default AllJobs;
