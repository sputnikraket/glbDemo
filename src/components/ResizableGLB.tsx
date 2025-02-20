import React, { useRef, useState } from "react";
import * as THREE from "three";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, useGLTF } from "@react-three/drei";
import { Slider } from "@material-ui/core";

interface ResizableGLBProps {
  url: string;
}

const ResizableGLB: React.FC<ResizableGLBProps> = ({ url }) => {
  const { scene } = useGLTF(url);
  const modelRef = useRef<THREE.Group>(null);
  const [scaleX, setScaleX] = useState(1);
  const [scaleY, setScaleY] = useState(1);

  return (
    <div>
      <Canvas style={{ width: "100vw", height: "50vh" }}>
        <ambientLight />
        <pointLight position={[10, 10, 10]} />
        <primitive
          ref={modelRef}
          object={scene}
          scale={[scaleX, scaleY, 1]}
          position={[0, 0, 0]}
        />
        <OrbitControls />
      </Canvas>
      <div style={{ marginTop: "20px" }}>
        <div>
          <label>Scale X: </label>
          <Slider
            value={scaleX}
            min={0.1}
            max={5}
            step={0.1}
            onChange={(_, value) => setScaleX(value as number)}
          />
        </div>
        <div>
          <label>Scale Y: </label>
          <Slider
            value={scaleY}
            min={0.1}
            max={5}
            step={0.1}
            onChange={(_, value) => setScaleY(value as number)}
          />
        </div>
      </div>
    </div>
  );
};

export default ResizableGLB;
