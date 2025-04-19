"use client";

import { ChangeEvent, useState } from "react";
import { X } from "lucide-react";
import { useForm } from "react-hook-form";

import { toast } from "react-toastify";

interface FormValues {
  company: string;
  title: string;
  dateApplied: string;
  jobStatus: string;
  location: string;
  jobMode: string;
  jobType: string;
}

interface AddJobFormProps {
  modalFtn: () => void;
  setReload: () => void;
}

export default function AddJobForm({ modalFtn, setReload }: AddJobFormProps) {

  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
    reset
  } = useForm<FormValues>({
    defaultValues: {
      company: "",
      title: "",
      dateApplied: new Date().toISOString().split("T")[0], // Today's date as default
      jobStatus: "",
      location: "",
      jobMode: "",
      jobType: ""
    }
  });

  const handleFormSubmit = async (data: FormValues) => {
    // console.log(data);
    setIsSubmitting(true);

    try {
      const response = await fetch("/api/job", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          title: data.title,
          company: data.company,
          location: data.location,
          job_status: data.jobStatus,
          job_mode: data.jobMode,
          date_applied: data.dateApplied,
          job_type: data.jobType
        })
      });

      const responseData = await response.json();

      if (!response.ok) {
        throw new Error(responseData.error || "Failed to add job application");
      }

      toast.success("Job application added successfully!");
      reset();
      modalFtn();
      setReload()
    } catch (error) {
      console.error("Error details:", error);
      toast.error(
        error instanceof Error ? error.message : "Failed to add job application"
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  // Handle select changes since react-hook-form needs help with custom components
  const handleSelectChange = (
    field: keyof FormValues,
    e: ChangeEvent<HTMLSelectElement>
  ) => {
    setValue(field, e.target.value, { shouldValidate: true });
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 px-[2vw]">
      <div className="bg-white rounded-md w-full max-w-md border-2 border-blue-200 p-6 relative">
        {/* Close button */}
        <button
          onClick={modalFtn}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 cursor-pointer"
          aria-label="Close">
          <X size={20} />
        </button>

        {/* Form header */}
        <div className="mb-6">
          <h2 className="text-[18px] md:text-[22px] text-[#121212] font-[500]">
            Add New Job Application
          </h2>
          <p className="text-[15px] md:text-[18px] font-extralight text-[#888888]">
            Enter the details of your job application below.
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-4">
          {/* Company */}
          <div className="grid grid-cols-3 gap-4 items-center">
            <label
              htmlFor="company"
              className="text-sm font-medium text-gray-700">
              Company
            </label>
            <div className="col-span-2">
              <input
                id="company"
                {...register("company", {
                  required: "Company name is required"
                })}
                className={`w-full ${
                  errors.company ? "border-red-500" : ""
                } text-[16px] text-[#B0B0B0] ring-1 ring-[#B0B0B0] rounded-xs px-1 py-[1vh] pl-[7px]`}
              />
              {errors.company && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.company.message}
                </p>
              )}
            </div>
          </div>

          {/* Title */}
          <div className="grid grid-cols-3 gap-4 items-center">
            <label
              htmlFor="title"
              className="text-sm font-medium text-gray-700">
              Title
            </label>
            <div className="col-span-2">
              <input
                id="title"
                {...register("title", { required: "Title is required" })}
                className={`w-full ${
                  errors.title ? "border-red-500" : ""
                } text-[16px] text-[#B0B0B0] ring-1 ring-[#B0B0B0] rounded-xs px-1 py-[1vh] pl-[7px]`}
              />
              {errors.title && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.title.message}
                </p>
              )}
            </div>
          </div>

          {/* Date Applied */}
          <div className="grid grid-cols-3 gap-4 items-center">
            <label
              htmlFor="dateApplied"
              className="text-sm font-medium text-gray-700">
              Date Applied
            </label>
            <div className="col-span-2">
              <input
                id="dateApplied"
                type="date"
                {...register("dateApplied", {
                  required: "Date applied is required"
                })}
                className={`w-full ${
                  errors.dateApplied ? "border-red-500" : ""
                } text-[#B0B0B0] ring-1 ring-[#B0B0B0] text-[16px] rounded-xs px-1 py-[1vh] pl-[7px]`}
                placeholder="enter date"
              />
              {errors.dateApplied && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.dateApplied.message}
                </p>
              )}
            </div>
          </div>

          {/* Job Status */}
          <div className="grid grid-cols-3 gap-4 items-center">
            <label
              htmlFor="jobStatus"
              className="text-sm font-medium text-gray-700">
              Job status
            </label>
            <div className="col-span-2">
              <select
                id="jobStatus"
                className={`w-full ${
                  errors.jobStatus ? "border-red-500" : ""
                }  ring-1 ring-[#B0B0B0] rounded-xs text-[16px] text-[#B0B0B0] px-1 py-[1vh] pl-[7px]`}
                value={watch("jobStatus")}
                onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
                  handleSelectChange("jobStatus", e)
                }>
                <option value="">Select Status</option>
                <option value="applied">Applied</option>
                <option value="interview">Interview</option>
                <option value="offered">offered</option>
                <option value="rejected">Rejected</option>
              </select>
              {errors.jobStatus && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.jobStatus.message}
                </p>
              )}
            </div>
          </div>

          {/* Location */}
          <div className="grid grid-cols-3 gap-4 items-center">
            <label
              htmlFor="location"
              className="text-sm font-medium text-gray-700">
              Location
            </label>
            <div className="col-span-2">
              <input
                id="location"
                {...register("location", { required: "Location is required" })}
                className={`w-full ${
                  errors.location ? "border-red-500" : ""
                }  ring-1 text-[#B0B0B0] ring-[#B0B0B0] rounded-xs px-1 py-[1vh] text-[16px] pl-[7px]`}
                placeholder="Enter location"
              />
              {errors.location && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.location.message}
                </p>
              )}
            </div>
          </div>

          {/* Job Mode */}

          <div className="grid grid-cols-3 gap-4 items-center">
            <label
              htmlFor="jobMode"
              className="text-sm font-medium text-gray-700">
              Job Mode
            </label>
            <div className="col-span-2">
              <select
                id="jobMode"
                className={`w-full ${
                  errors.jobMode ? "border-red-500" : ""
                } text-[16px] ring-1 ring-[#B0B0B0] rounded-xs text-[#B0B0B0] px-1 py-[1vh] pl-[7px]`}
                value={watch("jobMode")}
                onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
                  handleSelectChange("jobMode", e)
                }>
                <option value="">Select Mode</option>
                <option value="full time">Full-time</option>

                <option value="part time">Part-time</option>
              </select>
              {errors.jobMode && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.jobMode.message}
                </p>
              )}
            </div>
          </div>

          {/* Job type */}
          <div className="grid grid-cols-3 gap-4 items-center">
            <label
              htmlFor="jobType"
              className="text-sm font-medium text-gray-700">
              Job Type
            </label>
            <div className="col-span-2">
              <select
                id="jobType"
                className={`w-full ${
                  errors.jobType ? "border-red-500" : ""
                } text-[#B0B0B0] ring-1 ring-[#B0B0B0] text-[16px] rounded-xs px-1 py-[1vh] pl-[7px]`}
                value={watch("jobType")}
                onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
                  handleSelectChange("jobType", e)
                }>
                <option value="">Select Mode</option>

                <option value="remote">Remote</option>
                <option value="onsite">On-site</option>
                <option value="hybrid">Hybrid</option>
              </select>
              {errors.jobMode && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.jobMode.message}
                </p>
              )}
            </div>
          </div>

          {/* Form Actions */}
          <div className="flex justify-end space-x-3 pt-4 mt-6">
            <button
              type="button"
              onClick={modalFtn}
              className="border border-[#888888] text-[16px] text-[#888888] px-[20px] py-[1vh] rounded-sm cursor-pointer">
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="bg-purple-600 hover:bg-purple-700 text-white rounded-sm cursor-pointer text-[16px] px-[20px] py-[1vh]">
              {isSubmitting ? "Saving..." : "Send Application"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
