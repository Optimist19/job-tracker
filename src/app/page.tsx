"use client";
// import { redirect } from "next/navigation";
import { Typewriter } from "react-simple-typewriter";

export default function Home() {
  const purple = "#7B1FA2";

  return (
      <div className="flex flex-col items-center justify-center h-[90vh]">
    <div className="md:pl-[17vw] ">
      <h1 className="text-center text-[26px] lg:text-[30px]">Welcome to Job Tracker!!!</h1>
        <h1 className="px-3 text-center"
          style={{
            margin: "auto 0",
          }}>
          <span style={{ color: `${purple}`,  }}>
            <Typewriter
              words={[
                "Job Tracker is a comprehensive application designed to help job seekers efficiently manage their job application process. In today's competitive job market, keeping track of multiple applications can be overwhelming. Job Tracker simplifies this process by providing a centralized platform to monitor application statuses, track progress, and analyze application patterns through insightful statistics."
              ]}
              cursor
              cursorStyle="|"
              typeSpeed={30}
              delaySpeed={1000}
            />
          </span>
        </h1>
      </div>
    </div>
  );
}
