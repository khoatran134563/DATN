import React from "react"

export default function LabBase({ title, children }) {
  return (
    <div className="w-full min-h-screen bg-slate-100">
      
      {/* Expanded to 1600px for a massive widescreen layout */}
      <div className="w-full max-w-[1600px] mx-auto px-4 py-4">
        
        <h1 className="text-2xl md:text-3xl font-bold text-slate-800 mb-4">
          {title}
        </h1>

        {/* The Grid has been removed, allowing children to stretch 100% */}
        <div className="w-full">
          {children}
        </div>
        
      </div>
    </div>
  )
}