import React, { useMemo, useRef } from "react"
import { useFrame } from "@react-three/fiber"
import { useGLTF } from "@react-three/drei"
import * as THREE from "three"

// ==========================================
// 1. HIỆU ỨNG HƠI NƯỚC (BAY LÊN & TAN BIẾN)
// ==========================================
function SteamCloud({ position, scale = 1, phase = 0, speed = 0.8, lifespan = 2.5, maxOpacity = 0.15 }) {
  const ref = useRef()
  
  useFrame((state) => {
    if (!ref.current) return
    const rawT = state.clock.elapsedTime + phase
    const cycle = rawT % lifespan 
    const progress = cycle / lifespan 

    ref.current.position.x = position[0] + Math.sin(rawT * 2.5) * 0.04
    ref.current.position.y = position[1] + (progress * speed)
    ref.current.position.z = position[2] + Math.cos(rawT * 1.8) * 0.03

    const currentScale = scale * (0.5 + progress * 1.2)
    ref.current.scale.setScalar(currentScale)

    ref.current.material.opacity = Math.sin(progress * Math.PI) * maxOpacity
  })

  return (
    <mesh ref={ref} position={position} scale={scale}>
      <sphereGeometry args={[0.12, 16, 16]} />
      <meshBasicMaterial color="#ffffff" transparent depthWrite={false} />
    </mesh>
  )
}

// ==========================================
// 2. HIỆU ỨNG ĐÁ VIÊN & GIỌT NƯỚC NGƯNG TỤ (GIỮ NGUYÊN)
// ==========================================
function CondensationDrop({ angle, yOffset, radius, scale = 1, opacity = 0.4, slide = false, phase = 0 }) {
  const ref = useRef()

  // Dùng lượng giác để giọt nước luôn nằm chính xác trên viền ngoài của hình trụ (cốc nước)
  const x = Math.cos(angle) * (radius + 0.015)
  const z = Math.sin(angle) * (radius + 0.015)

  useFrame((state) => {
    if (!ref.current) return
    const t = state.clock.elapsedTime + phase
    ref.current.material.opacity = opacity * (0.8 + Math.sin(t * 2.1) * 0.1)

    // Nếu là giọt nước chảy, nó sẽ trượt lên xuống quanh vị trí yOffset
    if (slide) {
      ref.current.position.y = yOffset - (Math.sin(t * 0.45) * 0.035 + 0.03)
    }
  })

  return (
    <mesh ref={ref} position={[x, yOffset, z]} scale={scale}>
      <sphereGeometry args={[0.02, 14, 14]} />
      {/* Đổi sang BasicMaterial màu trắng để khắc phục lỗi chấm đen */}
      <meshBasicMaterial color="#ffffff" transparent opacity={opacity} depthWrite={false} />
    </mesh>
  )
}

function IceCube({ position, rotation = [0, 0, 0], size = [0.16, 0.16, 0.16], phase = 0 }) {
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
      {/* Khắc phục lỗi cục đá đen sì */}
      <meshBasicMaterial color="#ffffff" transparent opacity={0.3} depthWrite={false} />
    </mesh>
  )
}

// ==========================================
// 3. KHỐI NƯỚC & MẶT NƯỚC (TRONG SUỐT)
// ==========================================
function WaterSurface({ isHot, radius, xOffset, yOffset, zOffset }) {
  const ref = useRef()
  useFrame((state) => {
    if (!ref.current) return
    const t = state.clock.elapsedTime
    ref.current.position.y = yOffset + Math.sin(t * (isHot ? 1.7 : 1.1)) * 0.006
    ref.current.rotation.z = Math.sin(t * (isHot ? 1.0 : 0.8)) * 0.01
    ref.current.scale.x = 1 + Math.sin(t * 1.2) * 0.006
    ref.current.scale.y = 1 + Math.cos(t * 1.0) * 0.005
  })

  return (
    <mesh ref={ref} position={[xOffset, yOffset, zOffset]} rotation={[-Math.PI / 2, 0, 0]}>
      <circleGeometry args={[radius, 64]} />
      <meshPhysicalMaterial 
        color={isHot ? "#fffcf9" : "#f0f8ff"} 
        transparent={true} 
        opacity={0.15} 
        roughness={0.02} 
        side={THREE.DoubleSide}
        depthWrite={false} 
      />
    </mesh>
  )
}

