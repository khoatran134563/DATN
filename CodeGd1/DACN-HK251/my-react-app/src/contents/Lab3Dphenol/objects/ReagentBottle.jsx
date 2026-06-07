import React from "react"
import { Text } from "@react-three/drei"

export default function ReagentBottle({
  label,
  position = [0, 0, 0],
  bodyColor = "#6b4520",
}) {
  return (
    <group position={position}>
      {/* thân chai */}
      <mesh castShadow receiveShadow position={[0, 0.42, 0]}>
        <cylinderGeometry args={[0.27, 0.3, 0.72, 32]} />
        <meshPhysicalMaterial
          color={bodyColor}
          transparent
          opacity={0.78}
          roughness={0.16}
          metalness={0.04}
          transmission={0.12}
        />
      </mesh>

      {/* vai chai */}
      <mesh castShadow receiveShadow position={[0, 0.77, 0]}>
        <cylinderGeometry args={[0.18, 0.25, 0.16, 32]} />
        <meshPhysicalMaterial
          color={bodyColor}
          transparent
          opacity={0.8}
          roughness={0.16}
          transmission={0.1}
        />
      </mesh>

      {/* cổ chai */}
      <mesh castShadow receiveShadow position={[0, 0.98, 0]}>
        <cylinderGeometry args={[0.12, 0.12, 0.26, 28]} />
        <meshPhysicalMaterial
          color={bodyColor}
          transparent
          opacity={0.82}
          roughness={0.14}
          transmission={0.1}
        />
      </mesh>

      {/* miệng chai */}
      <mesh castShadow position={[0, 1.14, 0]}>
        <torusGeometry args={[0.115, 0.012, 12, 40]} />
        <meshStandardMaterial color="#2a1808" />
      </mesh>

      {/* nhãn */}
      <mesh position={[0, 0.28, 0.23]}>
        <boxGeometry args={[0.42, 0.3, 0.02]} />
        <meshStandardMaterial color="#e5e7eb" />
      </mesh>

      <Text
        position={[0, 0.28, 0.25]}
        fontSize={0.085}
        color="#111827"
        anchorX="center"
        anchorY="middle"
      >
        {label}
      </Text>
    </group>
  )
}