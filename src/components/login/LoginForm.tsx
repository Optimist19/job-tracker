"use client"

import { useState } from "react"
import { VscLoading } from "react-icons/vsc"
import { useForm } from "react-hook-form"
function LoginForm() {
	type FormData = {
		email: string
		password: string
	  }
	
	  const {
		register,
		handleSubmit,
		formState: { errors },
	  } = useForm<FormData>()
	
	  const [isLoading, setIsLoading] = useState(false)
	  const [errorMessage, setErrorMessage] = useState("")
	  const [showPassword, setShowPassword] = useState(false)
	
	  const onSubmit = (data: FormData) => {
		console.log(data)
		setIsLoading(true)
		setTimeout(() => {
		  setIsLoading(false)
		  setErrorMessage("Sorry, use the google authentication for now.")
		}, 2000)
	  }
  return (
	<form onSubmit={handleSubmit(onSubmit)}>
	<div className="">
	  <h2 className="text-[26px] font-bold ">Login</h2>
	  <p className="font-extralight text-[14px] md:text-[18px] text-[#787474] pt-[8px] pb-[16px]">
		Log in to stay on top of your job applications, interviews, and progress all in one place.
	  </p>
	</div>
	<div className="font-[500] text-[16px] grid gap-1.5 pb-1 pb-[16px] md:pb-4">
	  <label htmlFor="email" className="text-[#121212] ">
		Email
	  </label>
	  <input
		id="email"
		placeholder="email@example.com"
		className={`pl-2 py-1.5 rounded-md text-[#888888] ring-1 ${
		  errors.email ? "ring-red-500" : "ring-[#B0B0B0]"
		}`}
		{...register("email", {
		  required: "Email is required",
		  pattern: {
			value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
			message: "Invalid email address",
		  },
		})}
	  />
	  {errors.email && <small className="text-red-500">{errors.email.message}</small>}
	</div>

	<div className="font-[500] text-[16px] grid gap-1.5">
	  <label htmlFor="password" className="text-[#121212] ">
		Password
	  </label>
	  <div className="relative">
		<input
		  id="password"
		  type={showPassword ? "text" : "password"}
		  placeholder="Enter your password"
		  className={`pl-2 py-1.5 rounded-md text-[#888888] ring-1 w-full pr-10 ${
			errors.password ? "ring-red-500" : "ring-[#B0B0B0]"
		  }`}
		  {...register("password", {
			required: "Password is required",
			minLength: {
			  value: 6,
			  message: "Password must be at least 6 characters",
			},
		  })}
		/>
		<button
		  type="button"
		  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
		  onClick={() => setShowPassword(!showPassword)}
		>
		 {showPassword ? (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#888888"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"></path>
            <line x1="1" y1="1" x2="23" y2="23"></line>
          </svg>
        ) : (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#888888"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
            <circle cx="12" cy="12" r="3"></circle>
          </svg>
        )}
		</button>
	  </div>
	  {errors.password && <small className="text-red-500">{errors.password.message}</small>}
	</div>

	<div className="py-[16px]">
	  <button
		type="submit"
		className="flex items-center justify-center bg-[#A51CD6] text-[16px] text-white w-[100%] gap-2 font-bold py-1.5 rounded-md cursor-pointer"
	  >
		<span>Login</span> {isLoading && <VscLoading className="animate-spin" />}
	  </button>
	  <small className="text-red-700">{errorMessage}</small>
	</div>
  </form>
  )
}

export default LoginForm