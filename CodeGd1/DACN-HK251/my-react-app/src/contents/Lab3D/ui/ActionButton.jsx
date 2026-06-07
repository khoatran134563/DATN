import React from "react"

export function ActionButton({ active, tone, onClick, children }) {
  const styles =
    tone === "hot"
      ? {
          background: active ? "linear-gradient(135deg,#ff9b52,#ff7131)" : "#fff6ef",
          color: active ? "#fff" : "#cb5c1a",
          border: active ? "transparent" : "1px solid rgba(255,155,82,0.28)",
          boxShadow: active ? "0 10px 24px rgba(255,113,49,0.24)" : "none",
        }
      : tone === "cold"
      ? {
          background: active ? "linear-gradient(135deg,#67c4ff,#3c8fff)" : "#f2f9ff",
          color: active ? "#fff" : "#256fcb",
          border: active ? "transparent" : "1px solid rgba(103,196,255,0.28)",
          boxShadow: active ? "0 10px 24px rgba(60,143,255,0.22)" : "none",
        }
      : {
          background: active ? "linear-gradient(135deg,#66758d,#45546b)" : "#f6f8fb",
          color: active ? "#fff" : "#536174",
          border: active ? "transparent" : "1px solid rgba(83,97,116,0.18)",
          boxShadow: active ? "0 10px 24px rgba(69,84,107,0.20)" : "none",
        }

  return (
    <button
      onClick={onClick}
      style={{
        padding: "11px 15px",
        borderRadius: 12,
        fontSize: 14,
        fontWeight: 700,
        cursor: "pointer",
        outline: "none",
        ...styles,
      }}
    >
      {children}
    </button>
  )
}