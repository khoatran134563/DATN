import React, { useMemo, useRef } from "react"
import { useFrame } from "@react-three/fiber"
import * as THREE from "three"
import { GasVolume } from "./GasVolume"

export function TestTube({ gasIntensity = 0.65, active = false }) {
  const stopperRef = useRef()
  const rimRef = useRef()
  const bodyRef = useRef()
  const bottomRef = useRef()
  const highlightARef = useRef()
  const highlightBRef = useRef()

  const bodyMat = useMemo(
    () =>
      new THREE.MeshPhysicalMaterial({
        color: "#f4f8ff",
        transmission: 0.82,
        transparent: true,
        opacity: 0.28,
        thickness: 0.16,
        roughness: 0.025,
        ior: 1.5,
        clearcoat: 1,
        clearcoatRoughness: 0.02,
        side: THREE.DoubleSide,
        depthWrite: false,
      }),
    []
  )

  const bottomMat = useMemo(
    () =>
      new THREE.MeshPhysicalMaterial({
        color: "#f4f8ff",
        transmission: 0.82,
        transparent: true,
        opacity: 0.28,
        thickness: 0.16,
        roughness: 0.025,
        ior: 1.5,
        clearcoat: 1,
        clearcoatRoughness: 0.02,
        depthWrite: false,
      }),
    []
  )

  useFrame((state) => {
    const t = state.clock.elapsedTime

    if (stopperRef.current) {
      stopperRef.current.material.emissiveIntensity = active
        ? 0.08 + Math.sin(t * 5.5) * 0.02
        : 0
    }

    if (rimRef.current) {
      rimRef.current.material.roughness = 0.18 + Math.sin(t * 1.7) * 0.01
    }

    if (bodyRef.current) {
      bodyRef.current.material.opacity = 0.26 + Math.sin(t * 1.5) * 0.012
      bodyRef.current.material.clearcoatRoughness = 0.02 + Math.sin(t * 1.2) * 0.003
    }

    if (bottomRef.current) {
      bottomRef.current.material.opacity = 0.25 + Math.cos(t * 1.4) * 0.01
    }

    if (highlightARef.current) {
      highlightARef.current.position.x = -0.055 + Math.sin(t * 1.6) * 0.006
      highlightARef.current.material.opacity = 0.14 + Math.sin(t * 2.0) * 0.02
    }

    if (highlightBRef.current) {
      highlightBRef.current.position.x = 0.05 + Math.cos(t * 1.4) * 0.004
      highlightBRef.current.material.opacity = 0.08 + Math.cos(t * 1.8) * 0.015
    }
  })

  return (
    <group>
      {/* Khí NO2 */}
      <group renderOrder={2}>
        <GasVolume intensity={gasIntensity} />
      </group>

      {/* Nút cao su */}
      <mesh ref={stopperRef} position={[0, 1.5, 0]} castShadow renderOrder={5}>
        <cylinderGeometry args={[0.12, 0.095, 0.3, 28]} />
        <meshStandardMaterial
          color="#d9d1bf"
          roughness={0.86}
          metalness={0.02}
          emissive={active ? "#675531" : "#000000"}
          emissiveIntensity={active ? 0.1 : 0}
        />
      </mesh>

      {/* Viền miệng ống */}
      <mesh
        ref={rimRef}
        position={[0, 1.33, 0]}
        rotation={[Math.PI / 2, 0, 0]}
        castShadow
        renderOrder={5}
      >
        <torusGeometry args={[0.225, 0.015, 16, 56]} />
        <meshStandardMaterial color="#dfe8f2" roughness={0.18} metalness={0.08} />
      </mesh>

      {/* Thân ống nghiệm */}
      <mesh ref={bodyRef} castShadow receiveShadow renderOrder={4}>
        <cylinderGeometry args={[0.22, 0.22, 2.68, 72, 1, true]} />
        <primitive object={bodyMat} attach="material" />
      </mesh>

      {/* Đáy bo tròn */}
      <mesh
        ref={bottomRef}
        position={[0, -1.34, 0]}
        castShadow
        receiveShadow
        renderOrder={4}
      >
        <sphereGeometry args={[0.218, 48, 48, 0, Math.PI * 2, 0, Math.PI / 2]} />
        <primitive object={bottomMat} attach="material" />
      </mesh>

      {/* Highlight kính trái */}
      <mesh ref={highlightARef} position={[-0.055, 0.0, 0.225]} renderOrder={6}>
        <planeGeometry args={[0.035, 2.18]} />
        <meshBasicMaterial color="#ffffff" transparent opacity={0.16} depthWrite={false} />
      </mesh>

      {/* Highlight kính phải */}
      <mesh ref={highlightBRef} position={[0.05, 0.08, 0.225]} renderOrder={6}>
        <planeGeometry args={[0.016, 2.02]} />
        <meshBasicMaterial color="#ffffff" transparent opacity={0.09} depthWrite={false} />
      </mesh>
    </group>
  )
}