function WaterBody({ isHot, radius, height, xOffset, yOffset, zOffset }) {
  const ref = useRef()
  useFrame((state) => {
    if (!ref.current) return
    const t = state.clock.elapsedTime
    ref.current.position.y = yOffset + Math.sin(t * (isHot ? 1.2 : 0.9)) * 0.004
  })

  return (
    <mesh ref={ref} position={[xOffset, yOffset, zOffset]}>
      <cylinderGeometry args={[radius, radius, height, 64]} />
      <meshPhysicalMaterial 
        color={isHot ? "#fffcf9" : "#f0f8ff"} 
        transparent={true} 
        opacity={0.08} 
        roughness={0.05} 
        depthWrite={false} 
      />
    </mesh>
  )
}

// ==========================================
// 4. COMPONENT BEAKER CHÍNH
// ==========================================
export function Beaker({
  position = [0, 0, 0],
  rotation = [0, 0, 0],
  type = "hot",
}) {
  const isHot = type === "hot"
  const frostRef = useRef()
  const mistRef = useRef()

  const { scene } = useGLTF("/models/beaker/scene.gltf")  
  
  const glassBeaker = useMemo(() => {
    const targetMesh = scene.getObjectByName("1000_mL_Beaker_5") 
    if (targetMesh) {
      const clonedPart = targetMesh.clone() 
      clonedPart.castShadow = true
      clonedPart.receiveShadow = true
      clonedPart.material = new THREE.MeshPhysicalMaterial({
        color: "#dde6ef",
        transmission: 0.72,
        transparent: true,
        opacity: 0.24,
        roughness: 0.045,
        ior: 1.46,
        clearcoat: 1,
        clearcoatRoughness: 0.025,
        side: THREE.DoubleSide
      })
      return clonedPart
    }
    return scene.clone()
  }, [scene])

  // === THÔNG SỐ CĂN CHỈNH NƯỚC BÊN TRONG CỐC GLTF ===
  const waterRadius = 0.73  
  const waterHeight = 1.12  
  const waterCenterX = 0.0  
  const waterCenterY = -0.32 
  const waterCenterZ = -0.22 

  useFrame((state) => {
    const t = state.clock.elapsedTime
    if (frostRef.current && !isHot) {
      frostRef.current.material.opacity = 0.08 + Math.sin(t * 1.5) * 0.02
    }
    if (mistRef.current && !isHot) {
      mistRef.current.material.opacity = 0.08 + Math.sin(t * 1.25 + 0.4) * 0.012
    }
  })

  return (
    <group position={position} rotation={rotation}>
      
      {/* CỐC KÍNH */}
      <primitive object={glassBeaker} scale={[15,15, 15]} /> 

      {/* NƯỚC */}
      <WaterBody 
        isHot={isHot} 
        radius={waterRadius} 
        height={waterHeight} 
        xOffset={waterCenterX}
        yOffset={waterCenterY} 
        zOffset={waterCenterZ}
      />
      <WaterSurface 
        isHot={isHot} 
        radius={waterRadius} 
        xOffset={waterCenterX}
        yOffset={waterCenterY + (waterHeight / 2)} 
        zOffset={waterCenterZ}
      />

      {/* HIỆU ỨNG NÓNG */}
      {isHot && (
        <>
          <SteamCloud position={[waterCenterX - 0.1, waterCenterY + waterHeight, waterCenterZ + 0.05]} scale={0.8} phase={0.0} speed={0.8} lifespan={2.5} maxOpacity={0.12} />
          <SteamCloud position={[waterCenterX + 0.15, waterCenterY + waterHeight - 0.1, waterCenterZ - 0.05]} scale={1.0} phase={0.8} speed={0.9} lifespan={2.8} maxOpacity={0.15} />
          <SteamCloud position={[waterCenterX, waterCenterY + waterHeight, waterCenterZ]} scale={0.7} phase={1.5} speed={1.1} lifespan={2.2} maxOpacity={0.1} />
          <SteamCloud position={[waterCenterX - 0.05, waterCenterY + waterHeight + 0.1, waterCenterZ - 0.1]} scale={0.9} phase={2.1} speed={0.7} lifespan={3.0} maxOpacity={0.14} />
        </>
      )}

      {/* HIỆU ỨNG LẠNH */}
      {!isHot && (
        <>
          {/* Bọc đá và giọt nước vào group để chúng đi theo tọa độ X, Z của khối nước */}
          <group position={[waterCenterX, 0, waterCenterZ]}>
          
          {/* Cụm đá viên */}
          <IceCube position={[-0.22, waterCenterY + 0.35, 0.14]} rotation={[0.22, 0.1, 0.16]} size={[0.2, 0.2, 0.2]} phase={0.0} />
          <IceCube position={[-0.08, waterCenterY + 0.4, 0.05]} rotation={[0.08, -0.12, 0.1]} size={[0.17, 0.17, 0.17]} phase={0.5} />
          <IceCube position={[0.08, waterCenterY + 0.38, -0.02]} rotation={[0.1, -0.18, 0.08]} size={[0.18, 0.18, 0.18]} phase={1.0} />
          <IceCube position={[0.22, waterCenterY + 0.3, 0.1]} rotation={[-0.06, 0.14, -0.04]} size={[0.16, 0.16, 0.16]} phase={1.4} />

            {/* Giọt nước đọng trên kính - Được rải đều theo góc (angle) quanh cốc */}
          <CondensationDrop angle={0.2} radius={waterRadius} yOffset={waterCenterY + 0.2} phase={0.0} />
          <CondensationDrop angle={0.8} radius={waterRadius} yOffset={waterCenterY + 0.4} scale={0.8} phase={0.4} />
          <CondensationDrop angle={1.5} radius={waterRadius} yOffset={waterCenterY + 0.1} slide phase={1.2} />
          <CondensationDrop angle={2.2} radius={waterRadius} yOffset={waterCenterY + 0.3} scale={0.9} phase={1.8} />
          <CondensationDrop angle={2.8} radius={waterRadius} yOffset={waterCenterY + 0.5} phase={2.2} />
          <CondensationDrop angle={-0.5} radius={waterRadius} yOffset={waterCenterY + 0.15} slide phase={2.6} />
          </group>

          {/* SƯƠNG LẠNH DẠNG HÌNH TRỤ ỐP VÀO KÍNH */}
          <mesh 
            ref={frostRef} 
            position={[0, waterCenterY, -0.22]} 
          >
            {/* Chiều cao sương bằng chính chiều cao khối nước, bán kính to hơn nước một tí xíu */}
            <cylinderGeometry args={[waterRadius + 0.01, waterRadius + 0.01, waterHeight, 48, 1, true]} />
            <meshBasicMaterial color="#ffffff" transparent opacity={0.06} depthWrite={false} side={THREE.DoubleSide} />
          </mesh>

          {/* SƯƠNG LAN TỎA DƯỚI ĐÁY CỐC (Đã sửa lỗi hình chữ nhật đứng) */}
          <mesh 
            ref={mistRef} 
            position={[0, waterCenterY - (waterHeight / 2) + 0.02, -0.22]} 
            rotation={[-Math.PI / 2, 0, 0]} // Xoay ngang ra
          >
            <circleGeometry args={[waterRadius + 0.2, 48]} />
            <meshBasicMaterial color="#eef8ff" transparent opacity={0.05} depthWrite={false} />
          </mesh>
        </>
      )}
    </group>
  )
}

useGLTF.preload("/models/beaker/scene.gltf")