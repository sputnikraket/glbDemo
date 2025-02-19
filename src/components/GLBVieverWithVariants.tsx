"use client";
import { useEffect, useRef, useState } from "react";
import "@google/model-viewer/lib/model-viewer";


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

const GLBViewerVariants: React.FC<GLBViewerProps> = ({ url }) => {
const [variants, setVariants] = useState<string[] | null>(null);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const modelRef = useRef<any>(null);

  useEffect(() => {
    const handleModelLoad = () => {
      if (!modelRef.current) return;
      const model = modelRef.current
        console.log("Model loaded:", model.availableVariants);
      // Set variants
      
        const variant = model.availableVariants || [];
        console.log("Variants:", variant);
        setVariants(variant);
      

    
    };

    const modelElement = modelRef.current;
    modelElement?.addEventListener("load", handleModelLoad);
    return () => modelElement?.removeEventListener("load", handleModelLoad);
  }, []);

    const handleVariantChange = (e: React.MouseEvent<HTMLLIElement>) => {
        const model = modelRef.current;
        if (!model) return;
        const variant = e.currentTarget.innerText;
        model.variantName = variant;
    };



  return (
    <div>
        <h3>GLB Viewer - Change variant</h3>
      <model-viewer
        ref={modelRef}
        src={url}
        alt="3D Model"
        auto-rotate
        camera-controls
        ar-placement="wall"
        ar
        style={{ width: "100%", height: "500px" }}
      />
        <div>
            <h3>Variants</h3>
            <ul>
            {variants?.map((variant) => (
                <li onClick={handleVariantChange} key={variant} style={{cursor:'pointer'}}>{variant}</li>
            ))}
            </ul>
        </div>

    </div>
  );
};

export default GLBViewerVariants;
