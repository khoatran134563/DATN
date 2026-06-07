import React from "react"
import LabBase from "./LabBase"
import Scene from "./Scene"
import GuideCard from "./ui/GuideCard"
import usePhenolInteractiveLab from "./usePhenolInteractiveLab"

export default function Lab3D_Phenol() {
  const {
    hclDrops,
    naohDrops,
    phenolDrops,
    dangerRatio,
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
    secretNaohMolarity
  } = usePhenolInteractiveLab()

  return (
    <LabBase title="Thực hành 3D: Chuẩn độ Acid - Base">
      
      {/* A vertical flex container to stack the Scene and the Cards */}
      <div className="flex flex-col gap-6 w-full">
        
        {/* TOP SECTION: The 3D Scene */}
        <div className="w-full rounded-3xl overflow-hidden shadow-sm">
          <Scene
            hclDrops={hclDrops}
            naohDrops={naohDrops}
            phenolDrops={phenolDrops}
            loadedBottle={loadedBottle}
            dangerRatio={dangerRatio}
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
        </div>

        {/* BOTTOM SECTION: The Guide Cards split into two columns */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
          <GuideCard
            loadedLabel={loadedLabel}
            hclDrops={hclDrops}
            naohDrops={naohDrops}
            phenolDrops={phenolDrops}
            status={status}
            description={description}
            instruction={instruction}
            turnedPink={turnedPink}
            onReset={resetLab}
          />
        </div>
        
      </div>
    </LabBase>
  )
}