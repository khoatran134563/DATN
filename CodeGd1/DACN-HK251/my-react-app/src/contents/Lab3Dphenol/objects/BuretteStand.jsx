import React from 'react'
import { useGLTF } from '@react-three/drei'

export default function BuretteStand({ position }) {
  // Update this path to your downloaded stand model
  const { scene } = useGLTF('/models/burettestand/scene.gltf') 

  return (
    <group position={position}>
      <primitive object={scene} scale={6} />
    </group>
  )
}