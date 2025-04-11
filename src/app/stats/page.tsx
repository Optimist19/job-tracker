import React from 'react'
import StatsComp from '@/components/StatsComp'
import { auth } from "../../../auth";
import { redirect } from "next/navigation";

async function Stats() {
  const session = await auth();
   if (!session?.user) return redirect("/");
  return (
    <div>
      <StatsComp />
    </div>
  )
}

export default Stats