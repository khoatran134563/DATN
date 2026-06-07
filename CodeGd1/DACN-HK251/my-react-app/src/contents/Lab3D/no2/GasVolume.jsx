import React, { useMemo, useRef } from "react"
import { useFrame } from "@react-three/fiber"
import * as THREE from "three"

export function GasVolume({ intensity = 0.65 }) {
  const outerRef = useRef()
  const innerRef = useRef()
  const bandRef = useRef()
  const glowRef = useRef()

  const outerMat = useMemo(
    () =>
      new THREE.MeshBasicMaterial({
        transparent: true,
        opacity: 0.72,
        depthWrite: false,
        side: THREE.DoubleSide,
      }),
    []
  )

  const innerMat = useMemo(
    () =>
      new THREE.MeshBasicMaterial({
        transparent: true,
        opacity: 0.3,
        depthWrite: false,
        side: THREE.DoubleSide,
      }),
    []
  )

  const bandMat = useMemo(
    () =>
      new THREE.MeshBasicMaterial({
        color: "#ffd8b8",
        transparent: true,
        opacity: 0.04,
        depthWrite: false,
      }),
    []
  )

  const glowMat = useMemo(
    () =>
      new THREE.MeshBasicMaterial({
        color: "#7d2a12",
        transparent: true,
        opacity: 0.08,
        depthWrite: false,
        side: THREE.DoubleSide,
      }),
    []
  )

  useFrame((state) => {
    const t = state.clock.elapsedTime
    const k = THREE.MathUtils.clamp(intensity, 0, 1)

    const outerColor = new THREE.Color().lerpColors(
      new THREE.Color("#d8b392"),
      new THREE.Color("#6b1c0d"),
      k
    )

    const innerColor = new THREE.Color().lerpColors(
      new THREE.Color("#b97750"),
      new THREE.Color("#431006"),
      k
    )

    const glowColor = new THREE.Color().lerpColors(
      new THREE.Color("#c98d62"),
      new THREE.Color("#5b1508"),
      k
    )

    if (outerRef.current) {
      outerRef.current.material.color.copy(outerColor)
      outerRef.current.material.opacity = 0.58 + k * 0.18 + Math.sin(t * 1.5) * 0.01

      outerRef.current.position.y = -0.08 + Math.sin(t * 1.1) * 0.004
      outerRef.current.rotation.z = Math.sin(t * 0.7) * 0.008

      const sx = 1 + Math.sin(t * 1.3) * 0.008
      const sy = 1 + Math.cos(t * 1.1) * 0.006
      outerRef.current.scale.set(sx, sy, sx)
    }

    if (innerRef.current) {
      innerRef.current.material.color.copy(innerColor)
      innerRef.current.material.opacity = 0.2 + k * 0.18 + Math.sin(t * 1.9 + 0.5) * 0.01

      innerRef.current.position.y = -0.19 + Math.cos(t * 1.35) * 0.006
      innerRef.current.rotation.z = Math.sin(t * 0.95 + 0.4) * 0.012

      const sx = 1 + Math.cos(t * 1.5) * 0.01
      const sy = 1 + Math.sin(t * 1.25) * 0.008
      innerRef.current.scale.set(sx, sy, sx)
    }

    if (bandRef.current) {
      bandRef.current.position.x = -0.045 + Math.sin(t * 1.1) * 0.006
      bandRef.current.material.opacity = 0.025 + k * 0.035 + Math.sin(t * 2.0) * 0.006
    }

    if (glowRef.current) {
      glowRef.current.material.color.copy(glowColor)
      glowRef.current.material.opacity = 0.035 + k * 0.06 + Math.sin(t * 1.6 + 0.8) * 0.008
      glowRef.current.scale.set(
        1 + Math.sin(t * 1.4) * 0.015,
        1 + Math.cos(t * 1.2) * 0.012,
        1
      )
    }
  })

  return (
    <group renderOrder={2}>
      {/* Lớp khí ngoài: sáng hơn, mềm hơn */}
      <mesh ref={outerRef} position={[0, -0.08, 0]} renderOrder={2}>
        <cylinderGeometry args={[0.198, 0.198, 2.32, 56]} />
        <primitive object={outerMat} attach="material" />
      </mesh>

      {/* Lõi khí: đậm hơn, nhỏ hơn */}
      <mesh ref={innerRef} position={[0, -0.19, 0]} renderOrder={3}>
        <cylinderGeometry args={[0.165, 0.165, 1.96, 56]} />
        <primitive object={innerMat} attach="material" />
      </mesh>

      {/* Dải sáng mảnh dọc thân khí */}
      <mesh ref={bandRef} position={[-0.045, 0.0, 0.112]} renderOrder={4}>
        <planeGeometry args={[0.024, 1.82]} />
        <primitive object={bandMat} attach="material" />
      </mesh>

      {/* Vùng đậm mềm ở nửa dưới giúp khí bớt phẳng */}
      <mesh ref={glowRef} position={[0.0, -0.55, 0.03]} renderOrder={3}>
        <sphereGeometry args={[0.17, 24, 24]} />
        <primitive object={glowMat} attach="material" />
      </mesh>
    </group>
  )
}