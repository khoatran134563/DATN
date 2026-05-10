import * as THREE from "three"

export const CAMERA_POS = [0, 0.95, 6.3]

export const TEST_TUBE_POS = new THREE.Vector3(-1.95, -0.52, 0)

export const NAOH_BOTTLE_POS = new THREE.Vector3(0.35, -0.58, 0)
export const PHENOL_BOTTLE_POS = new THREE.Vector3(1.95, -0.58, 0)

export const DRAG_BOUNDS = {
  minX: -2.5,
  maxX: 2.6,
  minY: -0.95,
  maxY: 1.25,
}

export const TEST_TUBE_MOUTH_OFFSET = new THREE.Vector3(0, 1.48, 0)
export const TEST_TUBE_LIQUID_OFFSET = new THREE.Vector3(0, 0.22, 0)

export const PIPETTE_HOME_OFFSET = new THREE.Vector3(0.0, 0.9, 0)
export const PIPETTE_TIP_OFFSET = new THREE.Vector3(0.18, -0.58, 0)

export const MAX_COLOR_STRENGTH = 6