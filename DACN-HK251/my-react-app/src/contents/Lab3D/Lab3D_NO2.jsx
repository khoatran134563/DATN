import React, { useState } from "react"
import { Canvas } from "@react-three/fiber"
import { Chip } from "./ui/Chip"
import { Scene } from "./no2/Scene"

export default function Lab3D_NO2() {
  const [sceneKey, setSceneKey] = useState(0)
  const [info, setInfo] = useState({
    mode: "neutral",
    status: "Bước 1: Nhấn vào kẹp gỗ. Kẹp sẽ xoay ngang, sau đó đưa đầu nhọn bên phải tới gần cổ ống nghiệm để kẹp.",
  })

  const observation =
    info.mode === "hot"
      ? "Khí trong ống nghiệm đậm màu nâu đỏ hơn sau khi nhúng vào nước nóng."
      : info.mode === "cold"
      ? "Khí trong ống nghiệm nhạt màu hơn sau khi nhúng vào nước đá."
      : "Ban đầu ống nghiệm chứa khí NO₂ có màu nâu đỏ trung gian."

  const explanation =
    info.mode === "hot"
      ? "Khi tăng nhiệt độ, cân bằng chuyển dịch theo chiều tạo nhiều NO₂ hơn nên màu nâu đỏ tăng."
      : info.mode === "cold"
      ? "Khi giảm nhiệt độ, cân bằng chuyển dịch theo chiều tạo N₂O₄ nên màu khí nhạt đi."
      : "Đây là trạng thái ban đầu trước khi tác động nhiệt độ."

  return (
    <div
      style={{
        width: "100%",
        background: "#ffffff",
        borderRadius: 20,
        border: "1px solid #e3e8ef",
        padding: 20,
        boxSizing: "border-box",
      }}
    >
      <div style={{ marginBottom: 14 }}>
        <div
          style={{
            display: "inline-block",
            padding: "6px 12px",
            borderRadius: 999,
            background: "#eef4ff",
            color: "#3563e9",
            fontSize: 12,
            fontWeight: 800,
            textTransform: "uppercase",
            letterSpacing: 0.4,
          }}
        >
          Thí nghiệm 3D tương tác
        </div>

        <h2
          style={{
            margin: "10px 0 8px",
            color: "#1f2f46",
            fontSize: "clamp(22px, 2.15vw, 32px)",
            lineHeight: 1.2,
          }}
        >
          Ảnh hưởng của nhiệt độ đến màu khí NO₂
        </h2>

        <p
          style={{
            margin: 0,
            color: "#5f6b7a",
            fontSize: 14,
            lineHeight: 1.65,
            maxWidth: 980,
          }}
        >
          Mô phỏng thao tác gắp ống nghiệm chứa khí NO₂ bằng kẹp gỗ, sau đó đưa tới gần
          cốc nước nóng hoặc cốc nước đá để quan sát sự thay đổi màu sắc do chuyển dịch cân bằng.
        </p>
      </div>

      <div
        style={{
          background: "#2d333d",
          borderRadius: 24,
          border: "1px solid #434b58",
          overflow: "hidden",
          boxShadow:
            "0 20px 40px rgba(15,23,42,0.08), inset 0 1px 0 rgba(255,255,255,0.04)",
        }}
      >
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: 10,
            justifyContent: "space-between",
            alignItems: "center",
            padding: "14px 16px",
            borderBottom: "1px solid rgba(255,255,255,0.08)",
            background:
              "linear-gradient(180deg, rgba(255,255,255,0.04), rgba(255,255,255,0.015))",
          }}
        >
          <div style={{ display: "flex", flexWrap: "wrap", gap: 8, alignItems: "center" }}>
            <Chip color="#ffd1a5" bg="rgba(255,155,82,0.14)">
              Nước nóng
            </Chip>
            <Chip color="#bde6ff" bg="rgba(96,182,255,0.14)">
              Nước đá
            </Chip>
            <Chip color="#d8dee8" bg="rgba(255,255,255,0.08)">
              Kéo-thả bằng chuột
            </Chip>
          </div>

          <div style={{ color: "#d6deea", fontSize: 13, fontWeight: 700 }}>
            2NO₂ ⇌ N₂O₄
          </div>
        </div>

        <div
          style={{
            width: "100%",
            height: "clamp(420px, 54vw, 680px)",
            minHeight: 420,
            maxHeight: 680,
            background: "#252b35",
          }}
        >
          <Canvas
            key={sceneKey}
            shadows
            camera={{ position: [0, 0.95, 8.1], fov: 40 }}
            gl={{ antialias: true, alpha: true }}
            dpr={[1, 1.75]}
          >
            <color attach="background" args={["#252b35"]} />
            <fog attach="fog" args={["#252b35", 8.5, 14.5]} />
            <Scene onInfoChange={setInfo} />
          </Canvas>
        </div>
      </div>

      <div
        style={{
          marginTop: 16,
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
          gap: 16,
        }}
      >
        <div
          style={{
            background: "#fbfcfe",
            border: "1px solid #e6ebf2",
            borderRadius: 18,
            padding: 16,
            boxShadow: "0 6px 18px rgba(15,23,42,0.04)",
          }}
        >
          <div style={{ fontSize: 15, fontWeight: 800, color: "#24344c", marginBottom: 12 }}>
            Trạng thái thao tác
          </div>

          <div style={{ color: "#5f6c7b", fontSize: 14, lineHeight: 1.75 }}>{info.status}</div>

          <button
            onClick={() => {
              setSceneKey((k) => k + 1)
              setInfo({
                mode: "neutral",
                status:
                  "Bước 1: Nhấn vào kẹp gỗ. Kẹp sẽ xoay ngang, sau đó đưa đầu nhọn bên phải tới gần cổ ống nghiệm để kẹp.",
              })
            }}
            style={{
              marginTop: 14,
              padding: "10px 14px",
              borderRadius: 12,
              border: "1px solid #d7dee8",
              background: "#ffffff",
              color: "#32445c",
              fontWeight: 700,
              cursor: "pointer",
              boxShadow: "0 4px 12px rgba(15,23,42,0.04)",
            }}
          >
            Đặt lại thí nghiệm
          </button>
        </div>

        <div
          style={{
            background: "#fbfcfe",
            border: "1px solid #e6ebf2",
            borderRadius: 18,
            padding: 16,
            boxShadow: "0 6px 18px rgba(15,23,42,0.04)",
          }}
        >
          <div style={{ fontSize: 15, fontWeight: 800, color: "#24344c", marginBottom: 12 }}>
            Quan sát & giải thích
          </div>

          <div style={{ color: "#5f6c7b", fontSize: 14, lineHeight: 1.75 }}>
            <strong>Hiện tượng:</strong> {observation}
          </div>

          <div style={{ color: "#5f6c7b", fontSize: 14, lineHeight: 1.75, marginTop: 10 }}>
            <strong>Giải thích:</strong> {explanation}
          </div>
        </div>
      </div>
    </div>
  )
}