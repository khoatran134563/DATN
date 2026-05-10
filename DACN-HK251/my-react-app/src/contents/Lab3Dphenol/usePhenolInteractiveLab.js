import { useMemo, useState } from "react"
import { getInstruction, getLoadedLiquidColor, getLiquidLabel, getTubeVisual } from "./logic"

export default function usePhenolInteractiveLab() {
  const [naohDrops, setNaohDrops] = useState(0)
  const [phenolDrops, setPhenolDrops] = useState(0)
  const [loadedBottle, setLoadedBottle] = useState(null)
  const [overTube, setOverTube] = useState(false)
  const [isSqueezing, setIsSqueezing] = useState(false)
  const [spawnToken, setSpawnToken] = useState(0)

  const loadBottle = (type) => {
    setLoadedBottle(type)
  }

  const releaseDrop = () => {
    if (!loadedBottle || !overTube) return false
    setSpawnToken((prev) => prev + 1)
    return true
  }

  const commitDrop = (type) => {
    if (type === "naoh") {
      setNaohDrops((prev) => prev + 1)
    } else if (type === "phenol") {
      setPhenolDrops((prev) => prev + 1)
    }
  }

  const resetLab = () => {
    setNaohDrops(0)
    setPhenolDrops(0)
    setLoadedBottle(null)
    setOverTube(false)
    setIsSqueezing(false)
    setSpawnToken(0)
  }

  const tubeVisual = useMemo(
    () => getTubeVisual(naohDrops, phenolDrops),
    [naohDrops, phenolDrops]
  )

  const derived = useMemo(() => {
    return {
      loadedLiquidColor: getLoadedLiquidColor(loadedBottle),
      loadedLabel: getLiquidLabel(loadedBottle),
      turnedPink: naohDrops > 0 && phenolDrops > 0,
      instruction: getInstruction({
        loadedBottle,
        overTube,
        naohDrops,
        phenolDrops,
      }),
    }
  }, [loadedBottle, overTube, naohDrops, phenolDrops])

  return {
    naohDrops,
    phenolDrops,
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