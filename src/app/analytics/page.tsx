import React from 'react'
import StatsComp from '@/components/StatsComp'
import { auth } from "../../../auth";
import { redirect } from "next/navigation";
import Sidebar from '@/components/generalComp/Sidebar';
import Nav from '@/components/generalComp/Nav';

async function Stats() {
  const session = await auth();
   if (!session?.user) return redirect("/");
  return (
    <div>
      <Nav />
      <Sidebar />
      <StatsComp />
    </div>
  )
}

export default Stats