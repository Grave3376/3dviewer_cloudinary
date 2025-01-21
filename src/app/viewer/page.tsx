"use client";
import { Suspense } from "react"; // Import Suspense from React
import { useRouter, useSearchParams } from "next/navigation";
import { Canvas } from "@react-three/fiber";
import { Stage, OrbitControls, Gltf } from "@react-three/drei";

export default function Viewer() {
  const searchParams = useSearchParams();
  const modelUrl = searchParams.get("modelUrl");
  const router = useRouter();

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

      {/* Suspense Boundary */}
      <Suspense fallback={<div>Loading...</div>}>
        <Canvas
          shadows
          gl={{ antialias: true }}
          dpr={[1, 2]}
          camera={{ position: [4, -1, 8], fov: 35 }}
        >
          <color attach="background" args={["#000000"]} />
          <Stage intensity={0.3} preset="soft" adjustCamera={1} environment="city">
            {/* Render the model from the query parameter */}
            {modelUrl && <Gltf src={modelUrl} />}
          </Stage>

          {/* OrbitControls */}
          <OrbitControls
            minPolarAngle={0}
            maxPolarAngle={Math.PI}
            enableZoom={true}
            enablePan={true}
            enableRotate={true}
          />
        </Canvas>
      </Suspense>
    </div>
  );
}
