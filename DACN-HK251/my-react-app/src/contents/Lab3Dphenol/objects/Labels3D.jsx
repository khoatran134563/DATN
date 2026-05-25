import React from "react"
import { Text } from "@react-three/drei"

export default function Labels3D() {
  return (
    <>
      <Text
        position={[0.85, 1, 0]}
        fontSize={0.18}
        color="#cfe8ff"
        anchorX="center"
        anchorY="middle"
      >
        HCl 0.1M
      </Text>

      <Text
        position={[2.05, 1, 0]}
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