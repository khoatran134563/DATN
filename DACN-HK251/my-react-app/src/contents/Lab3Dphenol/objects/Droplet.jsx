import React, { useEffect, useMemo, useRef } from "react"
import * as THREE from "three"
import { useFrame } from "@react-three/fiber"

export default function Droplet({
  start = [0, 0, 0],
  target = [0, 0, 0],
  color = "#60a5fa",
  liquidType,
  onHit,
  onDone,
}) {
  const ref = useRef()
  const targetVec = useMemo(() => new THREE.Vector3(...target), [target])

  useEffect(() => {
    if (ref.current) {
      ref.current.position.set(start[0], start[1], start[2])
    }
  }, [start])

  useFrame((_, delta) => {
    if (!ref.current) return

    ref.current.position.y -= delta * 1.9
    ref.current.scale.x = 0.9
    ref.current.scale.y = 1.15
    ref.current.scale.z = 0.9

    if (ref.current.position.distanceTo(targetVec) < 0.08) {
      onHit?.(liquidType)
      onDone?.()
    }

    if (ref.current.position.y < targetVec.y - 0.4) {
      onDone?.()
    }
  })

  return (
    <mesh ref={ref} castShadow>
      <sphereGeometry args={[0.045, 16, 16]} />
      <meshStandardMaterial color={color} emissive={color} emissiveIntensity={0.3} />
    </mesh>
  )
}