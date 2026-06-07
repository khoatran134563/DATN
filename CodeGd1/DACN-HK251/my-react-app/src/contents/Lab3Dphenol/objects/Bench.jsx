import React from "react"

export default function Bench() {
  return (
    <group position={[0, -1.18, 0]}>
      <mesh receiveShadow>
        <boxGeometry args={[6.8, 0.18, 2.6]} />
        <meshStandardMaterial color="#2b3440" />
      </mesh>
    </group>
  )
}