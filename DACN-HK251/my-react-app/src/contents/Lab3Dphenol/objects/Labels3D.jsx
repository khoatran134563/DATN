import React from "react"
import { Text } from "@react-three/drei"

export default function Labels3D() {
  return (
    <>
      <Text
        position={[0.35, 1.5, 0]}
        fontSize={0.18}
        color="#cfe8ff"
        anchorX="center"
        anchorY="middle"
      >
        NaOH
      </Text>

      <Text
        position={[1.95, 1.5, 0]}
        fontSize={0.18}
        color="#f5c2d8"
        anchorX="center"
        anchorY="middle"
      >
        Phenolphthalein
      </Text>
    </>
  )
}