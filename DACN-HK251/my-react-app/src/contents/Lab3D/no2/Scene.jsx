import React, { useEffect, useRef, useState } from "react"
import { Environment, OrbitControls, ContactShadows } from "@react-three/drei"
import { useFrame } from "@react-three/fiber"
import * as THREE from "three"
import { Beaker } from "./Beaker"
import { TestTube } from "./TestTube"
import { Clamp } from "./Clamp"

const HOT_POS = new THREE.Vector3(-1.95, -0.42, 0.02)
const COLD_POS = new THREE.Vector3(1.95, -0.42, 0.02)

const TUBE_HOME = new THREE.Vector3(0.95, 0.58, 0.12)
const CLAMP_HOME = new THREE.Vector3(0.05, 0.85, 0.12)

const HOT_DROP = new THREE.Vector3(-1.78, -0.08, 0.1)
const COLD_DROP = new THREE.Vector3(2.48, -0.08, 0.1)

const HOME_ROT = -0.06
const CARRIED_ROT = -0.04
const HOT_DROP_ROT = -0.45
const COLD_DROP_ROT = -0.45

const CLAMP_IDLE_ROT = 0
const CLAMP_ACTIVE_ROT = Math.PI / 2

export function Scene({ onInfoChange }) {
  const clampGroup = useRef()
  const tubeGroup = useRef()

  const hotModeLightRef = useRef()
  const coldModeLightRef = useRef()
  const fillLightRef = useRef()
  const ambientRef = useRef()
  const keyLightRef = useRef()
  const backLightRef = useRef()

  const draggingRef = useRef(false)
  const holdingRef = useRef(false)
  const clampActivatedRef = useRef(false)
  const slotRef = useRef("home")

  const [dragging, setDragging] = useState(false)
  const [holding, setHolding] = useState(false)
  const [gasIntensity, setGasIntensity] = useState(0.68)
  const gasIntensityRef = useRef(0.68)
  const targetGasRef = useRef(0.68)
  const [mode, setMode] = useState("neutral")
  const [status, setStatus] = useState(
    "Bước 1: Nhấn vào kẹp gỗ. Kẹp sẽ xoay ngang, sau đó đưa đầu nhọn bên phải tới gần cổ ống nghiệm để kẹp."
  )

  useEffect(() => {
    onInfoChange?.({ mode, status })
  }, [mode, status, onInfoChange])

  useEffect(() => {
    if (clampGroup.current) {
      clampGroup.current.position.copy(CLAMP_HOME)
      clampGroup.current.rotation.z = CLAMP_IDLE_ROT
    }
    if (tubeGroup.current) {
      tubeGroup.current.position.copy(TUBE_HOME)
      tubeGroup.current.rotation.z = HOME_ROT
    }
  }, [])

  function getClampTipPoint() {
    if (!clampGroup.current) return new THREE.Vector3()
    const localTip = new THREE.Vector3(0, -1.0, 0)
    localTip.applyAxisAngle(new THREE.Vector3(0, 0, 1), clampGroup.current.rotation.z)
    return clampGroup.current.position.clone().add(localTip)
  }

  function getTubeNeckPoint() {
    if (!tubeGroup.current) return new THREE.Vector3()
    const p = tubeGroup.current.position.clone()
    const rot = tubeGroup.current.rotation.z
    const offset = new THREE.Vector3(0, 1.03, 0).applyAxisAngle(
      new THREE.Vector3(0, 0, 1),
      rot
    )
    return p.add(offset)
  }

  useEffect(() => {
    const handlePointerUp = () => {
      if (!draggingRef.current) return
      draggingRef.current = false
      setDragging(false)

      if (!clampGroup.current || !tubeGroup.current) return

      const clampTip = getClampTipPoint()
      const tubeNeck = getTubeNeckPoint()

      if (!holdingRef.current) {
        if (clampTip.distanceTo(tubeNeck) < 0.42) {
          holdingRef.current = true
          slotRef.current = "carried"
          setHolding(true)
          setStatus("Đã kẹp ống nghiệm. Kéo ống nghiệm lại gần một beaker rồi hạ xuống để thả vào cốc.")
        } else {
          setStatus("Đưa đầu nhọn bên phải của kẹp sát cổ ống nghiệm hơn để kẹp đúng vị trí.")
        }
        return
      }

      const tubePos = tubeGroup.current.position.clone()

      const nearHot =
        Math.abs(tubePos.x - HOT_POS.x) < 0.72 &&
        tubePos.y < HOT_POS.y + 1.15

      const nearCold =
        Math.abs(tubePos.x - COLD_POS.x) < 0.72 &&
        tubePos.y < COLD_POS.y + 1.15

      if (nearHot) {
        holdingRef.current = false
        slotRef.current = "hot"
        setHolding(false)
        setMode("hot")
        targetGasRef.current = 1.0
        setStatus("Ống nghiệm đã vào nước nóng. Quan sát: khí NO₂ đậm màu hơn rõ rệt.")
        return
      }

      if (nearCold) {
        holdingRef.current = false
        slotRef.current = "cold"
        setHolding(false)
        setMode("cold")
        targetGasRef.current = 0.2
        setStatus("Ống nghiệm đã vào nước đá. Quan sát: khí NO₂ nhạt màu hơn rõ rệt.")
        return
      }

      setStatus("Đưa ống nghiệm lại gần beaker hơn và hạ xuống thấp thêm để thả vào cốc.")
    }

    window.addEventListener("pointerup", handlePointerUp)
    return () => window.removeEventListener("pointerup", handlePointerUp)
  }, [])

  const dragTarget = useRef(new THREE.Vector3())

  useFrame((state) => {
    if (!clampGroup.current || !tubeGroup.current) return
    const t = state.clock.elapsedTime

    // Chuyển màu khí mượt trong khoảng 1-2 giây
    const dt = state.clock.getDelta()
    const smoothSpeed = 1.6
    gasIntensityRef.current = THREE.MathUtils.lerp(
      gasIntensityRef.current,
      targetGasRef.current,
      1 - Math.exp(-smoothSpeed * dt)
    )
    if (Math.abs(gasIntensityRef.current - gasIntensity) > 0.002) {
      setGasIntensity(gasIntensityRef.current)
    }

    if (ambientRef.current) {
      ambientRef.current.intensity = 0.34 + Math.sin(t * 0.35) * 0.008
    }
    if (fillLightRef.current) {
      fillLightRef.current.intensity = 0.16 + Math.sin(t * 0.8) * 0.01
    }
    if (keyLightRef.current) {
      keyLightRef.current.intensity = 2.2 + Math.sin(t * 0.45) * 0.04
    }
    if (backLightRef.current) {
      backLightRef.current.intensity = 0.55 + Math.sin(t * 0.65 + 0.3) * 0.03
    }
    if (hotModeLightRef.current) {
      const base = mode === "hot" ? 0.45 : 0.06
      hotModeLightRef.current.intensity = base + Math.sin(t * 2.3) * 0.025
    }
    if (coldModeLightRef.current) {
      const base = mode === "cold" ? 0.42 : 0.06
      coldModeLightRef.current.intensity = base + Math.sin(t * 1.9 + 0.6) * 0.02
    }

    const clampTargetRot = clampActivatedRef.current ? CLAMP_ACTIVE_ROT : CLAMP_IDLE_ROT
    clampGroup.current.rotation.z = THREE.MathUtils.lerp(
      clampGroup.current.rotation.z,
      clampTargetRot,
      0.16
    )

    if (draggingRef.current) {
      const x = THREE.MathUtils.clamp(state.pointer.x * 3.6, -3.2, 3.2)
      const y = THREE.MathUtils.clamp(0.72 + state.pointer.y * 2.25, 0.05, 2.55)

      dragTarget.current.set(x, y, 0.12)
      clampGroup.current.position.lerp(dragTarget.current, 0.18)

      if (holdingRef.current) {
        const carryWobble = Math.sin(t * 10.5) * 0.01

        tubeGroup.current.rotation.z = THREE.MathUtils.lerp(
          tubeGroup.current.rotation.z,
          CARRIED_ROT + carryWobble,
          0.14
        )

        const tip = getClampTipPoint()
        const neckOffset = new THREE.Vector3(0, 1.03, 0).applyAxisAngle(
          new THREE.Vector3(0, 0, 1),
          CARRIED_ROT
        )

        const targetTubePos = tip.clone().sub(neckOffset).add(
          new THREE.Vector3(-0.02, -0.05 + Math.sin(t * 7.0) * 0.004, 0.0)
        )

        tubeGroup.current.position.lerp(targetTubePos, 0.18)
      }

      return
    }

    const clampIdleBob =
      !holdingRef.current && !draggingRef.current && !clampActivatedRef.current
        ? Math.sin(t * 1.3) * 0.012
        : 0

    const tubeIdleBob =
      slotRef.current === "home" && !holdingRef.current && !draggingRef.current
        ? Math.sin(t * 1.2 + 0.7) * 0.012
        : 0

    if (!draggingRef.current && !holdingRef.current && !clampActivatedRef.current) {
      clampGroup.current.position.lerp(
        new THREE.Vector3(CLAMP_HOME.x, CLAMP_HOME.y + clampIdleBob, CLAMP_HOME.z),
        0.06
      )
    }

    if (!holdingRef.current) {
      let targetPos = TUBE_HOME.clone()
      let targetRot = HOME_ROT

      if (slotRef.current === "home") {
        targetPos.y += tubeIdleBob
        targetRot += Math.sin(t * 1.3) * 0.005
      } else if (slotRef.current === "hot") {
        targetPos = HOT_DROP.clone().add(new THREE.Vector3(-0.02, 0.0, 0))
        targetRot = HOT_DROP_ROT + Math.sin(t * 2.8) * 0.003
      } else if (slotRef.current === "cold") {
        targetPos = COLD_DROP.clone().add(new THREE.Vector3(-0.02, 0.0, 0))
        targetRot = COLD_DROP_ROT + Math.sin(t * 2.5 + 0.4) * 0.003
      }

      tubeGroup.current.position.lerp(targetPos, 0.08)
      tubeGroup.current.rotation.z = THREE.MathUtils.lerp(
        tubeGroup.current.rotation.z,
        targetRot,
        0.08
      )
    }
  })

  return (
    <>
      {/* Bàn tối */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -1.28, 0]} receiveShadow>
        <planeGeometry args={[12, 7.5]} />
        <meshStandardMaterial color="#090c12" roughness={0.96} />
      </mesh>

      {/* Vệt phản sáng dưới bàn */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -1.275, -0.18]}>
        <circleGeometry args={[2.9, 64]} />
        <meshBasicMaterial color="#1d2940" transparent opacity={0.1} depthWrite={false} />
      </mesh>

      {/* Nền sau tối hơn */}
      <mesh position={[0, 1.0, -2.85]} receiveShadow>
        <planeGeometry args={[10.4, 6.2]} />
        <meshStandardMaterial color="#202532" roughness={1} />
      </mesh>

      <mesh position={[-5.05, 0.8, -1.4]} rotation={[0, 0.42, 0]}>
        <planeGeometry args={[3.2, 5.6]} />
        <meshStandardMaterial color="#2a3140" roughness={1} />
      </mesh>

      <mesh position={[5.05, 0.8, -1.4]} rotation={[0, -0.42, 0]}>
        <planeGeometry args={[3.2, 5.6]} />
        <meshStandardMaterial color="#2a3140" roughness={1} />
      </mesh>

      {/* Ánh sáng kiểu quay thí nghiệm */}
      <ambientLight ref={ambientRef} intensity={0.34} />
      <hemisphereLight intensity={0.14} color="#cfd9e8" groundColor="#05070b" />

      <directionalLight
        ref={keyLightRef}
        position={[-2.8, 5.8, 3.6]}
        intensity={2.2}
        castShadow
        shadow-mapSize-width={2048}
        shadow-mapSize-height={2048}
      />

      <spotLight
        position={[0.4, 4.8, 3.2]}
        intensity={1.8}
        angle={0.34}
        penumbra={0.65}
        color="#fffdf8"
        castShadow
      />

      <pointLight
        ref={backLightRef}
        position={[0.2, 2.2, -1.3]}
        intensity={0.55}
        color="#b9d4ff"
      />

      <pointLight position={[-2.8, 0.2, 1.1]} intensity={0.18} color="#ffd0aa" />
      <pointLight position={[2.8, 0.2, 1.1]} intensity={0.18} color="#cce7ff" />
      <pointLight ref={fillLightRef} position={[0.8, 1.8, 1.5]} intensity={0.16} color="#ffffff" />

      <pointLight
        ref={hotModeLightRef}
        position={[-1.9, 0.4, 0.7]}
        intensity={mode === "hot" ? 0.45 : 0.06}
        color="#ff9f52"
      />
      <pointLight
        ref={coldModeLightRef}
        position={[1.9, 0.4, 0.7]}
        intensity={mode === "cold" ? 0.42 : 0.06}
        color="#9fdcff"
      />

      <Environment preset="night" />

      {/* Bóng tiếp xúc */}
      <ContactShadows
        position={[0, -1.26, 0]}
        opacity={0.55}
        scale={8}
        blur={2.6}
        far={3.2}
        resolution={1024}
        color="#000000"
      />

      {/* Beakers */}
      <group scale={1.08}>
        <Beaker position={HOT_POS.toArray()} rotation={[0, -0.1, 0]} type="hot" />
      </group>

      <group scale={1.08}>
        <Beaker position={COLD_POS.toArray()} rotation={[0, 0.1, 0]} type="cold" />
      </group>

      {/* Ống nghiệm */}
      <group ref={tubeGroup} scale={0.92}>
        <TestTube gasIntensity={gasIntensity} active={holding} />
      </group>

      {/* Kẹp gỗ */}
      <group
        ref={clampGroup}
        scale={0.74}
        onPointerDown={(e) => {
          e.stopPropagation()
          draggingRef.current = true
          clampActivatedRef.current = true
          setDragging(true)
          setStatus(
            holdingRef.current
              ? "Kéo kẹp gỗ tới beaker cần nhúng."
              : "Kẹp đã xoay ngang. Đưa đầu nhọn bên phải vào gần cổ ống nghiệm."
          )
        }}
      >
        <Clamp active={dragging || holding} />
      </group>

      <mesh position={[0, 0.4, 0]} visible={false}>
        <planeGeometry args={[14, 8]} />
        <meshBasicMaterial transparent opacity={0} />
      </mesh>

      <OrbitControls
        enablePan={false}
        enableRotate={false}
        minDistance={7}
        maxDistance={10}
        target={[0, 0.04, 0]}
      />
    </>
  )
}