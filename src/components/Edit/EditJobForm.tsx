"use client"

import { useEffect, useState } from "react"
import { SubmitHandler, useForm } from "react-hook-form"
import { useRouter } from "next/navigation";

import { Bounce, toast } from "react-toastify"
import Link from "next/link"

interface IFormInput {
  company: string
  title: string
  dateApplied: string
  jobStatus: string
  location: string
  jobMode: string
  jobType: string
}



export default function EditJobForm({ id }: { id: string }) {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors }
  } = useForm<IFormInput>();
    const router = useRouter();
  


   useEffect(() => {
    async function getJob() {
      try {
        const response = await fetch(`/api/job/${id}`); // Add the ID to the URL

        
        if (!response.ok) {
          toast(`Error: ${response.statusText}`, {
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
          return;
        }
        
        const jobData = await response.json();
        console.log(jobData)

        // Populate form with job data
        setValue("title", jobData.title);
        setValue("company", jobData.company);
        setValue("location", jobData.location);
        setValue("jobStatus", jobData.job_status);
        setValue("jobMode", jobData.job_mode);
        setValue("dateApplied", jobData.date_applied);
        setValue("jobType", jobData.job_type);
      } catch (error) {
        console.error("Error fetching job:", error);
        toast("Failed to load job data. Please try again.", {
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
      } finally {
      }
    }

    if (id) {
      getJob();
    }
  }, [id, setValue]);


  const onSubmit: SubmitHandler<IFormInput> = async (data) => {
    setIsSubmitting(true)
    console.log(data)
    try {
      const response = await fetch(`/api/job/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title: data.title,
          company: data.company,
          location: data.location,
          job_status: data.jobStatus,
          job_mode: data.jobMode,
          job_type: data.jobType
        }),
      });

      if (!response.ok) {
        
        throw new Error('Failed to update job');
      }
      router.push("/")

      toast("Job updated successfully!", {
        position: "bottom-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
        transition: Bounce
      });
    } catch (error) {
      console.error("Error updating job:", error);
      toast("Failed to update job. Please try again.", {
        position: "bottom-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
        transition: Bounce
      });
    }finally {
      setIsSubmitting(false)
    }
  };




  return (
    <div className="flex items-center justify-center px-[3vw] py-[2vh]">
      <div className="bg-white rounded-md w-full max-w-md border-2 border-[#F5DAFF] p-6 relative">
       

        {/* Form header */}
        <div className="mb-6">
          <h2 className="text-[18px] md:text-[22px] text-[#121212] font-[500]">Update Job Application</h2>
          <p className="text-[15px] md:text-[18px] font-extralight text-[#888888]">Enter the details of your job application below.</p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {/* Company */}
          <div className="grid grid-cols-3 gap-4 items-center">
          <label htmlFor="company" className="text-sm font-medium text-[#121212]">
              Company
            </label>
            <div className="col-span-2">
              <input
                id="company"
                {...register("company", { required: "Company name is required" })}
                className={`w-full ${errors.company ? "border-red-500" : ""} text-[16px] text-[#B0B0B0] ring-1 ring-[#B0B0B0] rounded-xs px-1 py-[1vh] pl-[7px]`}
                
              />
              {errors.company && <p className="text-red-500 text-xs mt-1">{errors.company.message}</p>}
            </div>
          </div>

          {/* Title */}
          <div className="grid grid-cols-3 gap-4 items-center">
            <label htmlFor="title" className="text-sm font-medium text-[#121212]">
            Title
            </label>
            <div className="col-span-2">
              <input
                id="title"
                {...register("title", { required: "Title is required" })}
                className={`w-full ${errors.title ? "border-red-500" : ""} text-[16px] text-[#B0B0B0] ring-1 ring-[#B0B0B0] rounded-xs px-1 py-[1vh] pl-[7px]`}
              />
              {errors.title && <p className="text-red-500 text-xs mt-1">{errors.title.message}</p>}
            </div>
          </div>

          {/* Date Applied */}
          <div className="grid grid-cols-3 gap-4 items-center">
            <label htmlFor="dateApplied" className="text-sm font-medium text-[#121212]">
              Date Applied
            </label>
            <div className="col-span-2">
              <input
                id="dateApplied"
                type="date"
                {...register("dateApplied", { required: "Date applied is required" })}
                className={`w-full ${errors.dateApplied ? "border-red-500" : ""} text-[#B0B0B0] ring-1 ring-[#B0B0B0] text-[16px] rounded-xs px-1 py-[1vh] pl-[7px]`}
                placeholder="enter date"
              />
              {errors.dateApplied && <p className="text-red-500 text-xs mt-1">{errors.dateApplied.message}</p>}
            </div>
          </div>

          {/* Job Status */}
          <div className="grid grid-cols-3 gap-4 items-center">
            <label htmlFor="jobStatus" className="text-sm font-medium text-[#121212]">
              Job status
            </label>
            <div className="col-span-2">
              <select  id="jobStatus" {...register("jobStatus", {
                      required: "Job Status is required"
                    })} className={`w-full ${errors.jobStatus ? "border-red-500" : ""}  ring-1 ring-[#B0B0B0] rounded-xs text-[16px] text-[#B0B0B0] px-1 py-[1vh] pl-[7px]`}  >

                  <option value="">Select Status</option>
                  <option value="pending">Pending</option>
                  <option value="interview">Interview</option>
                  <option value="declined">Declined</option>
              </select>
              {errors.jobStatus && <p className="text-red-500 text-xs mt-1">{errors.jobStatus.message}</p>}
            </div>
          </div>

          {/* Location */}
          <div className="grid grid-cols-3 gap-4 items-center">
            <label htmlFor="location" className="text-sm font-medium text-[#121212]">
              Location
            </label>
            <div className="col-span-2">
              <input
                id="location"
                {...register("location", { required: "Location is required" })}
                className={`w-full ${errors.location ? "border-red-500" : ""}  ring-1 text-[#B0B0B0] ring-[#B0B0B0] rounded-xs px-1 py-[1vh] text-[16px] pl-[7px]`}
                placeholder="Enter location"
              />
              {errors.location && <p className="text-red-500 text-xs mt-1">{errors.location.message}</p>}
            </div>
          </div>

          {/* Job Mode */}

          <div className="grid grid-cols-3 gap-4 items-center">
            <label htmlFor="jobMode" className="text-sm font-medium text-[#121212]">
              Job Mode
            </label>
            <div className="col-span-2">
              <select  id="jobMode" {...register("jobMode", { required: "Job Mode is required" })} className={`w-full ${errors.jobMode ? "border-red-500" : ""} text-[16px] ring-1 ring-[#B0B0B0] rounded-xs text-[#B0B0B0] px-1 py-[1vh] pl-[7px]`}  >

              <option value="">Select Mode</option>
				<option value="full time">Full-time</option>
				
				<option value="part time">Part-time</option>
              </select>
              {errors.jobMode && <p className="text-red-500 text-xs mt-1">{errors.jobMode.message}</p>}
            </div>
          </div>


          {/* Job type */}
          <div className="grid grid-cols-3 gap-4 items-center">
            <label htmlFor="jobType" className="text-sm font-medium text-[#121212]">
              Job Type
            </label>
            <div className="col-span-2">
              <select  id="jobType" className={`w-full ${errors.jobType ? "border-red-500" : ""} text-[#B0B0B0] ring-1 ring-[#B0B0B0] text-[16px] rounded-xs px-1 py-[1vh] pl-[7px]`} {...register("jobType", { required: "Job Type is required" })}>

              <option value="">Select Mode</option>

                  <option value="remote">Remote</option>
                  <option value="onsite">On-site</option>
                  <option value="hybrid">Hybrid</option>
              </select>
              {errors.jobType && <p className="text-red-500 text-xs mt-1">{errors.jobType.message}</p>}
            </div>
          </div>

          {/* Form Actions */}
          <div className="flex justify-end space-x-3 pt-4 mt-6">
            <Link href="/">
            <button type="button" className="border border-[#888888] text-[16px] text-[#888888] px-[20px] py-[1vh] rounded-sm cursor-pointer">
              Cancel
            </button>
            </Link>
            <button type="submit" disabled={isSubmitting} className="bg-purple-600 hover:bg-purple-700 text-white rounded-sm cursor-pointer text-[16px] px-[20px] py-[1vh]">
              {isSubmitting ? "Saving..." : "Update Application"}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
