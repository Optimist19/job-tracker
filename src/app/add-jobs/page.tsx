import React from "react";
import AddJobComp from "@/components/AddJobComp";
// import { auth } from "../../../auth";
// import { redirect } from "next/navigation";

async function page() {
  
    // const session = await auth();
    // if (!session?.user) return redirect("/");
  return (
    <div>
      <AddJobComp />
    </div>
  );
}

export default page;
