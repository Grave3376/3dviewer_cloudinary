"use client";
import { useState, useEffect, Suspense } from "react"; // Import useState and useEffect
import { useRouter } from "next/navigation";
import { Canvas } from "@react-three/fiber";
import { Stage, OrbitControls, Gltf, Environment } from "@react-three/drei";

export default function Viewer() {
  const [modelUrl, setModelUrl] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    // Only run on the client side
    const urlParams = new URLSearchParams(window.location.search);
    const modelUrlFromQuery = urlParams.get("modelUrl");
    if (modelUrlFromQuery) {
      setModelUrl(modelUrlFromQuery);
    }
  }, []); // Empty dependency array ensures this runs only once after component mounts

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
  <Stage intensity={0}  adjustCamera={1.2} preset={"rembrandt"} environment={null}>
    {/* Render the model if modelUrl is set */}
    {modelUrl && <Gltf src={modelUrl} />}
    <Environment files="/models/env1.hdr" environmentIntensity={2.5}  />
  </Stage>

  {/* OrbitControls with zoom limits */}
  <OrbitControls
    minPolarAngle={0}
    maxPolarAngle={Math.PI}
    enableZoom={true}
    enablePan={true}
    enableRotate={true}
    minDistance={0.30} // Minimum distance for zoom-in
    maxDistance={0.4} // Maximum distance for zoom-out
  />
</Canvas>
    </div>
  );
}
