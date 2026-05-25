import React, { useEffect, useMemo, useState } from "react"
import * as THREE from "three"
import { Canvas, useFrame } from "@react-three/fiber"
import { ContactShadows, Environment, OrbitControls } from "@react-three/drei"
import { Suspense } from 'react';

import {
  CAMERA_POS,
  DRAG_BOUNDS,
  HCL_BOTTLE_POS,
  PHENOL_BOTTLE_POS,
  PIPETTE_HOME_OFFSET,
  PIPETTE_TIP_OFFSET,
  STAND_POS,
  BURETTE_POS,
  BURETTE_TIP_POS,
  FLASK_POS,
  FLASK_MOUTH_OFFSET,
} from "./constants"

import { clamp, getLoadedLiquidColor } from "./logic"
import Bench from "./objects/Bench"
import Labels3D from "./objects/Labels3D"
import ReagentBottle from "./objects/ReagentBottle"
import Pipette from "./objects/Pipette"
import Droplet from "./objects/Droplet"

import BuretteStand from "./objects/BuretteStand"
import Burette from "./objects/Burette"
import ConicalFlask from "./objects/ConicalFlask"

function DragPipette({ dragging, type, pipettePos, setPosition, flaskPos }) {
  const planeRef = React.useRef(new THREE.Plane(new THREE.Vector3(0, 0, 1), 0))
  const rayRef = React.useRef(new THREE.Ray())
  const pointRef = React.useRef(new THREE.Vector3())
  const currentPosRef = React.useRef(new THREE.Vector3())

  const bottleTarget = React.useMemo(() => {
    const bottlePos = type === "hcl" ? HCL_BOTTLE_POS : PHENOL_BOTTLE_POS
    return new THREE.Vector3(
      bottlePos.x + PIPETTE_HOME_OFFSET.x,
      bottlePos.y + PIPETTE_HOME_OFFSET.y,
      bottlePos.z + PIPETTE_HOME_OFFSET.z
    )
  }, [type])

  useFrame(({ camera, mouse }, delta) => {
    if (dragging) {
      const ray = rayRef.current
      const point = pointRef.current
      ray.origin.copy(camera.position)
      ray.direction.set(mouse.x, mouse.y, 0.5).unproject(camera).sub(camera.position).normalize()
      ray.intersectPlane(planeRef.current, point)

      setPosition([
        Math.max(DRAG_BOUNDS.minX, Math.min(DRAG_BOUNDS.maxX, point.x)),
        Math.max(DRAG_BOUNDS.minY, Math.min(DRAG_BOUNDS.maxY, point.y)),
        0.5 
      ])
    } else {
      currentPosRef.current.set(pipettePos[0], pipettePos[1], pipettePos[2])
      const flaskTarget = new THREE.Vector3(flaskPos[0], flaskPos[1] + 1.8, flaskPos[2])

      const distToBottle = currentPosRef.current.distanceTo(bottleTarget)
      const distToFlask = currentPosRef.current.distanceTo(flaskTarget)

      let activeTarget = null
      let minDistance = Infinity

      if (distToBottle < 0.8) {
        activeTarget = bottleTarget
        minDistance = distToBottle
      } else if (distToFlask < 1.0) {
        activeTarget = flaskTarget
        minDistance = distToFlask
      }

      if (activeTarget && minDistance > 0.001) {
        if (minDistance < 0.05) {
          currentPosRef.current.copy(activeTarget)
          setPosition([activeTarget.x, activeTarget.y, activeTarget.z])
        } else {
          currentPosRef.current.lerp(activeTarget, 10 * delta)
          setPosition([
            currentPosRef.current.x, 
            currentPosRef.current.y, 
            currentPosRef.current.z
          ])
        }
      }
    }
  })

  return null
}

function DragFlask({ dragging, flaskPos, setPosition }) {
  const planeRef = React.useRef(new THREE.Plane(new THREE.Vector3(0, 0, 1), 0))
  const rayRef = React.useRef(new THREE.Ray())
  const pointRef = React.useRef(new THREE.Vector3())
  const currentPosRef = React.useRef(new THREE.Vector3())

  useFrame(({ camera, mouse }, delta) => {
    if (dragging) {
      const ray = rayRef.current
      const point = pointRef.current
      ray.origin.copy(camera.position)
      ray.direction.set(mouse.x, mouse.y, 0.5).unproject(camera).sub(camera.position).normalize()
      ray.intersectPlane(planeRef.current, point)

      setPosition([
        Math.max(DRAG_BOUNDS.minX, Math.min(DRAG_BOUNDS.maxX, point.x)),
        FLASK_POS.y, 
        FLASK_POS.z,
      ])
    } else {
      currentPosRef.current.set(flaskPos[0], flaskPos[1], flaskPos[2])
      const distance = currentPosRef.current.distanceTo(FLASK_POS)

      if (distance < 0.25 && distance > 0.001) {
        currentPosRef.current.lerp(FLASK_POS, 10 * delta) 
        setPosition([
          currentPosRef.current.x, 
          currentPosRef.current.y, 
          currentPosRef.current.z
        ])
      }
    }
  })

  return null
}

