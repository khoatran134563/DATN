import React, { useMemo, useRef } from "react"
import { useFrame } from "@react-three/fiber"
import * as THREE from "three"

function SteamThread({
  x = 0,
  z = 0,
  phase = 0,
  height = 0,
  width = 0.08,
  opacity = 0.08,
}) {
  const ref = useRef()

  useFrame((state) => {
    if (!ref.current) return
    const t = state.clock.elapsedTime + phase

    ref.current.position.x = x + Math.sin(t * 0.9) * 0.03
    ref.current.position.y = 1.02 + height + Math.sin(t * 1.1) * 0.04 + t * 0.026
    ref.current.position.z = z + Math.cos(t * 0.7) * 0.02

    ref.current.material.opacity = Math.max(
      0,
      opacity * (0.78 + Math.sin(t * 1.8) * 0.18)
    )

    const sx = 1 + Math.sin(t * 1.2) * 0.08
    const sy = 1 + Math.cos(t * 1.0) * 0.12
    ref.current.scale.set(sx, sy, 1)
  })

  return (
    <mesh ref={ref} position={[x, 1.04 + height, z]}>
      <planeGeometry args={[width, 0.5]} />
      <meshBasicMaterial color="#ffffff" transparent opacity={opacity} depthWrite={false} />
    </mesh>
  )
}

function SteamCloud({ position, scale = 1, phase = 0, opacity = 0.06 }) {
  const ref = useRef()

  useFrame((state) => {
    if (!ref.current) return
    const t = state.clock.elapsedTime + phase
    ref.current.position.x = position[0] + Math.sin(t * 0.8) * 0.025
    ref.current.position.y = position[1] + Math.sin(t * 1.2) * 0.03 + t * 0.01
    ref.current.position.z = position[2] + Math.cos(t * 0.6) * 0.015
    const s = scale * (1 + Math.sin(t * 1.4) * 0.08)
    ref.current.scale.setScalar(s)
    ref.current.material.opacity = opacity * (0.8 + Math.sin(t * 1.7) * 0.15)
  })

  return (
    <mesh ref={ref} position={position} scale={scale}>
      <sphereGeometry args={[0.11, 18, 18]} />
      <meshBasicMaterial color="#ffffff" transparent opacity={opacity} depthWrite={false} />
    </mesh>
  )
}

function CondensationDrop({
  position,
  scale = 1,
  opacity = 0.24,
  slide = false,
  phase = 0,
}) {
  const ref = useRef()

  useFrame((state) => {
    if (!ref.current) return
    const t = state.clock.elapsedTime + phase

    ref.current.material.opacity = opacity * (0.82 + Math.sin(t * 2.1) * 0.12)

    if (slide) {
      ref.current.position.y = position[1] - (Math.sin(t * 0.45) * 0.035 + 0.03)
      ref.current.position.x = position[0] + Math.sin(t * 0.8) * 0.006
    }
  })

  return (
    <mesh ref={ref} position={position} scale={scale}>
      <sphereGeometry args={[0.03, 14, 14]} />
      <meshPhysicalMaterial
        color="#f8fdff"
        transparent
        opacity={opacity}
        transmission={0.92}
        roughness={0.04}
      />
    </mesh>
  )
}

function IceCube({
  position,
  rotation = [0, 0, 0],
  size = [0.16, 0.16, 0.16],
  phase = 0,
}) {
  const ref = useRef()

  useFrame((state) => {
    if (!ref.current) return
    const t = state.clock.elapsedTime + phase
    ref.current.position.y = position[1] + Math.sin(t * 1.1) * 0.014
    ref.current.rotation.x = rotation[0] + Math.sin(t * 0.75) * 0.035
    ref.current.rotation.y = rotation[1] + Math.cos(t * 0.85) * 0.035
    ref.current.rotation.z = rotation[2] + Math.sin(t * 0.95) * 0.03
  })

  return (
    <mesh ref={ref} position={position} rotation={rotation}>
      <boxGeometry args={size} />
      <meshPhysicalMaterial
        color="#f3fcff"
        transparent
        opacity={0.44}
        transmission={0.97}
        roughness={0.035}
        clearcoat={1}
      />
    </mesh>
  )
}

function WaterSurface({ isHot }) {
  const ref = useRef()

  useFrame((state) => {
    if (!ref.current) return
    const t = state.clock.elapsedTime
    ref.current.position.y = 0.24 + Math.sin(t * (isHot ? 1.7 : 1.1)) * 0.006
    ref.current.rotation.z = Math.sin(t * (isHot ? 1.0 : 0.8)) * 0.01
    ref.current.scale.x = 1 + Math.sin(t * 1.2) * 0.006
    ref.current.scale.y = 1 + Math.cos(t * 1.0) * 0.005
  })

  return (
    <mesh ref={ref} position={[0, 0.24, 0]} rotation={[-Math.PI / 2, 0, 0]}>
      <circleGeometry args={[0.72, 96]} />
      <meshPhysicalMaterial
        color="#f7fbff"
        transmission={0.72}
        transparent
        opacity={0.6}
        roughness={0.01}
        thickness={0.14}
        ior={1.333}
      />
    </mesh>
  )
}

