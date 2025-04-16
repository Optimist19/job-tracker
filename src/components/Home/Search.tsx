// "use client"

// import React, { useEffect, useState } from "react";
// import { LuBriefcase } from "react-icons/lu";
// import { FaLocationDot } from "react-icons/fa6";
// import { FaCalendarAlt } from "react-icons/fa";
// import { GrNetworkDrive } from "react-icons/gr";
// import { SubmitHandler, useForm } from "react-hook-form";
// import Link from "next/link";
// import { Bounce, toast } from "react-toastify";
// import { motion } from "framer-motion";
// import {Search} from "lucide-react"


// interface IFormInput {
//   jobLocation: string;
//   jobType: string;
// }

// interface Job {
//   id: string;
//   title: string;
//   company: string;
//   location: string;
//   job_mode: string;
//   job_status: string;
// }

// function SearchComp() {
//   const { register, handleSubmit } = useForm<IFormInput>();
//   const [userJobs, setUserJobs] = useState<Job[]>([]);
//   const [filteredJobs, setFilteredJobs] = useState<Job[]>([]);
//   const [isFiltered, setIsFiltered] = useState(false);

//   const onSubmit: SubmitHandler<IFormInput> = (data) => {
//     const { jobLocation, jobType } = data;

//     const filtered = userJobs.filter((job) => {
//       const matchesLocation = jobLocation
//         ? job.location.toLowerCase().includes(jobLocation.toLowerCase())
//         : true;

//       const matchesType =
//         jobType && jobType !== "all"
//           ? job.title.toLowerCase().includes(jobType.toLowerCase())
//           : true;

//       return matchesLocation && matchesType;
//     });

//     setFilteredJobs(filtered);
//     setIsFiltered(true);
//   };

//   const resetFilters = () => {
//     setFilteredJobs(userJobs);
//     setIsFiltered(false);
//   };

//   return (
//     <div>
//       <form action="">
// 			<div className="relative w-96">
//           <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//             <Search className="h-4 w-4 text-gray-400" />
//           </div>
//           <input
//             {...register("jobLocation")}
//             type="text"
//             placeholder="Search jobs"
//             className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-purple-500 focus:border-purple-500 sm:text-sm"
//           />
//         </div>
//       </form>
//     </div>
//   );
// }

// export default SearchComp;
