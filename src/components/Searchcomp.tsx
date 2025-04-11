"use client";

import React from "react";
import { SubmitHandler, useForm } from "react-hook-form";

interface IFormInput {
  jobTitle: string;
  jobType: string;
}

function Searchcomp() {
  const { register, handleSubmit } = useForm<IFormInput>();

  const onSubmit: SubmitHandler<IFormInput> = (data) => console.log(data);

  return (
    <div className="bg-gray-400 py-5  flex justify-center">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex gap-2 items-center">
        <input
          {...register("jobTitle", {
            pattern: {
              value: /^[A-Za-z]+$/i,
              message: "Only letters are allowed"
            }
          })}
          className="bg-white outline-purple-700 rounded-xs px-1"
          placeholder="Job Title"
        />

        <select
          className="bg-white outline-purple-700 rounded-xs cursor-pointer"
          {...register("jobType")}>
          <option value="all">All</option>
          <option value="frontend">Frontend</option>
          <option value="backend">Backend</option>
          <option value="ui_ux">UI/UX</option>
          <option value="fullstack">Fullstack</option>
          <option value="product_management">Product Management</option>
        </select>

        <button type="submit" className="px-[25px] bg-purple-700 rounded-xs">
          Search
        </button>
      </form>
    </div>
  );
}

export default Searchcomp;
