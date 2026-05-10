import React, { useMemo, useRef } from "react"
import { useFrame } from "@react-three/fiber"
import * as THREE from "three"

export function Clamp({ active = false }) {
  const groupRef = useRef()
  const leftArmRef = useRef()
  const rightArmRef = useRef()
  const leftJawRef = useRef()
  const rightJawRef = useRef()
  const springRef = useRef()
  const ringRef = useRef()
  const darkJawLeftRef = useRef()
  const darkJawRightRef = useRef()

  const leftMat = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: "#bd7d38",
        roughness: 0.9,
        metalness: 0.01,
        emissive: new THREE.Color("#5f3612"),
        emissiveIntensity: 0,
      }),
    []
  )

  const rightMat = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: "#b2712f",
        roughness: 0.92,
        metalness: 0.01,
        emissive: new THREE.Color("#552f10"),
        emissiveIntensity: 0,
      }),
    []
  )

  const jawMat = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: "#cf8f47",
        roughness: 0.86,
        metalness: 0.01,
      }),
    []
  )

  const darkJawMat = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: "#4b2f1d",
        roughness: 0.82,
        metalness: 0.05,
      }),
    []
  )

  const springMat = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: "#c08b4d",
        roughness: 0.62,
        metalness: 0.08,
      }),
    []
  )

  useFrame((state) => {
    const t = state.clock.elapsedTime
    const activeAmount = active ? 1 : 0

    const wobble = active ? Math.sin(t * 13) * 0.006 : Math.sin(t * 1.6) * 0.003
    const jawSpread = 0.118 + activeAmount * 0.016 + Math.sin(t * 7.5) * 0.003

    if (groupRef.current) {
      groupRef.current.rotation.z = 0.02 + wobble
      groupRef.current.position.y = Math.sin(t * 1.9) * 0.003
    }

    if (leftArmRef.current) {
      leftArmRef.current.rotation.z = 0.075 + activeAmount * 0.008 + Math.sin(t * 5.4) * 0.002
      leftArmRef.current.material.emissiveIntensity = active ? 0.035 + Math.sin(t * 6.0) * 0.008 : 0
    }

    if (rightArmRef.current) {
      rightArmRef.current.rotation.z = -0.075 - activeAmount * 0.008 + Math.cos(t * 5.2) * 0.002
      rightArmRef.current.material.emissiveIntensity = active ? 0.03 + Math.cos(t * 5.8) * 0.007 : 0
    }

    if (leftJawRef.current) {
      leftJawRef.current.position.x = -jawSpread
      leftJawRef.current.rotation.z = 0.11 + activeAmount * 0.016
    }

    if (rightJawRef.current) {
      rightJawRef.current.position.x = jawSpread
      rightJawRef.current.rotation.z = -0.11 - activeAmount * 0.016
    }

    if (darkJawLeftRef.current) {
      darkJawLeftRef.current.position.x = -jawSpread + 0.035
    }

    if (darkJawRightRef.current) {
      darkJawRightRef.current.position.x = jawSpread - 0.035
    }

    if (springRef.current) {
      springRef.current.material.color.set(active ? "#d4a468" : "#c08b4d")
      springRef.current.scale.setScalar(1 + Math.sin(t * 8.0) * 0.012 * activeAmount)
    }

    if (ringRef.current) {
      ringRef.current.rotation.z = Math.sin(t * 6.2) * 0.05 * activeAmount
    }
  })

  return (
    <group ref={groupRef} rotation={[0, 0, 0.02]}>
      {/* Thân gỗ trái */}
      <mesh ref={leftArmRef} position={[-0.115, 0.05, 0]} rotation={[0, 0, 0.075]} castShadow>
        <boxGeometry args={[0.11, 1.96, 0.09]} />
        <primitive object={leftMat} attach="material" />
      </mesh>

      {/* Gân sáng trái */}
      <mesh position={[-0.085, 0.12, 0.048]} rotation={[0, 0, 0.075]}>
        <boxGeometry args={[0.018, 1.72, 0.01]} />
        <meshBasicMaterial color="#f1c07b" transparent opacity={0.18} />
      </mesh>

      {/* Thân gỗ phải */}
      <mesh ref={rightArmRef} position={[0.115, -0.02, 0]} rotation={[0, 0, -0.075]} castShadow>
        <boxGeometry args={[0.11, 1.96, 0.09]} />
        <primitive object={rightMat} attach="material" />
      </mesh>

      {/* Gân sáng phải */}
      <mesh position={[0.085, -0.02, 0.048]} rotation={[0, 0, -0.075]}>
        <boxGeometry args={[0.018, 1.68, 0.01]} />
        <meshBasicMaterial color="#efb76c" transparent opacity={0.15} />
      </mesh>

      {/* Đầu kẹp trái */}
      <mesh ref={leftJawRef} position={[-0.158, 0.89, 0]} rotation={[0, 0, 0.11]} castShadow>
        <boxGeometry args={[0.1, 0.44, 0.09]} />
        <primitive object={jawMat} attach="material" />
      </mesh>

      {/* Đầu kẹp phải */}
      <mesh ref={rightJawRef} position={[0.158, 0.89, 0]} rotation={[0, 0, -0.11]} castShadow>
        <boxGeometry args={[0.1, 0.44, 0.09]} />
        <primitive object={jawMat} attach="material" />
      </mesh>

      {/* Má kẹp đen trái */}
      <mesh
        ref={darkJawLeftRef}
        position={[-0.123, 1.08, 0.012]}
        rotation={[0, 0, 0.11]}
        castShadow
      >
        <boxGeometry args={[0.045, 0.125, 0.094]} />
        <primitive object={darkJawMat} attach="material" />
      </mesh>

      {/* Má kẹp đen phải */}
      <mesh
        ref={darkJawRightRef}
        position={[0.123, 1.08, 0.012]}
        rotation={[0, 0, -0.11]}
        castShadow
      >
        <boxGeometry args={[0.045, 0.125, 0.094]} />
        <primitive object={darkJawMat} attach="material" />
      </mesh>

      {/* Khối bản lề giữa */}
      <mesh ref={springRef} position={[0, 0.12, 0]} castShadow>
        <cylinderGeometry args={[0.062, 0.062, 0.14, 24]} />
        <primitive object={springMat} attach="material" />
      </mesh>

      {/* Vòng lò xo */}
      <mesh ref={ringRef} position={[0, 0.12, 0]} rotation={[Math.PI / 2, 0, 0]} castShadow>
        <torusGeometry args={[0.074, 0.01, 12, 24]} />
        <meshStandardMaterial color="#58402a" roughness={0.76} metalness={0.12} />
      </mesh>

      {/* Tay bóp dưới trái */}
      <mesh position={[-0.04, -0.92, 0]} rotation={[0, 0, 0.055]} castShadow>
        <boxGeometry args={[0.075, 0.35, 0.09]} />
        <meshStandardMaterial color="#9f682f" roughness={0.9} metalness={0.01} />
      </mesh>

      {/* Tay bóp dưới phải */}
      <mesh position={[0.04, -0.95, 0]} rotation={[0, 0, -0.055]} castShadow>
        <boxGeometry args={[0.075, 0.35, 0.09]} />
        <meshStandardMaterial color="#9f682f" roughness={0.9} metalness={0.01} />
      </mesh>
    </group>
  )
}