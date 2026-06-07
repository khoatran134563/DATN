import React, { useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { Scene } from '../Lab3D/no2/Scene';

const TextbookNo2Lab = () => {
  const [sceneKey, setSceneKey] = useState(0);

  return (
    <div className="w-screen h-screen bg-[#252b35] overflow-hidden relative">
      <Canvas
        key={sceneKey}
        shadows
        camera={{ position: [0, 0.95, 8.1], fov: 40 }}
        gl={{ antialias: true, alpha: true }}
        dpr={[1, 1.75]}
        className="w-full h-full"
      >
        <color attach="background" args={['#252b35']} />
        <fog attach="fog" args={['#252b35', 8.5, 14.5]} />
        <Scene onInfoChange={() => {}} />
      </Canvas>

      <button
        type="button"
        onClick={() => setSceneKey((prev) => prev + 1)}
        className="absolute right-4 bottom-4 rounded-xl bg-white/10 hover:bg-white/20 border border-white/15 px-4 py-2 text-sm font-bold text-white backdrop-blur-md transition"
      >
        Đặt lại
      </button>
    </div>
  );
};

export default TextbookNo2Lab;