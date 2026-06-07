import { useMemo, useState, useEffect } from "react"
// FIX 1: Removed getTubeVisual from this import line!
import { getInstruction, getLoadedLiquidColor, getLiquidLabel } from "./logic"

export default function usePhenolInteractiveLab() {
  // 1. ALL STATE VARIABLES 
  const [hclDrops, setHclDrops] = useState(0)       // From the Pipette
  const [naohDrops, setNaohDrops] = useState(0)     // From the Burette
  const [phenolDrops, setPhenolDrops] = useState(0) // From the Indicator Pipette
  
  const [loadedBottle, setLoadedBottle] = useState(null)
  const [overTube, setOverTube] = useState(false)
  const [isSqueezing, setIsSqueezing] = useState(false)
  const [spawnToken, setSpawnToken] = useState(0)
  
  const [secretNaohMolarity, setSecretNaohMolarity] = useState(0)

  // 2. THE GAMIFICATION ENGINE 
  const generateNewMolarity = () => {
    const randomM = (Math.floor(Math.random() * 8) + 8) / 100;
    setSecretNaohMolarity(randomM);
    console.log(`[CHEAT CODE] The secret NaOH Molarity is: ${randomM}M`);
  }

  useEffect(() => {
    generateNewMolarity();
  }, []);

  // 3. INTERACTION FUNCTIONS
  const loadBottle = (type) => {
    setLoadedBottle(type)
  }

  const releaseDrop = () => {
    if (!loadedBottle || !overTube) return false
    setSpawnToken((prev) => prev + 1)
    return true
  }

  const commitDrop = (type) => {
    if (type === "hcl") {
      setHclDrops((prev) => prev + 1)
    } else if (type === "naoh") {
      setNaohDrops((prev) => prev + 1)
    } else if (type === "phenol") {
      setPhenolDrops((prev) => prev + 1)
    }
  }

  const resetLab = () => {
    setHclDrops(0)
    setNaohDrops(0)
    setPhenolDrops(0)
    setLoadedBottle(null)
    setOverTube(false)
    setIsSqueezing(false)
    setSpawnToken(0)
    generateNewMolarity() 
  }

  // FIX 2: THE NEW IN-HOUSE CHEMISTRY MATH
  // We completely replaced getTubeVisual with this block.
  const tubeVisual = useMemo(() => {
    let currentTubeColor = "#f8fafc"; // Default clear water color

    // CHEMISTRY LOGIC: Only calculate color if the indicator is in the flask
    if (phenolDrops > 0) {
      // Calculate the moles
      const hclMoles = (hclDrops * 5.0) * 0.1; // 0.1M is the fixed HCl concentration
      const naohMoles = (naohDrops * 0.1) * secretNaohMolarity;

      // The Equivalence Point!
      // If base (NaOH) exceeds acid (HCl), it turns pink.
      if (naohMoles > hclMoles) {
        currentTubeColor = "#f472b6"; 
      }
    }

    // PHYSICS LOGIC: The liquid gets more opaque as it fills up
    const totalVolume_mL = (hclDrops * 5.0) + (naohDrops * 0.1);
    const calculatedOpacity = Math.min(0.8, 0.2 + (totalVolume_mL * 0.005));

    return {
      color: currentTubeColor,
      opacity: calculatedOpacity
    };
  }, [hclDrops, naohDrops, phenolDrops, secretNaohMolarity]); 


  const derived = useMemo(() => {
    const hclMoles = (hclDrops * 5.0) * 0.1; 
    const naohMoles = (naohDrops * 0.1) * secretNaohMolarity;

    // THE NEW DANGER MATH
    let dangerRatio = 0;
    
    if (phenolDrops > 0 && hclMoles > 0) {
      const currentRatio = naohMoles / hclMoles;
      
      // If we are between 85% and 100% of the way there...
      if (currentRatio >= 0.85 && currentRatio <= 1.0) {
        // Normalize that 25% window into a clean 0.0 -> 1.0 value
        dangerRatio = (currentRatio - 0.85) / 0.15;
      }
    }
    return {
      loadedLiquidColor: getLoadedLiquidColor(loadedBottle),
      loadedLabel: getLiquidLabel(loadedBottle),
      
      turnedPink: (naohDrops * secretNaohMolarity) > (hclDrops * 0.1) && phenolDrops > 0,
      
      dangerRatio,
      
      instruction: getInstruction({
        loadedBottle,
        overTube,
        hclDrops, 
        naohDrops,
        phenolDrops,
        secretNaohMolarity 
      }),
    }
  }, [loadedBottle, overTube, hclDrops, naohDrops, phenolDrops, secretNaohMolarity])

  // 5. EXPORT EVERYTHING TO THE SCENE
  return {
    hclDrops,
    naohDrops,
    phenolDrops,
    secretNaohMolarity,

    loadedBottle,
    overTube,
    isSqueezing,
    spawnToken,

    setOverTube,
    setIsSqueezing,
    loadBottle,
    releaseDrop,
    commitDrop,
    resetLab,

    ...tubeVisual,
    ...derived,
  }
}