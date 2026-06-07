import React from "react"

export function Chip({ color, bg, children }) {
  return (
    <span
      style={{
        display: "inline-flex",
        alignItems: "center",
        padding: "6px 10px",
        borderRadius: 999,
        fontSize: 12,
        fontWeight: 700,
        color,
        background: bg,
      }}
    >
      {children}
    </span>
  )
}