function WaterBody({ isHot }) {
  const ref = useRef()

  useFrame((state) => {
    if (!ref.current) return
    const t = state.clock.elapsedTime
    ref.current.position.y = -0.32 + Math.sin(t * (isHot ? 1.2 : 0.9)) * 0.004
  })

  return (
    <mesh ref={ref} position={[0, -0.32, 0]} castShadow receiveShadow>
      <cylinderGeometry args={[0.75, 0.68, 1.12, 96]} />
      <meshPhysicalMaterial
        color="#f3f8fd"
        transmission={0.72}
        transparent
        opacity={0.44}
        roughness={0.025}
        thickness={0.24}
        ior={1.333}
        clearcoat={0.8}
        clearcoatRoughness={0.02}
      />
    </mesh>
  )
}

function Meniscus() {
  return (
    <mesh position={[0, 0.235, 0]}>
      <torusGeometry args={[0.71, 0.018, 14, 72]} />
      <meshPhysicalMaterial
        color="#f7fbff"
        transmission={0.8}
        transparent
        opacity={0.34}
        roughness={0.02}
        thickness={0.08}
      />
    </mesh>
  )
}

export function Beaker({
  position = [0, 0, 0],
  rotation = [0, 0, 0],
  type = "hot",
}) {
  const isHot = type === "hot"
  const frostRef = useRef()
  const mistRef = useRef()

  const marks = useMemo(() => [0.58, 0.34, 0.1, -0.14, -0.38, -0.62], [])

  useFrame((state) => {
    const t = state.clock.elapsedTime
    if (frostRef.current && !isHot) {
      frostRef.current.material.opacity = 0.11 + Math.sin(t * 1.5) * 0.016
    }
    if (mistRef.current && !isHot) {
      mistRef.current.material.opacity = 0.08 + Math.sin(t * 1.25 + 0.4) * 0.012
    }
  })

  return (
    <group position={position} rotation={rotation}>
      {/* Kính ngoài */}
      <mesh castShadow receiveShadow>
        <cylinderGeometry args={[0.84, 0.77, 1.92, 96, 1, true]} />
        <meshPhysicalMaterial
          color="#dde6ef"
          transmission={0.72}
          transparent
          opacity={0.24}
          roughness={0.045}
          thickness={0.09}
          ior={1.46}
          clearcoat={1}
          clearcoatRoughness={0.025}
          side={THREE.DoubleSide}
        />
      </mesh>

      {/* Kính trong */}
      <mesh scale={[0.92, 0.985, 0.92]}>
        <cylinderGeometry args={[0.84, 0.77, 1.92, 96, 1, true]} />
        <meshPhysicalMaterial
          color="#f4f8fc"
          transmission={0.44}
          transparent
          opacity={0.07}
          roughness={0.08}
          thickness={0.04}
          ior={1.4}
          side={THREE.DoubleSide}
        />
      </mesh>

      {/* Đáy */}
      <mesh position={[0, -0.96, 0]} castShadow receiveShadow>
        <cylinderGeometry args={[0.77, 0.77, 0.08, 96]} />
        <meshPhysicalMaterial
          color="#dce6f2"
          transmission={0.8}
          transparent
          opacity={0.28}
          roughness={0.04}
          thickness={0.16}
          ior={1.46}
          clearcoat={1}
        />
      </mesh>

      {/* Miệng cốc */}
      <mesh position={[0, 0.95, 0]}>
        <cylinderGeometry args={[0.845, 0.81, 0.04, 96, 1, true]} />
        <meshPhysicalMaterial
          color="#eef4fa"
          transparent
          opacity={0.18}
          transmission={0.52}
          roughness={0.04}
          thickness={0.04}
          ior={1.46}
          side={THREE.DoubleSide}
        />
      </mesh>

      {/* Vòi rót */}
      <mesh position={[0.79, 0.89, 0]} rotation={[0, 0, -0.42]} castShadow>
        <boxGeometry args={[0.15, 0.04, 0.07]} />
        <meshStandardMaterial color="#e4ecf3" roughness={0.18} metalness={0.05} />
      </mesh>

      {/* Nước */}
      <WaterBody isHot={isHot} />
      <WaterSurface isHot={isHot} />
      <Meniscus />

      {/* Highlight kính */}
      <mesh position={[-0.2, -0.02, 0.75]}>
        <planeGeometry args={[0.06, 1.52]} />
        <meshBasicMaterial color="#ffffff" transparent opacity={0.13} />
      </mesh>

      <mesh position={[0.15, 0.05, 0.745]}>
        <planeGeometry args={[0.03, 1.36]} />
        <meshBasicMaterial color="#ffffff" transparent opacity={0.08} />
      </mesh>

      {/* Vạch chia */}
      {marks.map((y, i) => (
        <mesh key={`mark-${i}`} position={[-0.22, y, 0.748]}>
          <boxGeometry args={[i % 2 === 0 ? 0.18 : 0.12, 0.018, 0.01]} />
          <meshBasicMaterial color="#f7fbff" transparent opacity={0.5} />
        </mesh>
      ))}

      {/* Nhãn */}
      <mesh position={[0.28, 0.05, 0.748]}>
        <planeGeometry args={[0.25, 0.2]} />
        <meshBasicMaterial color="#ffffff" transparent opacity={0.3} />
      </mesh>

      {/* Hơi nóng kiểu sợi */}
      {isHot && (
        <>
          <SteamThread x={-0.16} z={0.02} phase={0.0} height={0.0} width={0.085} opacity={0.11} />
          <SteamThread x={0.02} z={-0.01} phase={0.8} height={0.08} width={0.075} opacity={0.09} />
          <SteamThread x={0.18} z={0.01} phase={1.5} height={-0.02} width={0.07} opacity={0.08} />

          <SteamCloud position={[-0.08, 1.08, 0.02]} scale={0.9} phase={0.0} opacity={0.05} />
          <SteamCloud position={[0.1, 1.18, -0.01]} scale={0.75} phase={0.9} opacity={0.045} />

          <mesh position={[0, 0.96, 0]} rotation={[-Math.PI / 2, 0, 0]}>
            <circleGeometry args={[0.77, 48]} />
            <meshBasicMaterial color="#ffffff" transparent opacity={0.04} depthWrite={false} />
          </mesh>
        </>
      )}

            {/* Cốc lạnh */}
      {!isHot && (
        <>
          {/* Cụm đá viên nhiều hơn, nổi gần mặt nước */}
          <IceCube
            position={[-0.22, 0.18, 0.14]}
            rotation={[0.22, 0.1, 0.16]}
            size={[0.2, 0.2, 0.2]}
            phase={0.0}
          />
          <IceCube
            position={[-0.08, 0.24, 0.05]}
            rotation={[0.08, -0.12, 0.1]}
            size={[0.17, 0.17, 0.17]}
            phase={0.5}
          />
          <IceCube
            position={[0.08, 0.22, -0.02]}
            rotation={[0.1, -0.18, 0.08]}
            size={[0.18, 0.18, 0.18]}
            phase={1.0}
          />
          <IceCube
            position={[0.22, 0.16, 0.1]}
            rotation={[-0.06, 0.14, -0.04]}
            size={[0.16, 0.16, 0.16]}
            phase={1.4}
          />
          <IceCube
            position={[-0.16, 0.08, -0.08]}
            rotation={[0.14, 0.08, -0.12]}
            size={[0.15, 0.15, 0.15]}
            phase={1.8}
          />
          <IceCube
            position={[0.0, 0.12, 0.12]}
            rotation={[-0.08, 0.14, -0.06]}
            size={[0.16, 0.16, 0.16]}
            phase={2.3}
          />
          <IceCube
            position={[0.16, 0.06, -0.12]}
            rotation={[0.12, -0.08, 0.16]}
            size={[0.14, 0.14, 0.14]}
            phase={2.8}
          />
          <IceCube
            position={[-0.02, 0.28, -0.04]}
            rotation={[0.04, 0.2, -0.08]}
            size={[0.15, 0.15, 0.15]}
            phase={3.2}
          />
          <IceCube
            position={[0.26, 0.24, 0.02]}
            rotation={[-0.1, 0.06, 0.12]}
            size={[0.13, 0.13, 0.13]}
            phase={3.7}
          />

          {/* Nhiều giọt hơn */}
          <CondensationDrop position={[-0.3, 0.66, 0.76]} phase={0.0} />
          <CondensationDrop position={[-0.22, 0.5, 0.76]} scale={0.95} phase={0.4} />
          <CondensationDrop position={[-0.14, 0.34, 0.76]} scale={0.75} phase={0.8} />
          <CondensationDrop position={[0.0, 0.58, 0.76]} scale={0.82} phase={1.2} />
          <CondensationDrop position={[0.14, 0.3, 0.76]} phase={1.8} />
          <CondensationDrop position={[0.28, 0.06, 0.76]} scale={0.88} phase={2.2} />
          <CondensationDrop position={[-0.1, -0.08, 0.76]} scale={0.78} slide phase={1.7} />
          <CondensationDrop position={[0.1, -0.28, 0.76]} scale={0.72} slide phase={2.6} />
          <CondensationDrop position={[0.22, -0.18, 0.76]} scale={0.68} slide phase={3.0} />

          {/* Loang sương ngoài cốc */}
          <mesh ref={frostRef} position={[0, 0.1, 0.742]}>
            <planeGeometry args={[1.14, 1.5]} />
            <meshBasicMaterial color="#f7fcff" transparent opacity={0.11} depthWrite={false} />
          </mesh>

          <mesh ref={mistRef} position={[0.02, -0.02, 0.741]}>
            <planeGeometry args={[0.96, 1.08]} />
            <meshBasicMaterial color="#eef8ff" transparent opacity={0.08} depthWrite={false} />
          </mesh>
        </>
      )}
    </group>
  )
}