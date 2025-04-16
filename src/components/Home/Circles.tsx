"use client"

import React from 'react'
import { Briefcase } from "lucide-react";


function Circles() {
  return (
	<div className="flex flex-col items-center justify-center h-full">
	<div className="relative w-64 h-64">

	  <div className="absolute inset-0 flex items-center justify-center">
		<div className="w-48 h-48 rounded-full border-2 border-gray-200 flex items-center justify-center">
		  <div className="w-40 h-40 rounded-full border-2 border-gray-200 flex items-center justify-center">
			<div className="w-32 h-32 rounded-full border-2 border-gray-200 flex items-center justify-center">
			  <div className="w-24 h-24 rounded-full border-2 border-gray-200 flex items-center justify-center">
				<div className="w-16 h-16 rounded-full border-2 border-gray-200 flex items-center justify-center">
				  <Briefcase className="h-8 w-8 text-gray-400" />
				</div>
			  </div>
			</div>
		  </div>
		</div>
	  </div>
	</div>
	<p className="mt-6 text-gray-500 text-lg">
	  Oops! You are yet to add any job.
	</p>
  </div>  )
}

export default Circles