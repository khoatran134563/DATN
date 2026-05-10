import React, { useEffect, useMemo, useState } from "react"
import * as THREE from "three"
import { Canvas, useFrame } from "@react-three/fiber"
import { ContactShadows, Environment, OrbitControls } from "@react-three/drei"

import {
  CAMERA_POS,
  DRAG_BOUNDS,
  NAOH_BOTTLE_POS,
  PHENOL_BOTTLE_POS,
  PIPETTE_HOME_OFFSET,
  PIPETTE_TIP_OFFSET,
  TEST_TUBE_LIQUID_OFFSET,
  TEST_TUBE_MOUTH_OFFSET,
  TEST_TUBE_POS,
} from "./constants"

import { clamp, getLoadedLiquidColor } from "./logic"
import Bench from "./objects/Bench"
import Labels3D from "./objects/Labels3D"
import TestTube from "./objects/TestTube"
import ReagentBottle from "./objects/ReagentBottle"
import Pipette from "./objects/Pipette"
import Droplet from "./objects/Droplet"

function DragPipette({ dragging, setPosition, z = 0 }) {
  const planeRef = React.useRef(new THREE.Plane(new THREE.Vector3(0, 0, 1), 0))
  const rayRef = React.useRef(new THREE.Ray())
  const pointRef = React.useRef(new THREE.Vector3())

  useFrame(({ camera, mouse }) => {
    if (!dragging) return

    const ray = rayRef.current
    const point = pointRef.current

    ray.origin.copy(camera.position)
    ray.direction.set(mouse.x, mouse.y, 0.5).unproject(camera).sub(camera.position).normalize()
    ray.intersectPlane(planeRef.current, point)

    setPosition([
      clamp(point.x, DRAG_BOUNDS.minX, DRAG_BOUNDS.maxX),
      clamp(point.y, DRAG_BOUNDS.minY, DRAG_BOUNDS.maxY),
      z,
    ])
  })

  return null
}

