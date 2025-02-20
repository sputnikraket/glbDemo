import React, { useRef, useState } from "react";
import * as THREE from "three";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, useGLTF } from "@react-three/drei";
import { Slider, TextField } from "@material-ui/core";

interface ResizableGLBProps {
  url: string;
}

const ResizableGLB: React.FC<ResizableGLBProps> = ({ url }) => {
  const { scene } = useGLTF(url);
  const modelRef = useRef<THREE.Group>(null);
  const [scaleX, setScaleX] = useState(100);
  const [scaleY, setScaleY] = useState(100);

  return (
    <div>
      <Canvas style={{ width: "80vw", height: "50vh" }}>
        <ambientLight />
        <pointLight position={[10, 10, 10]} />
        <primitive
          ref={modelRef}
          object={scene}
          scale={[scaleX/100, scaleY/100, 1]}
          position={[0, 0, 0]}
        />
        <OrbitControls />
      </Canvas>
      <div style={{ marginTop: "20px", display:'flex',flexDirection:'column',gap:'20px' }}>
      <div style={{display:'flex', gap:'10px', alignItems:'center'}}>
      <TextField
            variant="outlined"
            label='Width (cm):'
            type='number'
            value={scaleX}
            onChange={(e) => setScaleX(parseFloat(e.target.value))}
            />
          <Slider
            value={scaleX}
            min={1}
            max={300}
            step={1}
            onChange={(_, value) => setScaleX(value as number)}
          />
        </div>
        <div style={{display:'flex', gap:'10px', alignItems:'center'}}>
          
            <TextField
            variant="outlined"
            label='Height (cm):'
            type='number'
            value={scaleY}
            onChange={(e) => setScaleY(parseFloat(e.target.value))}
            />
          <Slider
            value={scaleY}
            min={1}
            max={300}
            step={1}
            onChange={(_, value) => setScaleY(value as number)}
          />
        </div>
      </div>
    </div>
  );
};

export default ResizableGLB;