function SceneWorld({
  hclDrops,
  naohDrops,          
  phenolDrops,
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
  const hclHome = useMemo(
    () => [
      HCL_BOTTLE_POS.x + PIPETTE_HOME_OFFSET.x,
      HCL_BOTTLE_POS.y + PIPETTE_HOME_OFFSET.y,
      HCL_BOTTLE_POS.z + PIPETTE_HOME_OFFSET.z,
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

  const [hclPipettePos, setHclPipettePos] = useState(hclHome)
  const [phenolPipettePos, setPhenolPipettePos] = useState(phenolHome)

  const [dragging, setDragging] = useState(null)
  const [drops, setDrops] = useState([])
  const [isBuretteFlowing, setIsBuretteFlowing] = useState(false);
  const [flaskPos, setFlaskPos] = useState([FLASK_POS.x, FLASK_POS.y, FLASK_POS.z])

  const handleToggleHold = (type) => {
    if (dragging === type) {
      setDragging(null)
    } else {
      if (type === "hcl" || type === "phenol") {
        loadBottle(type)
      }
      setDragging(type)
    }
  }

  // THE NEW TOGGLE HANDLER
  const handleBuretteClick = () => {
    setIsBuretteFlowing((prev) => !prev);
  };

  // THE CONTINUOUS STREAM ENGINE
  useEffect(() => {
    let interval;
    if (isBuretteFlowing) {
      interval = setInterval(() => {
        setDrops((prev) => [
          ...prev,
          {
            // We add Math.random() to the ID so React doesn't get confused 
            // by multiple drops spawning in the exact same millisecond!
            id: `burette-${Date.now()}-${Math.random()}`, 
            type: "naoh",
            start: [BURETTE_TIP_POS.x, BURETTE_TIP_POS.y, BURETTE_TIP_POS.z],
            color: "#e5e7eb",
          },
        ]);
      }, 200); // 200ms = 5 drops per second
    }
    
    // Cleanup function automatically kills the interval when the valve closes
    return () => clearInterval(interval); 
  }, [isBuretteFlowing]);

  const tubeMouth = useMemo(
    () => new THREE.Vector3(
        flaskPos[0] + FLASK_MOUTH_OFFSET.x,
        flaskPos[1] + FLASK_MOUTH_OFFSET.y,
        flaskPos[2] + FLASK_MOUTH_OFFSET.z
      ),
    [flaskPos]
  )

  const liquidTarget = useMemo(
    () => [
      flaskPos[0],
      flaskPos[1] + 0.1, 
      flaskPos[2]
    ],
    [flaskPos]
  )

  const handleBuretteDrop = () => {
    setDrops((prev) => [
      ...prev,
      {
        id: `burette-${Date.now()}`,
        type: "naoh",
        start: [BURETTE_TIP_POS.x, BURETTE_TIP_POS.y, BURETTE_TIP_POS.z],
        color: "#e5e7eb",
      },
    ])
  }

  const activePipettePos =
    loadedBottle === "hcl"
      ? hclPipettePos
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
  }, [spawnToken])

  const removeDrop = (id) => {
    setDrops((prev) => prev.filter((d) => d.id !== id))
  }

  const handleReleaseTool = (type) => {
    setDragging(null)

    if (type === "hcl") {
      setHclPipettePos(hclHome)
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

      <Suspense fallback={null}>
        <BuretteStand position={[STAND_POS.x, STAND_POS.y, STAND_POS.z]} />
        
        <Burette 
          position={[BURETTE_POS.x, BURETTE_POS.y, BURETTE_POS.z]} 
          onDrop={handleBuretteClick} 
        />
        
        <ConicalFlask 
          position={flaskPos}
          liquidColor={tubeColor}
          liquidOpacity={tubeOpacity}
          hclDrops={hclDrops}         // FIX: Added HCl drops so flask knows total volume
          naohDrops={naohDrops}
          phenolDrops={phenolDrops}
          isHeld={dragging === 'flask'}
          onToggleHold={handleToggleHold}
        />
      </Suspense>

      <ReagentBottle
        label={"HCl\n0.1M"}
        position={[HCL_BOTTLE_POS.x, HCL_BOTTLE_POS.y, HCL_BOTTLE_POS.z]}
        bodyColor="#7a5825"
      />

      <ReagentBottle
        label="Phenol"
        position={[PHENOL_BOTTLE_POS.x, PHENOL_BOTTLE_POS.y, PHENOL_BOTTLE_POS.z]}
        bodyColor="#6b4520"
      />

      <DragFlask
        dragging={dragging === "flask"}
        flaskPos={flaskPos}
        setPosition={setFlaskPos}
      />

      <Suspense fallback={null}>
        <Pipette
          type="hcl"
          position={hclPipettePos}
          loaded={loadedBottle === "hcl"}
          loadedColor={getLoadedLiquidColor("hcl")}
          isHeld={dragging === "hcl"}
          isSqueezing={isSqueezing && loadedBottle === "hcl"}
          onToggleHold={handleToggleHold}
          onSqueezeStart={handleSqueezeStart}
          onSqueezeEnd={handleSqueezeEnd}
        />
      </Suspense>
      
      <Suspense fallback={null}>
        <Pipette
          type="phenol"
          position={phenolPipettePos}
          loaded={loadedBottle === "phenol"}
          loadedColor={getLoadedLiquidColor("phenol")}
          isHeld={dragging === "phenol"}
          isSqueezing={isSqueezing && loadedBottle === "phenol"}
          onToggleHold={handleToggleHold}
          onSqueezeStart={handleSqueezeStart}
          onSqueezeEnd={handleSqueezeEnd}
        />
      </Suspense>

      <DragPipette
        dragging={dragging === "hcl"}
        type="hcl"
        pipettePos={hclPipettePos}
        setPosition={setHclPipettePos}
        flaskPos={flaskPos}
      />
      
      <DragPipette
        dragging={dragging === "phenol"}
        type="phenol" 
        pipettePos={phenolPipettePos}
        setPosition={setPhenolPipettePos}
        flaskPos={flaskPos}
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
        minDistance={4}
        maxDistance={8}
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