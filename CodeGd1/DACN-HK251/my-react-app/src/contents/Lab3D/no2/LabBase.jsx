import React from "react"

export function LabBase() {
  return (
    <>
      {/* Tường sau */}
      <mesh position={[0, 2.15, -4.8]} receiveShadow>
        <planeGeometry args={[16, 10]} />
        <meshStandardMaterial color="#313844" roughness={1} />
      </mesh>

      {/* Mặt bàn tối */}
      <mesh
        rotation={[-Math.PI / 2, 0, 0]}
        position={[0, -1.42, 0]}
        receiveShadow
      >
        <planeGeometry args={[16, 10]} />
        <meshStandardMaterial color="#171c23" roughness={0.92} />
      </mesh>

      {/* Bệ trung tâm sáng hơn một chút */}
      <mesh position={[0, -1.25, 0]} castShadow receiveShadow>
        <boxGeometry args={[9.4, 0.16, 4.2]} />
        <meshStandardMaterial color="#dadfe8" roughness={0.82} metalness={0.03} />
      </mesh>

      {/* Hắt sáng dưới beaker nóng */}
      <mesh position={[-2.7, -1.17, 0.1]} rotation={[-Math.PI / 2, 0, 0]}>
        <circleGeometry args={[1.2, 36]} />
        <meshBasicMaterial color="#ff8e4c" transparent opacity={0.08} depthWrite={false} />
      </mesh>

      {/* Hắt sáng dưới beaker lạnh */}
      <mesh position={[2.7, -1.17, 0.1]} rotation={[-Math.PI / 2, 0, 0]}>
        <circleGeometry args={[1.2, 36]} />
        <meshBasicMaterial color="#6ecbff" transparent opacity={0.06} depthWrite={false} />
      </mesh>
    </>
  )
}