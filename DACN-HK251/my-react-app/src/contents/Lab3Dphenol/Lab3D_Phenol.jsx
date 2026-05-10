import React from "react"
import LabBase from "./LabBase"
import Scene from "./Scene"
import GuideCard from "./ui/GuideCard"
import usePhenolInteractiveLab from "./usePhenolInteractiveLab"

export default function Lab3D_Phenol() {
  const {
    naohDrops,
    phenolDrops,
    loadedBottle,
    overTube,
    isSqueezing,
    spawnToken,

    color,
    opacity,
    status,
    description,

    loadedLiquidColor,
    loadedLabel,
    turnedPink,
    instruction,

    setOverTube,
    setIsSqueezing,
    loadBottle,
    releaseDrop,
    commitDrop,
    resetLab,
  } = usePhenolInteractiveLab()

  return (
    <LabBase
      title="Thực hành 3D: Chỉ thị phenolphthalein"
      sidePanel={
        <GuideCard
          loadedLabel={loadedLabel}
          naohDrops={naohDrops}
          phenolDrops={phenolDrops}
          status={status}
          description={description}
          instruction={instruction}
          turnedPink={turnedPink}
          onReset={resetLab}
        />
      }
    >
      <Scene
        naohDrops={naohDrops}
        phenolDrops={phenolDrops}
        loadedBottle={loadedBottle}
        overTube={overTube}
        isSqueezing={isSqueezing}
        spawnToken={spawnToken}
        loadedLiquidColor={loadedLiquidColor}
        tubeColor={color}
        tubeOpacity={opacity}
        setOverTube={setOverTube}
        setIsSqueezing={setIsSqueezing}
        loadBottle={loadBottle}
        releaseDrop={releaseDrop}
        commitDrop={commitDrop}
      />
    </LabBase>
  )
}