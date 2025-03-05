"use client";
import React from "react";
import Link from "next/link";
import { Card, CardContent } from "./components/ui/card";
import { Home, LineChart, Diamond, Newspaper } from "lucide-react";

const counselorData = [
  { name: "JOSAA", logo: "josaa.jpeg", link: "/josaa" },
  { name: "CSAB", logo: "CSAB.webp", link: "/college-a" },
  { name: "JAC DELHI", logo: "JAC-Delhi.png", link: "/college-a" },
  { name: "UPTAC", logo: "upsee.jpg", link: "/upsee" },
  { name: "WBJEE", logo: "wbjee.png", link: "/college-a" },
  { name: "IPU", logo: "ipu.png", link: "/college-a" },
  { name: "HARYANA", logo: "haryana.png", link: "/college-a" },
  { name: "MHT-CET", logo: "mhtcet.jpeg", link: "/college-a" },
  { name: "PTU", logo: "ptu.png", link: "/college-a" },
  { name: "MP-DTE", logo: "mpdte.webp", link: "/college-a" },
  { name: "JAC CHANDIGARH", logo: "jacchandigarh.webp", link: "/college-a" }
];

export default function CollegePredictor() {
  return (
    <div className="min-h-screen bg-gray-100">

      {/* Main Content */}
      <div className="p-4">
      <h1 className="text-lg font-semibold mb-4 text-black text-center">
  Predict Your College
</h1>

<div className="bg-white p-4 rounded-lg shadow-md lg:max-w-4xl mx-auto">
          <h3 className="text-md font-semibold text-black mb-4">Course Type</h3>
          {/* New Clickable Cards */}
    <div className="grid grid-cols-2 md:grid-cols-2 gap-y-5 gap-x-3 lg:gap-x-4 lg:max-w-[80%] mx-auto mb-6">
      <Link href="/">
        <div className="p-4 bg-blue-500 text-white rounded-lg shadow-md text-center font-semibold cursor-pointer transition-transform duration-300 hover:scale-105">
          Undergraduate Courses
        </div>
      </Link>

      <Link href="/">
        <div className="p-4 bg-green-500 text-white rounded-lg shadow-md text-center font-semibold cursor-pointer transition-transform duration-300 hover:scale-105">
        Postgraduate Courses
        </div>
      </Link>
    </div>
    </div>
<br></br>

        <div className="bg-white p-4 rounded-lg shadow-md lg:max-w-4xl mx-auto">
          <h3 className="text-md font-semibold text-black mb-4">COUNSELLINGS BASED ON JEE MAIN</h3>
          
          <div className="grid grid-cols-2 md:grid-cols-3 gap-y-5 gap-x-3 lg:gap-x-4 lg:max-w-[80%] mx-auto">
            {counselorData.map((item, index) => (
              <Link key={index} href={item.link}>
                <Card className="p-2 text-center w-full max-w-xs lg:max-w-sm transition-transform duration-300 hover:scale-105 cursor-pointer">
                  <CardContent className="flex flex-col items-center">
                    <img
                      src={`/${item.logo}`} // ✅ Fixed Image Path
                      alt={item.name}
                      className="h-12 w-12 object-contain mb-2"
                    />
                    <span className="text-sm font-semibold text-black">{item.name}</span>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
          <br></br>
          <br></br>
        </div>
      </div>
</div>)}

function NavItem({ icon: Icon, label, active }) {
  return (
    <div className={`flex flex-col items-center text-gray-600 ${active ? "text-blue-600" : ""}`}>
      <Icon className="h-6 w-6" />
      <span className="text-xs">{label}</span>
    </div>
  );
}