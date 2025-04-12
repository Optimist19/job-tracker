"use client";

import React, { useEffect, useState } from "react";
import { LuBriefcase } from "react-icons/lu";
import { FaLocationDot } from "react-icons/fa6";
import { FaCalendarAlt } from "react-icons/fa";
import { GrNetworkDrive } from "react-icons/gr";
import { SubmitHandler, useForm } from "react-hook-form";
import Link from "next/link";
import { Bounce, toast } from "react-toastify";
import { motion } from "framer-motion";

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
}

function AllJobsComp() {
  const { register, handleSubmit } = useForm<IFormInput>();
  const [userJobs, setUserJobs] = useState<Job[]>([]);
  const [filteredJobs, setFilteredJobs] = useState<Job[]>([]);
  const [isFiltered, setIsFiltered] = useState(false);



  useEffect(() => {
    async function getAllJobs() {
      try {
        const data = await fetch("/api/jobs");
        const res = await data.json();
        setUserJobs(res?.jobs || []);
        setFilteredJobs(res?.jobs || []);
      } catch (error) {
        console.error("Error fetching jobs:", error);
        toast.error("Failed to fetch jobs");
      } 
    }
    getAllJobs();
  }, []);

  const onSubmit: SubmitHandler<IFormInput> = (data) => {
    const { jobLocation, jobType } = data;
    
    const filtered = userJobs.filter(job => {
      const matchesLocation = jobLocation 
        ? job.location.toLowerCase().includes(jobLocation.toLowerCase())
        : true;
      
      const matchesType = jobType && jobType !== "all"
        ? job.title.toLowerCase().includes(jobType.toLowerCase())
        : true;
      
      return matchesLocation && matchesType;
    });

    setFilteredJobs(filtered);
    setIsFiltered(true);
  };

  const resetFilters = () => {
    setFilteredJobs(userJobs);
    setIsFiltered(false);
  };


  // const handleDelete = async (jobId: string) => {
  //   if (window.confirm("Are you sure you want to delete this job?")) {
  //     try {
  //       const response = await fetch(`/api/job/${jobId}`, {
  //         method: 'DELETE',
          
  //         body: JSON.stringify({ id: jobId })
  //       });

  //       const data = await response.json();
  //       console.log(data, "data")

  //       if (!response.ok) {
  //         throw new Error('Failed to delete job');
  //       }
        

  //       toast.success("Delete successful", {
  //         position: "bottom-right",
  //         autoClose: 5000,
  //         hideProgressBar: true,
  //         closeOnClick: false,
  //         pauseOnHover: true,
  //         draggable: true,
  //         progress: undefined,
  //         theme: "dark",
  //         transition: Bounce
  //       });

  //       // Update local state to remove the deleted job
  //       setUserJobs(prevJobs => prevJobs.filter(job => job.id !== jobId));
  //       setFilteredJobs(prevJobs => prevJobs.filter(job => job.id !== jobId));

  //     } catch (error) {
  //       console.error('Error deleting job:', error);
  //       alert('Failed to delete job. Please try again.');
  //     }
  //   }
  // };



  const handleDelete = async (jobId: string) => {
    if (window.confirm("Are you sure you want to delete this job?")) {
      try {
        const response = await fetch(`/api/job/${jobId}`, {
          method: 'DELETE'
        });
  
        if (!response.ok) {
          throw new Error('Failed to delete job');
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
        setUserJobs(prevJobs => prevJobs.filter(job => job.id !== jobId));
        setFilteredJobs(prevJobs => prevJobs.filter(job => job.id !== jobId));
  
      } catch (error) {
        console.error('Error deleting job:', error);
        toast.error("Failed to delete job. Please try again.", {
          // ...toast config
        });
      }
    }
  };


  return (
    <div className="px-[3vw] md:pl-[18vw] pt-[2vh] pr-[3%]">
      <div className="bg-gray-400 py-5 flex justify-center">
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col sm:flex-row gap-2 w-[100%] sm:items-center sm:justify-center px-4">
          <input
            {...register("jobLocation")}
            className="bg-white  outline-purple-700 rounded-xs px-1"
            placeholder="Job Location"
          />

          <select
            className="bg-white outline-purple-700 rounded-xs cursor-pointer"
            {...register("jobType")}
          >
            <option value="all">All</option>
            <option value="frontend">Frontend</option>
            <option value="backend">Backend</option>
            <option value="ui_ux">UI/UX</option>
            <option value="fullstack">Fullstack</option>
            <option value="product_management">Product Management</option>
          </select>

          <button type="submit" className="px-[25px] bg-purple-700 rounded-xs text-white">
            Search
          </button>
          
          {isFiltered && (
            <button 
              type="button" 
              onClick={resetFilters}
              className="px-[25px] bg-gray-500 rounded-xs"
            >
              Reset
            </button>
          )}
        </form>
      </div>

      <div className="py-[4vh]">
        <p className="py-[2vh] font-bold">
          {filteredJobs.length} {filteredJobs.length === 1 ? "Job" : "Jobs"} Found
        </p>

        {filteredJobs.length === 0 ? (
          <p>No jobs match your search criteria</p>
        ) : (
          <div className="grid md:grid-cols-1 lg:grid-cols-3 gap-2">
            {filteredJobs.map((job) => (
              <motion.div
          key={job.id} className="bg-gray-400 py-[2vh] px-[4%] rounded-2xl"
              initial={{ y: 0 }}
              whileHover={{ y: -10 }}
              transition={{ type: "spring", stiffness: 200 }}
            >
              
                <div className="pb-[4vh]">
                  <p className="font-bold text-[24px]">{job.title}</p>
                  <p className="text-[12px] text-gray-800">{job.company}</p>
                </div>
                <div className="flex items-center justify-between py-[1vh]">
                  <div className="flex items-center gap-2">
                    <LuBriefcase />
                    <p className="capitalize">{job.job_mode}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <FaLocationDot />
                    <p>{job.location}</p>
                  </div>
                </div>
                <div className="flex items-center justify-between py-[1vh]">
                  <div className="flex items-center gap-2">
                    <FaCalendarAlt />
                    <p>{new Date().toLocaleDateString()}</p>
                  </div>
                  <div className="flex items-center gap-2 text-[12px] bg-purple-700 px-[10px] py-[5px] rounded-2xl cursor-pointer text-white">
                    <GrNetworkDrive />
                    <p className="capitalize">{job.job_status}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2 py-[1vh]">
                  <Link href={`/all-jobs/${job.id}`}>
                  <button className="bg-purple-700 text-white py-[5px] px-[16px] rounded-xl cursor-pointer">
                    Edit
                  </button>
                  </Link>
                  <button className="bg-purple-700 text-white py-[5px] px-[16px] rounded-xl cursor-pointer" onClick={() => handleDelete(job.id)}>
                    Delete
                  </button>
                </div>
                </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default AllJobsComp;