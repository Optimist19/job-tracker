// "use client";

// import React, { useEffect, useState } from "react";
// import { Chart } from "react-google-charts";

// interface Job {
//   id: string;
//   title: string;
//   company: string;
//   location: string;
//   job_mode: string;
//   job_status: string;
//   createdAt: string;
// }

// interface MonthYearData {
//   month: string;
//   year: number;
//   count: number;
// }

// const months = [
//   "Jan", "Feb", "Mar", "Apr", "May", "Jun",
//   "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
// ];

// function StatsComp() {
//   const [userJobs, setUserJobs] = useState<Job[]>([]);
//   const [getMonth, setGetMonth] = useState<string>('');
//   const [getYear, setGetYear] = useState<number | undefined>();
//   const [monthYearData, setMonthYearData] = useState<MonthYearData[]>([]);

//   useEffect(() => {
//     async function getAllJobs() {
//       try {
//         const data = await fetch("/api/jobs");
//         const res = await data.json();
//         setUserJobs(res?.jobs || []);
//       } catch (error) {
//         console.error("Error fetching jobs:", error);
//       }
//     }
//     getAllJobs();
//   }, []);

//   useEffect(() => {
//     // Process dates and count jobs per month/year
//     const jobCounts: { [key: string]: number } = {};

//     userJobs.forEach((job) => {
//       const jobCreatedAt = new Date(job.createdAt);
//       const month = String(jobCreatedAt.getUTCMonth() + 1).padStart(2, "0");
//       const year = jobCreatedAt.getUTCFullYear();
//       const key = `${month}-${year}`;

//       jobCounts[key] = (jobCounts[key] || 0) + 1;
//     });

//     // Convert to array and sort chronologically
//     const dateData = Object.entries(jobCounts)
//       .map(([key, count]) => {
//         const [month, year] = key.split('-');
//         return {
//           month,
//           year: parseInt(year),
//           count
//         };
//       })
//       .sort((a, b) => {
//         if (a.year !== b.year) return a.year - b.year;
//         return parseInt(a.month) - parseInt(b.month);
//       });

//     setMonthYearData(dateData);

//     // Set the most recent month and year if available
//     if (dateData.length > 0) {
//       const latest = dateData[dateData.length - 1];
//       setGetMonth(latest.month);
//       setGetYear(latest.year);
//     }
//   }, [userJobs]);

//   const chartData = [
//     ["Month/Year", "Jobs", { role: "style" }],
//     ...monthYearData.map(({ month, year, count }) => [
//       `${months[parseInt(month) - 1]} ${year}`,
//       count,
//       "#b87333"
//     ])
//   ];

//   console.log(userJobs)

//   const options = {
//     title: "Jobs Applied Per Month",
//     backgroundColor: 'transparent',
//     legend: { position: "none" },
//     hAxis: {
//       title: "Month/Year",
//       textStyle: { color: '#333' }
//     },
//     vAxis: {
//       title: "Number of Jobs",
//       minValue: 0,
//       textStyle: { color: '#333' }
//     }
//   };

//   return (
//     <div className="h-screen flex flex-col">
//       <div className="flex-1 flex justify-center items-center md:pl-[18%] pb-[8vh] pt-[4vh]">
//         <Chart
//           chartType="ColumnChart"
//           width="100%"
//           height="100%"
//           data={chartData}
//           options={options}
//         />
//       </div>
//       <div className="text-center pb-4">
//         Current Month/Year: {getMonth && getYear ?
//           `${months[parseInt(getMonth) - 1]} ${getYear}` :
//           'Loading...'
//         }
//       </div>
//     </div>
//   );
// }

// export default StatsComp;

// import React from "react";

// function StatsComp() {
//   return (
//     <div className="h-screen flex flex-col">
//       <div className="flex-1 flex justify-center items-center md:pl-[18%] pb-[8vh] pt-[4vh]"></div>
//     </div>
//   );
// }

// export default StatsComp;

import Link from "next/link";
import React from "react";
import { FaTools, FaChartBar } from "react-icons/fa";

function StatsComp() {
  return (
    <div className="h-screen flex flex-col items-center justify-center md:pl-[18%] ">
      <div className="text-center p-8 bg-white rounded-lg shadow-lg max-w-md mx-4">
        <div className="flex justify-center mb-6">
          <div className="relative">
            <FaChartBar className="text-6xl text-purple-700 animate-pulse" />
            <FaTools className="text-3xl text-gray-600 absolute -top-2 -right-2 animate-bounce" />
          </div>
        </div>
        
        <h1 className="text-2xl font-bold text-[#888888] mb-4">
          Stats Dashboard Coming Soon!
        </h1>
        
        <p className="text-[#888888] mb-2">
          We&apos;re working hard to bring you detailed insights about your job applications.
          Check back soon for exciting updates!
        </p>
        <Link
            href="/"
            className="text-purple-600 hover:text-purple-800 text-sm font-medium flex items-center justify-center pb-2"
          >
            Home
          </Link>
        
        <div className="flex justify-center gap-2">
          <div className="w-2 h-2 bg-purple-700 rounded-full animate-bounce"></div>
          <div className="w-2 h-2 bg-purple-700 rounded-full animate-bounce delay-100"></div>
          <div className="w-2 h-2 bg-purple-700 rounded-full animate-bounce delay-200"></div>
        </div>
      </div>
    </div>
  );
}

export default StatsComp;
