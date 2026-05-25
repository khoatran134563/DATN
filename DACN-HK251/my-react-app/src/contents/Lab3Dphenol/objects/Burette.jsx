import React from 'react'
import { useGLTF } from '@react-three/drei'

export default function Burette({ position, onDrop }) {
  const { scene } = useGLTF('/models/burette/scene.gltf') 

  return (
    <group position={position}>
      <primitive object={scene} scale={0.2} /> 
      
      {/* The invisible clickable hitbox for the valve/tip */}
      <mesh 
        position={[0, -0.1, 0]} // Tweak this Y value to perfectly cover the burette's valve
        onClick={(e) => {
          e.stopPropagation()
          onDrop()
        }}
      >
        <boxGeometry args={[0.2, 0.2, 0.2]} />
        <meshBasicMaterial color="red" visible={false} /> {/* Change visible to true temporarily to see and position it! */}
      </mesh>
    </group>
  )
}