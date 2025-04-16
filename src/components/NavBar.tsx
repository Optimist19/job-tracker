// import { auth } from "../../auth";

// import React from "react";
// import Image from "next/image";
// import { FaBriefcase } from "react-icons/fa";
// import SignInComp from "./login/SignInComp";
// import SignOutComp from "./SignOutComp";
// import MobileNav from "./MobileNav";

// async function NavBar() {
//   const userSession = await auth();

//   return (
//     <nav>
//       <header className="relative flex items-center bg-gray-400 text-white justify-between px-[3vw]">
//         <div className="md:flex md:items-center md:gap-3  pl-[16vw] hidden md:block">
//           <FaBriefcase className="w-[30px] h-[30px]" />
//           <h1>Job Tracker</h1>
//         </div>

//         <div className="flex  items-center gap-2 cursor-pointer">
//           {!userSession?.user?.name ? <SignInComp /> : <SignOutComp />}
//           <div className="p-1">
//             <Image
//               src={userSession?.user?.image || "/download.png"}
//               width={50}
//               height={50}
//               alt="user-image"
//               className=""
//               style={{ height: "50px", width: "50px", borderRadius: "50%" }}
//             />
//           </div>
//         </div>
//       </header>

//       <MobileNav />
//     </nav>
//   );
// }

// export default NavBar;
