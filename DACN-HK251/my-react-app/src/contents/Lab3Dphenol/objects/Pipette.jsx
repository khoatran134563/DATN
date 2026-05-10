import React, { useMemo, useRef } from "react"
import { useFrame } from "@react-three/fiber"

export default function Pipette({
  type,
  position = [0, 0, 0],
  loaded = false,
  loadedColor = "#60a5fa",
  isHeld = false,
  isSqueezing = false,
  onPickUp,
  onRelease,
  onSqueezeStart,
  onSqueezeEnd,
}) {
  const bulbRef = useRef()
  const groupRef = useRef()

  const targetRotation = useMemo(() => {
    return isHeld ? -0.32 : 0
  }, [isHeld])

  useFrame(() => {
    if (bulbRef.current) {
      const sy = isSqueezing ? 0.86 : 1
      const sx = isSqueezing ? 1.05 : 1
      const sz = isSqueezing ? 1.05 : 1

      bulbRef.current.scale.x += (sx - bulbRef.current.scale.x) * 0.18
      bulbRef.current.scale.y += (sy - bulbRef.current.scale.y) * 0.18
      bulbRef.current.scale.z += (sz - bulbRef.current.scale.z) * 0.18
    }

    if (groupRef.current) {
      groupRef.current.rotation.z += (targetRotation - groupRef.current.rotation.z) * 0.14
    }
  })

  return (
    <group
      ref={groupRef}
      position={position}
      onPointerDown={(e) => {
        e.stopPropagation()
        onPickUp?.(type)
      }}
      onPointerUp={(e) => {
        e.stopPropagation()
        onRelease?.(type)
      }}
    >
      {/* bóng cao su đỏ */}
      <mesh
        ref={bulbRef}
        position={[0, 0.82, 0]}
        castShadow
        onPointerDown={(e) => {
          e.stopPropagation()
          onSqueezeStart?.(type)
        }}
        onPointerUp={(e) => {
          e.stopPropagation()
          onSqueezeEnd?.(type)
        }}
      >
        <sphereGeometry args={[0.16, 28, 28]} />
        <meshStandardMaterial
          color="#ef4444"
          emissive={loaded ? "#dc2626" : "#7f1d1d"}
          emissiveIntensity={loaded ? 0.45 : 0.18}
        />
      </mesh>

      {/* cổ pipet màu hổ phách */}
      <mesh castShadow position={[0, 0.5, 0]}>
        <cylinderGeometry args={[0.08, 0.11, 0.3, 24]} />
        <meshPhysicalMaterial
          color="#c68a2d"
          transparent
          opacity={0.9}
          roughness={0.12}
          transmission={0.2}
        />
      </mesh>

      {/* thân pipet */}
      <mesh castShadow position={[0, 0.08, 0]}>
        <cylinderGeometry args={[0.05, 0.04, 0.78, 20]} />
        <meshPhysicalMaterial
          color="#e5e7eb"
          transparent
          opacity={0.82}
          transmission={0.45}
          roughness={0.05}
        />
      </mesh>

      {/* dung dịch bên trong */}
      <mesh position={[0, 0.04, 0]}>
        <cylinderGeometry args={[0.02, 0.018, 0.56, 12]} />
        <meshStandardMaterial color={loaded ? loadedColor : "#d1d5db"} />
      </mesh>

      {/* đầu nhọn */}
      <mesh castShadow position={[0, -0.42, 0]}>
        <cylinderGeometry args={[0.012, 0.02, 0.34, 12]} />
        <meshStandardMaterial color="#d1d5db" />
      </mesh>
    </group>
  )
}