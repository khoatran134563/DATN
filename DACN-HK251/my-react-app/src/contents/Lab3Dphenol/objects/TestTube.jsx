import React, { useMemo, useRef } from "react"
import * as THREE from "three"
import { useFrame } from "@react-three/fiber"

export default function TestTube({
  position = [0, 0, 0],
  liquidColor = "#f8fafc",
  liquidOpacity = 0.18,
  highlight = false,
}) {
  const liquidRef = useRef()

  const glassProps = useMemo(
    () => ({
      color: "#dbeafe",
      transparent: true,
      opacity: 0.2,
      transmission: 0.8,
      roughness: 0.04,
      metalness: 0.02,
    }),
    []
  )

  useFrame((state) => {
    if (!liquidRef.current) return
    liquidRef.current.rotation.z = Math.sin(state.clock.elapsedTime * 1.5) * 0.01
  })

  return (
    <group position={position}>
      {/* thành ống nghiệm */}
      <mesh castShadow receiveShadow position={[0, 0.72, 0]}>
        <cylinderGeometry args={[0.15, 0.15, 1.5, 36, 1, true]} />
        <meshPhysicalMaterial {...glassProps} side={THREE.DoubleSide} />
      </mesh>

      {/* đáy bo tròn */}
      <mesh castShadow receiveShadow position={[0, -0.02, 0]}>
        <sphereGeometry args={[0.15, 36, 36, 0, Math.PI * 2, Math.PI / 2, Math.PI / 2]} />
        <meshPhysicalMaterial {...glassProps} />
      </mesh>

      {/* dung dịch trong ống nghiệm */}
      <mesh ref={liquidRef} position={[0, 0.2, 0]} receiveShadow>
        <cylinderGeometry args={[0.11, 0.11, 0.8, 24]} />
        <meshStandardMaterial color={liquidColor} transparent opacity={liquidOpacity} />
      </mesh>

      <mesh position={[0, -0.13, 0]} receiveShadow>
        <sphereGeometry args={[0.11, 24, 24]} />
        <meshStandardMaterial color={liquidColor} transparent opacity={liquidOpacity} />
      </mesh>

      {/* highlight gọn hơn, không vòng vàng */}
      {highlight && (
        <mesh position={[0, 1.48, 0]}>
          <sphereGeometry args={[0.03, 16, 16]} />
          <meshStandardMaterial color="#f8fafc" emissive="#fde68a" emissiveIntensity={0.6} />
        </mesh>
      )}
    </group>
  )
}