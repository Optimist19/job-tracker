"use client";

import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { Bounce, toast } from "react-toastify";

interface IFormInput {
  title: string;
  company: string;
  location: string;
  jobStatus: string;
  jobMode: string;
}

interface JobData {
  id: string;
  title: string;
  company: string;
  location: string;
  job_status: string;  // Note: assuming your db field is job_status
  job_mode: string;    // Note: assuming your db field is job_mode
}

function EditComp({ id }: { id: string }) {
  const [isLoading, setIsLoading] = useState(false);
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors }
  } = useForm<IFormInput>();

  const router = useRouter();

  useEffect(() => {
    async function getJob() {
      setIsLoading(true);
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
        
        const jobData: JobData = await response.json();
        console.log(jobData)

        // Populate form with job data
        setValue("title", jobData.title);
        setValue("company", jobData.company);
        setValue("location", jobData.location);
        setValue("jobStatus", jobData.job_status);
        setValue("jobMode", jobData.job_mode);
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
        setIsLoading(false);
      }
    }

    if (id) {
      getJob();
    }
  }, [id, setValue]);

  const onSubmit: SubmitHandler<IFormInput> = async (data) => {
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
          job_mode: data.jobMode
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to update job');
      }
router.push("/all-jobs")
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
    }
  };

  return (
    <>
      <div className="md:pl-[16%] pb-[8vh] pt-[4vh] w-[100%] flex justify-center">
        <div className="w-[100%] px-4">
          {isLoading ? (
            <div className="flex justify-center items-center h-64">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-700"></div>
            </div>
          ) : (
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="bg-gray-400 py-[4vh] px-[3vw] rounded-xl ">
              <div>
                <h1 className="font-bold text-[24px] pb-[2vh]">Edit Job</h1>
              </div>

              <div className="grid md:grid-cols-3 gap-[3vw]">
                {/* Position */}
                <div className="grid gap-1">
                  <label htmlFor="title" className="font-semibold">
                  Title
                  </label>
                  <input
                    id="title"
                    {...register("title", {
                      required: "Title is required"
                    })}
                    className="bg-white outline-purple-700 rounded-xs px-1 py-[1vh] pl-[7px]"
                  />
                  {errors.title && (
                    <p className="text-[10px] text-red-600">
                      {errors.title.message}
                    </p>
                  )}
                </div>

                {/* Company */}
                <div className="grid gap-1">
                  <label htmlFor="company" className="font-semibold">
                    Company
                  </label>
                  <input
                    id="company"
                    {...register("company", { required: "Company is required" })}
                    className="bg-white outline-purple-700 rounded-xs px-1 py-[1vh] pl-[7px]"
                  />
                  {errors.company && (
                    <p className="text-[10px] text-red-600">
                      {errors.company.message}
                    </p>
                  )}
                </div>

                {/* Location */}
                <div className="grid gap-1">
                  <label htmlFor="location" className="font-semibold">
                    Location
                  </label>
                  <input
                    id="location"
                    {...register("location", {
                      required: "Location is required"
                    })}
                    className="bg-white outline-purple-700 rounded-xs px-1 py-[1vh] pl-[7px]"
                  />
                  {errors.location && (
                    <p className="text-[10px] text-red-600">
                      {errors.location.message}
                    </p>
                  )}
                </div>
              </div>

              <div className="grid md:grid-cols-3 gap-[3vw] pt-[2vh] justify-center">
                {/* Job Status */}
                <div className="grid gap-1">
                  <label
                    htmlFor="jobStatus"
                    className="font-semibold text-center md:text-left">
                    Job Status
                  </label>
                  <select
                    id="jobStatus"
                    {...register("jobStatus", {
                      required: "Job Status is required"
                    })}
                    className="bg-white outline-purple-700 rounded-xs cursor-pointer py-[1vh] px-[7px] appearance-none">
                    <option value="">Select Status</option>
                    <option value="pending">Pending</option>
                    <option value="interview">Interview</option>
                    <option value="declined">Declined</option>
                  </select>
                  {errors.jobStatus && (
                    <p className="text-[10px] text-red-600">
                      {errors.jobStatus.message}
                    </p>
                  )}
                </div>

                {/* Job Mode */}
                <div className="grid gap-1">
                  <label
                    htmlFor="jobMode"
                    className="font-semibold  text-center md:text-left">
                    Job Mode
                  </label>
                  <select
                    id="jobMode"
                    {...register("jobMode", { required: "Job Mode is required" })}
                    className="py-[1vh] bg-white outline-purple-700 rounded-xs cursor-pointer px-[7px]">
                    <option value="">Select Mode</option>
                    <option value="full time">Full-time</option>
                    <option value="part time">Part-time</option>
                  </select>
                  {errors.jobMode && (
                    <p className="text-[10px] text-red-600">
                      {errors.jobMode.message}
                    </p>
                  )}
                </div>

                {/* Submit Button */}
                <div className="flex items-end">
                  <button
                    className="text-white cursor-pointer rounded-md bg-purple-700 font-[400] py-2 px-4 w-full"
                    type="submit">
                    Update Job
                  </button>
                </div>
              </div>
            </form>
          )}
        </div>
      </div>
    </>
  );
}

export default EditComp;