import React, { useState } from "react";
import logo from "../assets/main.png";


export default function Registration() {
  const [formData, setFormData] = useState({
    teamName: "",
    leaderName: "",
    email: "",
    member2: "",
    member3: "",
    member4: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Team Data:", formData);
    // Add your API call here
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#D1E1F9] to-[#FFFFFF] font-sans text-[#3C4043]">
      {/* Navigation Bar */}
      <nav className="flex items-center justify-between px-8 py-4 bg-white/80 backdrop-blur-md sticky top-0 z-50">
        <div className="flex items-center gap-2">
       <img
  src={logo}
  alt="GDSC Logo"
  className="w-8"
/>

          <div>
            <h1 className="text-sm font-bold leading-tight text-gray-700">Developer Student Club</h1>
            <p className="text-[10px] text-blue-600 font-medium">Symbiosis Institute of Technology, Pune</p>
          </div>
        </div>
        <div className="hidden md:flex items-center gap-8 text-sm font-medium text-gray-600">
          <a href="#" className="hover:text-blue-600 transition">Home</a>
          <a href="#" className="hover:text-blue-600 transition">Leaderboard</a>
          <a href="#" className="hover:text-blue-600 transition">Results</a>
          <button className="bg-[#1A73E8] text-white px-6 py-2 rounded-md hover:bg-blue-700 transition shadow-md">
            Register
          </button>
        </div>
      </nav>

      {/* Main Content */}
      <div className="flex justify-center py-12 px-4">
        <div className="bg-white w-full max-w-[550px] rounded-[40px] shadow-2xl border border-gray-100 overflow-hidden flex flex-col items-center p-10">
          
          {/* Logo Header */}
          <div className="flex flex-col items-center mb-8">
            <div className="flex items-center gap-2 text-4xl md:text-5xl font-light">
              <span className="text-[#4285F4] text-6xl font-serif">{"{"}</span>
              <div className="flex flex-col items-center">
                <div className="flex gap-1 mb-1">
                  <div className="w-8 h-2 bg-[#FBBC05] rounded-full transform -skew-x-12"></div>
                  <div className="w-6 h-2 bg-[#EA4335] rounded-full transform -skew-x-12"></div>
                </div>
                <h2 className="font-bold tracking-tighter text-2xl">
                  <span className="text-gray-700">2 FAST</span><br/>
                  <span className="text-[#34A853]">2 HACK</span>
                </h2>
                <span className="text-[10px] font-bold text-blue-600">2.0</span>
              </div>
              <span className="text-[#4285F4] text-6xl font-serif">{"}"}</span>
            </div>
            
            <h3 className="text-2xl font-bold text-gray-800 mt-6"> Team Registration Form</h3>
            <p className="text-gray-500 text-sm mt-1">Fill out the form carefully</p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="w-full space-y-5">
            {[
              { label: "Team name", name: "teamName", type: "text" },
              { label: "Team Leader Name", name: "leaderName", type: "text" },
              { label: "Email Address", name: "email", type: "email" },
              { label: "Member 2 Name", name: "member2", type: "text" },
              { label: "Member 3 Name", name: "member3", type: "text" },
              { label: "Member 4 Name", name: "member4", type: "text" },
            ].map((field) => (
              <div key={field.name} className="flex flex-col items-center">
                <label className="text-sm font-medium text-gray-600 mb-2">{field.label}</label>
                <input
                  type={field.type}
                  name={field.name}
                  value={formData[field.name]}
                  onChange={handleChange}
                  required
                  className="w-full max-w-[400px] border-2 border-gray-300 rounded-lg p-2 focus:outline-none focus:border-blue-500 transition-colors bg-white shadow-inner"
                />
              </div>
            ))}

            <div className="flex justify-center pt-6">
              <button
                type="submit"
                className="bg-[#78C257] hover:bg-[#68a84a] text-white font-bold py-3 px-16 rounded-xl shadow-lg transition-transform active:scale-95"
              >
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}