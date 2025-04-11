"use client";

import React, { useEffect, useState } from "react";
import { Chart } from "react-google-charts";

interface Job {
  id: string;
  title: string;
  company: string;
  location: string;
  job_mode: string;
  job_status: string;
  createdAt: string;
}

interface MonthYearData {
  month: string;
  year: number;
  count: number;
}

const months = [
  "Jan", "Feb", "Mar", "Apr", "May", "Jun",
  "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
];

function StatsComp() {
  const [userJobs, setUserJobs] = useState<Job[]>([]);
  const [getMonth, setGetMonth] = useState<string>('');
  const [getYear, setGetYear] = useState<number | undefined>();
  const [monthYearData, setMonthYearData] = useState<MonthYearData[]>([]);

  useEffect(() => {
    async function getAllJobs() {
      try {
        const data = await fetch("/api/jobs");
        const res = await data.json();
        setUserJobs(res?.jobs || []);
      } catch (error) {
        console.error("Error fetching jobs:", error);
      }
    }
    getAllJobs();
  }, []);

  useEffect(() => {
    // Process dates and count jobs per month/year
    const jobCounts: { [key: string]: number } = {};
    
    userJobs.forEach((job) => {
      const jobCreatedAt = new Date(job.createdAt);
      const month = String(jobCreatedAt.getUTCMonth() + 1).padStart(2, "0");
      const year = jobCreatedAt.getUTCFullYear();
      const key = `${month}-${year}`;
      
      jobCounts[key] = (jobCounts[key] || 0) + 1;
    });

    // Convert to array and sort chronologically
    const dateData = Object.entries(jobCounts)
      .map(([key, count]) => {
        const [month, year] = key.split('-');
        return {
          month,
          year: parseInt(year),
          count
        };
      })
      .sort((a, b) => {
        if (a.year !== b.year) return a.year - b.year;
        return parseInt(a.month) - parseInt(b.month);
      });

    setMonthYearData(dateData);
    
    // Set the most recent month and year if available
    if (dateData.length > 0) {
      const latest = dateData[dateData.length - 1];
      setGetMonth(latest.month);
      setGetYear(latest.year);
    }
  }, [userJobs]);

  const chartData = [
    ["Month/Year", "Jobs", { role: "style" }],
    ...monthYearData.map(({ month, year, count }) => [
      `${months[parseInt(month) - 1]} ${year}`,
      count,
      "#b87333"
    ])
  ];

  const options = {
    title: "Jobs Applied Per Month",
    backgroundColor: 'transparent',
    legend: { position: "none" },
    hAxis: {
      title: "Month/Year",
      textStyle: { color: '#333' }
    },
    vAxis: {
      title: "Number of Jobs",
      minValue: 0,
      textStyle: { color: '#333' }
    }
  };

  return (
    <div className="h-screen flex flex-col">
      <div className="flex-1 flex justify-center items-center md:pl-[18%] pb-[8vh] pt-[4vh]">
        <Chart 
          chartType="ColumnChart" 
          width="100%" 
          height="100%" 
          data={chartData} 
          options={options}
        />
      </div>
      <div className="text-center pb-4">
        Current Month/Year: {getMonth && getYear ? 
          `${months[parseInt(getMonth) - 1]} ${getYear}` : 
          'Loading...'
        }
      </div>
    </div>
  );
}

export default StatsComp;