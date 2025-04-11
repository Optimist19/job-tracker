import { redirect } from "next/navigation";

export default async function Home() {

  redirect("/all-jobs");
  return (
    <div className="md:pl-[15vw] ">
    <h1>Redirect...</h1>
    </div>
  );
}
