"use client";
import { useRef } from "react";
import "@google/model-viewer/lib/model-viewer";
import { Material } from "@google/model-viewer/lib/features/scene-graph/material";

interface GLBViewerProps {
  url: string;
}
declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace JSX {
    interface IntrinsicElements {
      "model-viewer": ModelViewerJSX &
        React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>;
    }
  }
}

interface ModelViewerJSX {
  src: string;
  poster?: string;
  iosSrc?: string;
  seamlessPoster?: boolean;
  autoplay?: boolean;
  environmentImage?: string;
  exposure?: string;
  interactionPromptThreshold?: string;
  shadowIntensity?: string;
  ar?: boolean;
  arModes?: string;
  autoRotate?: boolean;
  cameraControls?: boolean;
  cameraOrbit?: string;
  alt?: string;
  sx?: object;
}

const GLBViewer: React.FC<GLBViewerProps> = ({ url }) => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const modelRef = useRef<any>(null);

  const handleColorUpdate = () => {
    const hex = document.getElementById("hex") as HTMLInputElement;
    if (!hex) return;
    const color = hex.value;
    const model = modelRef.current;
    if (!model) return;
    const materials = model.model?.materials || [];
    materials.forEach((material: Material) => {
      if (material.name === "Color_M08") {
        material.pbrMetallicRoughness.setBaseColorFactor(hexToRgb(color));
      }
    });
  };
  const handleImageUpdate = async () => {
    const model = modelRef.current;
    if (!model) return;
    const texture = await model.createTexture("/kung.jpg");
    console.log(texture);
    const materials = model.model?.materials || [];
    materials.forEach((material: Material) => {
      if (material.name === "Monumental_Figure") {
        material.pbrMetallicRoughness.baseColorTexture.setTexture(texture);
      }
    });
  };

  return (
    <div>
      <h3>GLB Viewer - Change texture and color</h3>
      <model-viewer
        ref={modelRef}
        src={url}
        alt="3D Model"
        auto-rotate
        ar-placement="wall"
        camera-controls
        ar
        style={{ width: "100%", height: "500px" }}
      />
      <div style={{ display: "flex" }}>
        <p>Change color(enter hexCode)</p>
        <input name="x" id="hex" type="text"></input>

        <button onClick={handleColorUpdate}>Apply</button>
      </div>
      <button onClick={handleImageUpdate}>Change image</button>
    </div>
  );
};

export default GLBViewer;
function hexToRgb(hex: string): [number, number, number, number] {
  // Remove the hash at the start if it's there
  hex = hex.replace(/^#/, "");

  // Parse r, g, b values
  const bigint = parseInt(hex, 16);
  const r = (bigint >> 16) & 255;
  const g = (bigint >> 8) & 255;
  const b = bigint & 255;

  // Return as an array with alpha set to 1
  return [r / 255, g / 255, b / 255, 1];
}
