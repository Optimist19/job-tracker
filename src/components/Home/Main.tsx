"use client";

import { Search, Plus } from "lucide-react";
import type React from "react";
import { useEffect, useState } from "react";
import { FaLocationDot } from "react-icons/fa6";
import { FaCalendarAlt } from "react-icons/fa";
import { GrNetworkDrive } from "react-icons/gr";
import { useForm } from "react-hook-form";
import Link from "next/link";
import { Bounce, toast } from "react-toastify";
import { motion } from "framer-motion";
import Circles from "./Circles";
import JobApplicationModal from "./Modal";



interface IFormInput {
  jobLocation: string;
  jobType: string;
}

interface Job {
  id: string;
  title: string;
  company: string;
  location: string;
  job_mode: string;
  job_status: string;
  date_applied: string;
  job_type: string;
}

function Main() {
  const { register } = useForm<IFormInput>();
  const [userJobs, setUserJobs] = useState<Job[]>([]);
  const [filteredJobs, setFilteredJobs] = useState<Job[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [hasSearched, setHasSearched] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterType, setFilterType] = useState("all");
  const [toggleModal, setToggleModal] = useState(false);
  //I am using the reload to make this components("/") reloads up on any additional job POST
  const [reload, setReload] = useState(false);

    
  

  useEffect(() => {
    async function getAllJobs() {
      setIsLoading(true)
      try {
        const data = await fetch("/api/jobs")
        const res = await data.json()
        setUserJobs(res?.jobs || [])
        setFilteredJobs(res?.jobs || [])
      } catch (error) {
        console.error("Error fetching jobs:", error)
        toast.error("Failed to fetch jobs")
      } finally {
        setIsLoading(false)
      }
    }
    getAllJobs()
  }, [reload])

  // console.log(filteredJobs)

  function searchLocation(e: React.ChangeEvent<HTMLInputElement>) {
    const query = e.target.value;
    setSearchQuery(query);
    setHasSearched(true);

    const value = query.toLowerCase();
    const filtered = userJobs.filter((job) =>
      job.location.toLowerCase().includes(value)
    );
    setFilteredJobs(filtered);
  }

  function searchTitle(e: React.ChangeEvent<HTMLInputElement>) {
    const query = e.target.value;
    setFilterType(query);
    setHasSearched(true);

    const value = query.toLowerCase();
    if (value === "all") {
      // If "all" is selected but there's a location search query, apply that filter
      if (searchQuery) {
        const filtered = userJobs.filter((job) =>
          job.location.toLowerCase().includes(searchQuery.toLowerCase())
        );
        setFilteredJobs(filtered);
      } else {
        setFilteredJobs(userJobs);
      }
    } else {
      // Apply both title and location filters if both exist
      let filtered = userJobs.filter((job) =>
        job.title.toLowerCase().includes(value)
      );

      // Apply location filter if it exists
      if (searchQuery) {
        filtered = filtered.filter((job) =>
          job.location.toLowerCase().includes(searchQuery.toLowerCase())
        );
      }

      setFilteredJobs(filtered);
    }
  }

  const handleDelete = async (jobId: string) => {
    if (window.confirm("Are you sure you want to delete this job?")) {
      try {
        const response = await fetch(`/api/job/${jobId}`, {
          method: "DELETE"
        });

        if (!response.ok) {
          throw new Error("Failed to delete job");
        }

        toast.success("Delete successful", {
          position: "bottom-right",
          autoClose: 5000,
          hideProgressBar: true,
          closeOnClick: false,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
          transition: Bounce
        });

        // Update local state to remove the deleted job
        setUserJobs((prevJobs) => prevJobs.filter((job) => job.id !== jobId));
        setFilteredJobs((prevJobs) =>
          prevJobs.filter((job) => job.id !== jobId)
        );
      } catch (error) {
        console.error("Error deleting job:", error);
        toast.error("Failed to delete job. Please try again.", {
          // ...toast config
        });
      }
    }
  };

  function modalFtn() {
    setToggleModal(!toggleModal);
  }
  // Function to render the appropriate content based on state
  const renderContent = () => {
    // If data is still loading
    if (isLoading) {
      return <LoadingState />;
    }

    // If no jobs exist in the database
    if (userJobs.length === 0) {
      return <Circles />;
    }

    // If user has searched but no results found
    if (hasSearched && filteredJobs.length === 0) {
      return (
        <NoResultsFound searchQuery={searchQuery} filterType={filterType} />
      );
    }

    // Otherwise, show the job list
    return (
      <div className="grid md:grid-cols-1 lg:grid-cols-3 gap-2 h-[70vh] overflow-y-scroll p-3">
        {filteredJobs.map((job) => (
          <JobCard key={job.id} job={job} onDelete={handleDelete} />
        ))}
      </div>
    );
  };

  return (
    <div className="">
      <div className="">
        
        <div className="px-6 py-4 flex items-center flex-col md:flex-row  md:items-center gap-2 md:justify-between">
          <div className="relative w-90">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-4 w-4 text-[#B0B0B0]" />
            </div>
            <input
              {...register("jobLocation")}
              type="text"
              placeholder="Search Location"
              className="block w-full pl-10 pr-3 py-2 border border-[#B0B0B0] rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-purple-500 focus:border-purple-500 sm:text-sm"
              onChange={searchLocation}
            />
          </div>

          <div className="flex items-center space-x-4">
            <div className="relative">
              <input
              type="text"
                className="inline-flex items-center px-2 py-2 rounded-md bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none  border border-[#B0B0B0]"
                placeholder="Title"
                {...register("jobType")}
                onChange={searchTitle} />
            </div>
            <button
              className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-[#A51CD6] hover:bg-[#A51CD6] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#A51CD6] cursor-pointer"
              onClick={modalFtn}>
              <Plus className="mr-2 h-4 w-4 text-center" />
              <span className="hidden lg:block"> Add New Job</span>
            </button>
          </div>
        </div>
      </div>

      <div>
{  toggleModal &&  <JobApplicationModal modalFtn={modalFtn} setReload={() => setReload(prev => !prev)}/>
}      </div>

      {/* Main content area */}
      <div className="flex-1 overflow-auto p-6">{renderContent()}</div>
    </div>
  );
}

// Component for displaying "No Results Found" state
function NoResultsFound({
  searchQuery,
  filterType
}: {
  searchQuery: string;
  filterType: string;
}) {
  return (
    <div className="flex flex-col items-center justify-center py-16">
      <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mb-6">
        <Search className="h-10 w-10 text-gray-400" />
      </div>
      <h3 className="text-xl font-semibold text-gray-800 mb-2">
        No results found
      </h3>
      <p className="text-gray-500 text-center max-w-md mb-6">
        {searchQuery && filterType !== "all"
          ? `We couldn't find any jobs matching "${searchQuery}" in the "${filterType}" category.`
          : searchQuery
          ? `We couldn't find any jobs matching "${searchQuery}".`
          : `We couldn't find any jobs in the "${filterType}" category.`}
      </p>
    </div>
  );
}

// Component for displaying loading state
function LoadingState() {
  return (
    <div className="flex flex-col items-center justify-center py-16">
      <div className="w-16 h-16 border-4 border-gray-200 border-t-purple-600 rounded-full animate-spin mb-6"></div>
      <p className="text-gray-500">Loading jobs...</p>
    </div>
  );
}

// Component for job card to reduce repetition
function JobCard({
  job,
  onDelete
}: {
  job: Job;
  onDelete: (id: string) => Promise<void>;
}) {
  return (
    <motion.div
      className="ring-1 ring-[#B0B0B0] py-[2vh] px-[4%] rounded-2xl"
      initial={{ y: 0 }}
      whileHover={{ y: -10 }}
      transition={{ type: "spring", stiffness: 200 }}>
      <div className="pb-[4vh]">
        <div className="flex items-center gap-2 py-[1vh]">
          <div
            style={{
              width: "50px",
              height: "50px",
              borderRadius: "50%"
            }}
            className="bg-[#D8D8D8] text-[#121212] flex justify-center items-center font-[500] text-[18px]">
            <p>{job.company.slice(0, 1)}</p>
          </div>
          <div className="flex-1 font-[400]">
            <p className=" text-[16px] text-[#121212]">{job.title}</p>
            <p className="text-[14px] text-[#888888]">{job.company}</p>
          </div>

          <div
            className={`font-[500] flex items-center gap-2 text-[12px] px-[10px] py-[5px] rounded-2xl cursor-pointer 
              ${
                job.job_status === "pending"
                  ? "text-[#FBBC05] bg-[#FBBC051A]"
                  : ""
              }
              ${
                job.job_status === "interview"
                  ? "text-[#008000] bg-[#e6f7e6]"
                  : ""
              }
              ${
                job.job_status === "declined"
                  ? "text-[#FF0000] bg-[#ffe6e6]"
                  : ""
              }
            `}>
            <GrNetworkDrive />
            <p className="capitalize">{job.job_status}</p>
          </div>
        </div>
      </div>
      <div className="flex items-center justify-between py-[1vh]">
        <div className="flex items-center gap-2  text-[#888888] text-[16px] font-[400]">
          <FaCalendarAlt />
          <p>{job?.date_applied
          }</p>
        </div>
        <div className="flex items-center gap-2  text-[#888888] text-[16px] font-[400]">
          <FaLocationDot />
          <p>{job.location.length < 10
                      ? job.location
                      : job.location.slice(0, 30) + "..."}</p>
        </div>
      </div>
      <div className="flex items-center justify-between py-[1vh] text-[#888888] text-[16px] font-[400]">
        <div className="flex items-center gap-2">
          <FaCalendarAlt />
          <p className="capitalize">{job.job_mode}</p>
        </div>
        <div className="flex items-center gap-2">
          <FaCalendarAlt />
          <p className="capitalize">{job?.job_type}</p>
        </div>
      </div>
      <div className=" flex justify-end items-center gap-2 py-[1vh]">
        <button
          className="text-[#FF3B30] text-[16px] font-[600] py-[5px] w-[86px] rounded-xl cursor-pointer border border-[#FF3B30]"
          onClick={() => onDelete(job.id)}>
          Delete
        </button>

        <Link href={`/jobs/${job.id}`}>
          <button className="bg-[#A51CD6] text-[16px] font-[500] text-white py-[5px] w-[86px] rounded-xl cursor-pointer">
            Edit
          </button>
        </Link>
      </div>
    </motion.div>
  );
}

export default Main;
