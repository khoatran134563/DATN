// import React from 'react'
// import { useGLTF } from '@react-three/drei'

// export default function ConicalFlask({ position, liquidColor, liquidOpacity }) {
//   // Extract just the nodes
//   const { nodes } = useGLTF('/models/conicalflask/scene.gltf') 

//   return (
//     <group 
//       position={position} 
//       scale={0.03} // Apply your scale here! Adjust this number as needed.
//     >
//       {/* 1. The Glass Body of the Medium Flask */}
//       <mesh 
//         geometry={nodes.Conical_flask_mid_glas_0.geometry} 
//         material={nodes.Conical_flask_mid_glas_0.material} 
//       /> 

//       {/* 2. The Text/Measurement Lines of the Medium Flask */}
//       <mesh 
//         geometry={nodes.Conical_flask_mid_mid_text_0.geometry} 
//         material={nodes.Conical_flask_mid_mid_text_0.material} 
//       /> 
//     </group>
//   )
// }

import React, { useRef } from 'react'
import { useGLTF } from '@react-three/drei'
import * as THREE from "three";

import {
  FLASK_POS,
  FLASK_MOUTH_OFFSET,
} from "../constants"

export default function ConicalFlask({ 
  position, 
  liquidColor = "#ff0000", 
  liquidOpacity = 1,
  hclDrops = 0,
  naohDrops = 0,
  phenolDrops = 0,
  isHeld = false,
  onToggleHold 
}) {
  const { nodes } = useGLTF('/models/conicalflask/scene.gltf') 


  const box = new THREE.Box3().setFromObject(nodes.Conical_flask_mid_glas_0);



  // Calculate dynamic liquid height
  const totalVolume_mL = (hclDrops * 5.0) + (naohDrops * 0.1) + (phenolDrops * 0.5);
  const hasLiquid = totalVolume_mL > 0
  const liquidHeight = totalVolume_mL * 0.02;
  const liquidY = -box.min.y / 2 + (liquidHeight / 2) // Push it up so it fills from the bottom


  // 2. THE FIX: Dynamic Slope Math
  const radiusBottom = 0.32 // The fixed, wide base of the flask
  
  // As the height increases, the top radius shrinks at a constant rate 
  // to perfectly match the angle of the glass.
  // (e.g., at height 0, it is 0.28. At max height 0.5, it narrows to 0.12)
  const radiusTop = 0.28 - (liquidHeight * 0.32)

  return (
    <group 
      position={position} 
      
      onClick={(e) => {
        e.stopPropagation()
        onToggleHold?.('flask')
      }}
    >
      {/* 1. Your isolated Glass Flask Node (Replace with your exact node name) */}
      <group scale={0.03}>
      <mesh 
        geometry={nodes.Conical_flask_mid_glas_0.geometry} 
        material={nodes.Conical_flask_mid_glas_0.material} 
      /> 

      {/* 2. Your isolated Text Node (Replace with your exact node name) */}
      <mesh 
        geometry={nodes.Conical_flask_mid_mid_text_0.geometry} 
        material={nodes.Conical_flask_mid_mid_text_0.material} 
      /> 
      </group>

      {/* 3. The Dynamic Liquid */}
      {hasLiquid && (
        <mesh position={[0, liquidY, 0]} receiveShadow>
          {/* Replace the hardcoded numbers with your new dynamic variables */}
          <cylinderGeometry args={[radiusTop, radiusBottom, liquidHeight, 32]} />
          
          <meshPhysicalMaterial 
            color={liquidColor} 
            transparent 
            opacity={liquidOpacity}

            attenuationColor={liquidColor} // The deep volume color
            attenuationDistance={0.5}
            
            // THE REALISM PROPERTIES:
            roughness={0.0}       // 0 means perfectly smooth and shiny
            transmission={0.9}    // Makes it see-through like glass/water instead of just "invisible"
            ior={1.33}            // "Index of Refraction". 1.33 is the exact real-world value for Water! It bends the light.
            thickness={0.5}       // Simulates volume so light bounces around inside it
          />
        </mesh>
      )}

      {/* 4. Highlight ring when holding it (Optional but great for UX) */}
      {isHeld && (
        <mesh position={[0, -0.4, 0]}>
          <ringGeometry args={[0.35, 0.4, 32]} />
          <meshBasicMaterial color="#3b82f6" rotation={[-Math.PI / 2, 0, 0]} />
        </mesh>
      )}
    </group>
  )
}