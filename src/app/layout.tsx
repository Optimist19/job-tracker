import type { Metadata } from "next";
import { Open_Sans } from "next/font/google";
import "./globals.css";
// import NavBar from "@/components/NavBar";
// import SideBar from "@/components/SideBar";
import ToastComp from "@/components/ToastComp";
import Sidebar from "@/components/generalComp/Sidebar";

const sans = Open_Sans({
  variable: "--font-open-sans",
  subsets: ["latin"],
});


export const metadata: Metadata = {
  title: "Job Tracker",
  icons: {
    icon: "/employee-search.svg",
      apple: "/employee-search.svg"
  },
  description: "Job Tracker empowers job seekers to take control of their job search process through better organization, customizable workflows, and actionable insights, ultimately leading to more successful outcomes in their career journey",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${sans.variable} antialiased`}
      >
        {/* <NavBar /> */}
        {children}
        <Sidebar />
        <ToastComp />
      </body>
    </html>
  );
}
