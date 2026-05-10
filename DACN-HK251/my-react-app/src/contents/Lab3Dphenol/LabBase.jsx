import React from "react"

export default function LabBase({ title, children, sidePanel }) {
  return (
    <div className="w-full min-h-screen bg-slate-100">
      <div className="max-w-7xl mx-auto px-4 py-4">
        <h1 className="text-2xl md:text-3xl font-bold text-slate-800 mb-4">
          {title}
        </h1>

        <div className="grid grid-cols-1 xl:grid-cols-[1fr_360px] gap-4">
          <div className="bg-white rounded-3xl shadow-md overflow-hidden min-h-[680px]">
            {children}
          </div>

          <div className="space-y-4">
            {sidePanel}
          </div>
        </div>
      </div>
    </div>
  )
}