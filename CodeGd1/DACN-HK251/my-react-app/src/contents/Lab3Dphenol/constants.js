import * as THREE from "three"

export const CAMERA_POS = [0, 0.95, 6.3]



export const HCL_BOTTLE_POS = new THREE.Vector3(0.85, -1.18, 0)
export const PHENOL_BOTTLE_POS = new THREE.Vector3(2.05, -1.18, 0)

export const DRAG_BOUNDS = {
  minX: -2.5,
  maxX: 2.6,
  minY: -0.95,
  maxY: 1.25,
}


export const PIPETTE_HOME_OFFSET = new THREE.Vector3(0.0, 1, 0)
export const PIPETTE_TIP_OFFSET = new THREE.Vector3(0, -0.58, 0)

export const MAX_COLOR_STRENGTH = 6
// constants.js

// The base of the stand sits on the bench
export const STAND_POS = new THREE.Vector3(-1.5, -1.18, 0)

// The burette sits higher up. The X and Z should match the stand's clamp position.
export const BURETTE_POS = new THREE.Vector3(-1.5, 0.2, -0.1) 

// The flask sits on the base of the stand, directly underneath the burette's tip.
export const FLASK_POS = new THREE.Vector3(-1.5, -1.0, -0.1) // 

// The target where droplets should fall (the mouth of the flask)
export const FLASK_MOUTH_OFFSET = new THREE.Vector3(0, 0.8, 0)
// The exact point where drops should spawn. 
// You may need to tweak the Y value based on your GLTF model's scale!
export const BURETTE_TIP_POS = new THREE.Vector3(-1.5, -0.2, -0.1)