function SceneWorld({
  loadedBottle,
  loadedLiquidColor,
  tubeColor,
  tubeOpacity,
  setOverTube,
  isSqueezing,
  setIsSqueezing,
  loadBottle,
  releaseDrop,
  commitDrop,
  spawnToken,
}) {
  const naohHome = useMemo(
    () => [
      NAOH_BOTTLE_POS.x + PIPETTE_HOME_OFFSET.x,
      NAOH_BOTTLE_POS.y + PIPETTE_HOME_OFFSET.y,
      NAOH_BOTTLE_POS.z + PIPETTE_HOME_OFFSET.z,
    ],
    []
  )

  const phenolHome = useMemo(
    () => [
      PHENOL_BOTTLE_POS.x + PIPETTE_HOME_OFFSET.x,
      PHENOL_BOTTLE_POS.y + PIPETTE_HOME_OFFSET.y,
      PHENOL_BOTTLE_POS.z + PIPETTE_HOME_OFFSET.z,
    ],
    []
  )

  const [naohPipettePos, setNaohPipettePos] = useState(naohHome)
  const [phenolPipettePos, setPhenolPipettePos] = useState(phenolHome)

  const [dragging, setDragging] = useState(null)
  const [drops, setDrops] = useState([])

  const tubeMouth = useMemo(
    () =>
      new THREE.Vector3(
        TEST_TUBE_POS.x + TEST_TUBE_MOUTH_OFFSET.x,
        TEST_TUBE_POS.y + TEST_TUBE_MOUTH_OFFSET.y,
        TEST_TUBE_POS.z + TEST_TUBE_MOUTH_OFFSET.z
      ),
    []
  )

  const liquidTarget = useMemo(
    () => [
      TEST_TUBE_POS.x + TEST_TUBE_LIQUID_OFFSET.x,
      TEST_TUBE_POS.y + TEST_TUBE_LIQUID_OFFSET.y,
      TEST_TUBE_POS.z + TEST_TUBE_LIQUID_OFFSET.z,
    ],
    []
  )

  const activePipettePos =
    loadedBottle === "naoh"
      ? naohPipettePos
      : loadedBottle === "phenol"
      ? phenolPipettePos
      : null

  const currentTipPos = activePipettePos
    ? [
        activePipettePos[0] + PIPETTE_TIP_OFFSET.x,
        activePipettePos[1] + PIPETTE_TIP_OFFSET.y,
        activePipettePos[2] + PIPETTE_TIP_OFFSET.z,
      ]
    : null

  useFrame(() => {
    if (!currentTipPos) {
      setOverTube(false)
      return
    }

    const tip = new THREE.Vector3(...currentTipPos)
    setOverTube(tip.distanceTo(tubeMouth) < 0.55)
  })

  useEffect(() => {
    if (!spawnToken || !loadedBottle || !currentTipPos) return

    setDrops((prev) => [
      ...prev,
      {
        id: `${loadedBottle}-${spawnToken}-${Date.now()}`,
        type: loadedBottle,
        start: currentTipPos,
        color: getLoadedLiquidColor(loadedBottle),
      },
    ])
  }, [spawnToken, loadedBottle, currentTipPos])

  const removeDrop = (id) => {
    setDrops((prev) => prev.filter((d) => d.id !== id))
  }

  const handlePickUp = (type) => {
    loadBottle(type)
    setDragging(type)
  }

  const handleReleaseTool = (type) => {
    setDragging(null)

    if (type === "naoh") {
      setNaohPipettePos(naohHome)
    } else {
      setPhenolPipettePos(phenolHome)
    }
  }

  const handleSqueezeStart = (type) => {
    if (loadedBottle !== type) loadBottle(type)
    setIsSqueezing(true)
  }

  const handleSqueezeEnd = () => {
    setIsSqueezing(false)
    releaseDrop()
  }

  return (
    <>
      <color attach="background" args={["#313946"]} />
      <fog attach="fog" args={["#313946", 8, 14]} />

      <ambientLight intensity={0.9} />
      <directionalLight position={[4, 5, 3]} intensity={1.15} castShadow />
      <pointLight position={[0, 3, 3]} intensity={0.55} />

      <Bench />
      <Labels3D />

      <TestTube
        position={[TEST_TUBE_POS.x, TEST_TUBE_POS.y, TEST_TUBE_POS.z]}
        liquidColor={tubeColor}
        liquidOpacity={tubeOpacity}
        highlight={false}
      />

      <ReagentBottle
        label="NaOH"
        position={[NAOH_BOTTLE_POS.x, NAOH_BOTTLE_POS.y, NAOH_BOTTLE_POS.z]}
        bodyColor="#7a5825"
      />

      <ReagentBottle
        label="Phenol"
        position={[PHENOL_BOTTLE_POS.x, PHENOL_BOTTLE_POS.y, PHENOL_BOTTLE_POS.z]}
        bodyColor="#6b4520"
      />

      <Pipette
        type="naoh"
        position={naohPipettePos}
        loaded={loadedBottle === "naoh"}
        loadedColor={getLoadedLiquidColor("naoh")}
        isHeld={dragging === "naoh"}
        isSqueezing={isSqueezing && loadedBottle === "naoh"}
        onPickUp={handlePickUp}
        onRelease={handleReleaseTool}
        onSqueezeStart={handleSqueezeStart}
        onSqueezeEnd={handleSqueezeEnd}
      />

      <Pipette
        type="phenol"
        position={phenolPipettePos}
        loaded={loadedBottle === "phenol"}
        loadedColor={getLoadedLiquidColor("phenol")}
        isHeld={dragging === "phenol"}
        isSqueezing={isSqueezing && loadedBottle === "phenol"}
        onPickUp={handlePickUp}
        onRelease={handleReleaseTool}
        onSqueezeStart={handleSqueezeStart}
        onSqueezeEnd={handleSqueezeEnd}
      />

      <DragPipette
        dragging={dragging === "naoh"}
        setPosition={setNaohPipettePos}
      />
      <DragPipette
        dragging={dragging === "phenol"}
        setPosition={setPhenolPipettePos}
      />

      {drops.map((drop) => (
        <Droplet
          key={drop.id}
          start={drop.start}
          target={liquidTarget}
          color={drop.color}
          liquidType={drop.type}
          onHit={(type) => commitDrop(type)}
          onDone={() => removeDrop(drop.id)}
        />
      ))}

      <ContactShadows
        position={[0, -1.05, 0]}
        opacity={0.45}
        scale={8}
        blur={2.4}
        far={4.5}
      />

      <Environment preset="city" />
      <OrbitControls
        enablePan={false}
        enableRotate={false}
        minDistance={5}
        maxDistance={7}
        minPolarAngle={Math.PI / 2.2}
        maxPolarAngle={Math.PI / 2.2}
      />
    </>
  )
}

export default function Scene(props) {
  return (
    <div className="w-full h-[680px]">
      <Canvas shadows camera={{ position: CAMERA_POS, fov: 40 }}>
        <SceneWorld {...props} />
      </Canvas>
    </div>
  )
}