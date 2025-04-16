import React from "react";
import { auth } from "../../../../auth";
import { redirect } from "next/navigation";
import EditJobForm from "@/components/Edit/EditJobForm";

async function EditPage({ params }: { params: Promise<{ id: string }> }) {
  const userSession = await auth();
  if (!userSession?.user) {
    redirect("/login");
  }
  const { id } = await params;

  //The id is job id and not the user user id
  return (
    <div>
      <EditJobForm id={id} />
    </div>
  );
}

export default EditPage;
