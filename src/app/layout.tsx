import type { Metadata } from "next";
import { Urbanist } from "next/font/google";
import "./globals.css";

import ToastComp from "@/components/ToastComp";

const urban = Urbanist({
  variable: "--font-urbanist",
  subsets: ["latin"]
});




export const metadata: Metadata = {
  title: "Job Tracker",
  icons: {
    icon: "/logo.svg",
    apple: "/logo.svg"
  },
  description:
    "Job Tracker empowers job seekers to take control of their job search process through better organization, customizable workflows, and actionable insights, ultimately leading to more successful outcomes in their career journey"
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${urban.variable} antialiased`}>        
        {children}
        <ToastComp />
      </body>
    </html>
  );
}
