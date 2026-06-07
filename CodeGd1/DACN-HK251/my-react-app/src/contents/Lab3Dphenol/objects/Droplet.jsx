import React, { useEffect, useMemo, useRef } from "react"
import * as THREE from "three"
import { useFrame } from "@react-three/fiber"

export default function Droplet({ start, target, color, liquidType, onHit, onDone }) {
  const ref = useRef()
  // Because 'target' is a prop from the movable flask, this updates dynamically as the flask slides!
  const targetVec = useMemo(() => new THREE.Vector3(...target), [target])
  const hasHit = useRef(false)

  useEffect(() => {
    if (ref.current) ref.current.position.set(start[0], start[1], start[2])
  }, [start])

  useFrame((_, delta) => {
    if (!ref.current) return

    // Simulating gravity
    ref.current.position.y -= delta * 1.9
    ref.current.scale.set(0.9, 1.15, 0.9)

    // 1. Did it reach the bottom height? (Y-Axis Check)
    if (!hasHit.current && ref.current.position.y <= targetVec.y) {
      hasHit.current = true;
      
      // 2. THE NEW MECHANIC: X/Z Hitbox Check
      // Calculate how far the drop is from the exact center of the flask horizontally
      const dropX = ref.current.position.x;
      const dropZ = ref.current.position.z;
      
      const flaskX = targetVec.x;
      const flaskZ = targetVec.z;
      
      // Calculate the horizontal distance between the drop and the flask
      const distance = Math.sqrt(Math.pow(dropX - flaskX, 2) + Math.pow(dropZ - flaskZ, 2));


      console.log(`IMPACT! Distance from center: ${distance}`);
      
      // 3. The Hit Radius (The "Net")
      // If the drop is within 0.25 units of the center, it went through the mouth!
      if (distance <= 0.25) { // 0.25
        console.log("DROP CAUGHT!");
        onHit?.(liquidType); // Count the drop!
      } else {
        // If the distance is > 0.25, it missed the flask entirely. 
        // We do NOT call onHit, so the drop doesn't count.
        console.log("DROP MISSED!");
      }

      // Either way, delete the physical drop object from the screen
      onDone?.(); 
    }

    // Failsafe in case of physics glitches
    if (ref.current.position.y < targetVec.y - 0.5) {
      onDone?.()
    }
  })

  return (
    <mesh ref={ref} castShadow position={start}>
      <sphereGeometry args={[0.045, 16, 16]} />
      <meshStandardMaterial color={color} emissive={color} emissiveIntensity={0.3} />
    </mesh>
  )
}

// Droplet.jsx
// import React, { useEffect, useMemo, useRef } from "react"
// import * as THREE from "three"
// import { useFrame } from "@react-three/fiber"

// export default function Droplet({ start, target, color, liquidType, onHit, onDone }) {
//   const ref = useRef()
//   const targetVec = useMemo(() => new THREE.Vector3(...target), [target])
//   const hasHit = useRef(false) // Thêm cờ để đảm bảo chỉ hit 1 lần duy nhất

//   useEffect(() => {
//     if (ref.current) ref.current.position.set(start[0], start[1], start[2])
//   }, [start])

//   useFrame((_, delta) => {
//     if (!ref.current) return

//     // Tốc độ rơi
//     ref.current.position.y -= delta * 1.9

//     // Tạo hiệu ứng giọt nước hơi thuôn dài khi rơi
//     ref.current.scale.set(0.9, 1.15, 0.9)

//     // SỬA LOGIC VA CHẠM TẠI ĐÂY: Chỉ cần check trục Y
//     if (!hasHit.current && ref.current.position.y <= targetVec.y) {
//       hasHit.current = true;
//       onHit?.(liquidType); // Cộng giọt và tính toán đổi màu
//       onDone?.();          // Xóa giọt nước
//     }

//     // Backup: Đề phòng rủi ro giọt nước rơi quá sâu (không cần thiết lắm nhưng giữ cho an toàn)
//     if (ref.current.position.y < targetVec.y - 0.5) {
//       onDone?.()
//     }
//   })

//   return (
//     <mesh ref={ref} castShadow>
//       <sphereGeometry args={[0.045, 16, 16]} />
//       <meshStandardMaterial color={color} emissive={color} emissiveIntensity={0.3} />
//     </mesh>
//   )
// }
