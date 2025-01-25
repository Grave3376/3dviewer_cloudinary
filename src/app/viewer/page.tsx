"use client";
import { useState, useEffect, Suspense, useRef } from "react"; // Import useState and useEffect
import { useRouter } from "next/navigation";
import { Canvas,useFrame } from "@react-three/fiber";
import { Stage, OrbitControls, Gltf, Environment } from "@react-three/drei";

// Component for the rotating model
function RotatingModel({ modelUrl }: { modelUrl: string }) {
  const modelRef = useRef<any>();

  // Use the useFrame hook to rotate the model smoothly
  useFrame(() => {
    if (modelRef.current) {
      modelRef.current.rotation.y += 0.007; // Adjust the value for speed
    }
  });

  return <Gltf ref={modelRef} src={modelUrl} />;
}

export default function Viewer() {
  const [modelUrl, setModelUrl] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    // Extract the model URL from query parameters
    const urlParams = new URLSearchParams(window.location.search);
    const modelUrlFromQuery = urlParams.get("modelUrl");
    if (modelUrlFromQuery) {
      setModelUrl(modelUrlFromQuery);
    }
  }, []);

  return (
    <div style={{ width: "100%", height: "100vh", position: "relative" }}>
      {/* Back Button */}
      <button
        onClick={() => router.back()}
        style={{
          position: "absolute",
          top: "20px",
          left: "20px",
          zIndex: 10,
          background: "red",
          color: "#fff",
          padding: "10px 20px",
          border: "none",
          borderRadius: "5px",
          cursor: "pointer",
          fontSize: "16px",
        }}
      >
        Back
      </button>

      {/* Three.js Canvas */}
<Canvas

  gl={{ antialias: true }}
  dpr={[1, 2]}
  camera={{ position: [4, -1, 8], fov: 35 }}
  
>

  <color attach="background" args={["#f5f5f5"]} />
  <Suspense fallback={null}></Suspense>
  
  <Stage intensity={0.3}   adjustCamera={1.2} preset={"soft"} environment={"city"}  >
    {/* Render the model if modelUrl is set */}
    {modelUrl && <RotatingModel modelUrl={modelUrl} />}
    <Environment files="/models/env2.hdr" environmentIntensity={3} environmentRotation={[0,90,0]}   blur={1}   />
  
  </Stage>

  {/* OrbitControls with zoom limits */}
  <OrbitControls
    minPolarAngle={0}
    maxPolarAngle={Math.PI}
    enableZoom={true}
    enablePan={true}
    enableRotate={true}
    minDistance={0.17} // Minimum distance for zoom-in
    maxDistance={0.60} // Maximum distance for zoom-out
  />
</Canvas>
    </div>
  );
}
