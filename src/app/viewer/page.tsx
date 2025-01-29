// "use client";
// import { useState, useEffect, Suspense, useRef } from "react";
// import { useRouter } from "next/navigation";
// import { Canvas, useFrame } from "@react-three/fiber";
// import { Stage, OrbitControls, Gltf, Environment } from "@react-three/drei";

// // Component for the rotating model
// function RotatingModel({
//   modelUrl,
//   isPaused,
// }: {
//   modelUrl: string;
//   isPaused: boolean;
// }) {
//   const modelRef = useRef<any>();

//   // Use the useFrame hook to rotate the model smoothly
//   useFrame(() => {
//     if (modelRef.current && !isPaused) {
//       modelRef.current.rotation.y += 0.002; // Adjust the value for speed
//     }
//   });

//   return <Gltf ref={modelRef} src={modelUrl} />;
// }

// export default function Viewer() {
//   const [modelUrl, setModelUrl] = useState<string | null>(null);
//   const [isPaused, setIsPaused] = useState(false); // Track pause state
//   const router = useRouter();
//   const timeoutRef = useRef<NodeJS.Timeout | null>(null);

//   useEffect(() => {
//     // Extract the model URL from query parameters
//     const urlParams = new URLSearchParams(window.location.search);
//     const modelUrlFromQuery = urlParams.get("modelUrl");
//     if (modelUrlFromQuery) {
//       setModelUrl(modelUrlFromQuery);
//     }
//   }, []);

//   // Pause auto-rotation for 3 seconds when user interacts with the model
//   const handleControlStart = () => {
//     setIsPaused(true); // Pause rotation
//     if (timeoutRef.current) clearTimeout(timeoutRef.current); // Clear any existing timeout
//   };

//   const handleControlEnd = () => {
//     timeoutRef.current = setTimeout(() => setIsPaused(false), 3000); // Resume after 3 seconds
//   };

//   return (
//     <div style={{ width: "100%", height: "100vh", position: "relative" }}>
//       {/* Back Button */}
//       <button
//         onClick={() => router.back()}
//         style={{
//           position: "absolute",
//           top: "20px",
//           left: "20px",
//           zIndex: 10,
//           background: "red",
//           color: "#fff",
//           padding: "10px 20px",
//           border: "none",
//           borderRadius: "5px",
//           cursor: "pointer",
//           fontSize: "16px",
//         }}
//       >
//         Back
//       </button>

//       {/* Three.js Canvas */}
//       <Canvas
//         gl={{ antialias: true }}
//         dpr={[1, 2]}
//         camera={{ position: [4, -1, 8], fov: 35 }}
//       >
//         <color attach="background" args={["#f5f5f5"]} />
//         <Suspense fallback={null}></Suspense>

//         <Stage intensity={0.3} adjustCamera={1.2} preset={"soft"} environment={"city"}>
//           {/* Render the model if modelUrl is set */}
//           {modelUrl && <RotatingModel modelUrl={modelUrl} isPaused={isPaused} />}
//           <Environment
//             files="/models/env2.hdr"
//             environmentIntensity={3}
//             environmentRotation={[0, Math.PI / 2, 0]}
//             blur={1}
//           />
//         </Stage>

//         {/* OrbitControls with zoom limits */}
//         <OrbitControls
//           minPolarAngle={0}
//           maxPolarAngle={Math.PI}
//           enableZoom={true}
//           enablePan={true}
//           enableRotate={true}
//           minDistance={0.17} // Minimum distance for zoom-in
//           maxDistance={0.6} // Maximum distance for zoom-out
//           onStart={handleControlStart} // Pause rotation on interaction start
//           onEnd={handleControlEnd}   // Resume rotation after interaction ends
//         />
//       </Canvas>
//     </div>
//   );
// }



"use client";

import { useState, useEffect, Suspense, useRef } from "react";
import { useRouter } from "next/navigation";
import { Canvas, useFrame } from "@react-three/fiber";
import { Stage, OrbitControls, Gltf, Environment } from "@react-three/drei";
import { CircleCheck } from "lucide-react";
import { X } from "lucide-react";

// Component for the rotating model
function RotatingModel({ modelUrl, isPaused }: { modelUrl: string; isPaused: boolean }) {
  const modelRef = useRef<any>();

  // Use the useFrame hook to rotate the model smoothly
  useFrame(() => {
    if (modelRef.current && !isPaused) {
      modelRef.current.rotation.y += 0.002; // Adjust the value for speed
    }
  });

  return <Gltf ref={modelRef} src={modelUrl} />;
}

export default function Viewer() {
  const [modelUrl, setModelUrl] = useState<string | null>(null);
  const [isPaused, setIsPaused] = useState(false);
  const [selectedGrade, setSelectedGrade] = useState<string | null>(null);
  const router = useRouter();
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const modelUrlFromQuery = urlParams.get("modelUrl");
    if (modelUrlFromQuery) {
      setModelUrl(modelUrlFromQuery);
    }
  }, []);

  const handleControlStart = () => {
    setIsPaused(true);
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
  };

  const handleControlEnd = () => {
    timeoutRef.current = setTimeout(() => setIsPaused(false), 3000);
  };

  const grades = [
    { grade: "SS Grade", color: "#13683F" },
    { grade: "S Grade", color: "#4CAF50" },
    { grade: "A Grade", color: "#81C784" },
    { grade: "B Grade", color: "#EEC006" },
    { grade: "C Grade", color: "#FF9500" },
    { grade: "D Grade", color: "#FF9500" },
    { grade: "J Grade", color: "#B62B1F" },
  ];

  return (
    <div
      style={{
        width: "1312px",
        height: "604px",
        backgroundColor: "#FFFFFF",
        border: "1px solid #E9EAEB",
        borderRadius: "12px",
        padding: "40px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: "24px",
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
      }}
    >
      {/* Top Container */}
      <div
        style={{
          width: "1270px",
          height: "auto",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          backgroundColor: "white",
          textAlign: "center",
        }}
      >
        <span style={{ fontSize: "20px", fontWeight: "bold", color: "black" }}>iPhone 15 PRO MAX</span>

        {/* Close Button */}
        <div
        style={{
          width: "40px",
          height: "40px",
          backgroundColor: "#F5F5F5",
          border: "1px solid #E9EAEB",
          borderRadius: "8px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          cursor: "pointer",
        }}
      >
        <X size={20} color="black" />
        
         
        </div>
      </div>

      {/* Bottom Container */}
      <div style={{ display: "flex", gap: "24px" }}>
        {/* Left Container (3D Viewer) */}
        <div
          style={{
            width: "893px",
            height: "501px",
            backgroundColor: "white",
            borderRadius: "12px",
            border: "1px solid #E9EAEB",
          }}
        >
          <Canvas gl={{ antialias: true }} dpr={[1, 2]} camera={{ position: [4, -1, 8], fov: 35 }}>
            <color attach="background" args={["#f5f5f5"]} />
            <Suspense fallback={null}>
              <Stage intensity={0.3} adjustCamera={1.2} preset="soft" environment="city">
                {modelUrl && <RotatingModel modelUrl={modelUrl} isPaused={isPaused} />}
                <Environment files="/models/env2.hdr" environmentIntensity={3} environmentRotation={[0, Math.PI / 2, 0]} blur={1} />
              </Stage>
            </Suspense>
            <OrbitControls
              minPolarAngle={0}
              maxPolarAngle={Math.PI}
              enableZoom
              enablePan
              enableRotate
              minDistance={0.17}
              maxDistance={0.6}
              onStart={handleControlStart}
              onEnd={handleControlEnd}
            />
          </Canvas>
        </div>

        {/* Right Container - Grades List */}
        <div
          style={{
            width: "325px",
            height: "460px",
            backgroundColor: "white",
            borderRadius: "12px",
            border: "1px solid #E9EAEB",
            padding: "20px",
            display: "flex",
            flexDirection: "column",
          }}
        >
          {/* Grades Breakdown Header */}
          <div>
            <h1 className="plusJakartaSans" style={{ fontSize: "20px", fontWeight: "600", color: "black" }}>
              Grades Breakdown
            </h1>
            <p style={{ fontSize: "12px", fontWeight: "400", color: "#414651" }}>
              Select the available grades from the following list of grades
            </p>
          </div>

          {/* Divider Line */}
          <div style={{ width: "285px", height: "1px", backgroundColor: "#E9EAEB", marginTop: "20px" }}></div>

          {/* Grades List */}
          <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
            {grades.map((item, index) => (
              <div
                key={index}
                onClick={() => setSelectedGrade(item.grade)}
                style={{
                  width: "285px",
                  height: "23px",
                  border: selectedGrade === item.grade ? "1px solid black" : "1px solid #E9EAEB",

                  borderRadius: "8px",
                  display: "flex",
                  alignItems: "center",
                  padding: "8px",
                  cursor: "pointer",
                }}
              >
                {/* Color Indicator + Text */}
                <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-start", gap: "2px" }}>
                  <div style={{ width: "24px", height: "6px", borderRadius: "8px", backgroundColor: item.color }}></div>
                  <span style={{ fontSize: "14px", fontWeight: "400", color: "black" }} className="plusJakartaSans">
                    {item.grade}
                  </span>
                </div>

                {/* Tick Icon on Right */}
                {selectedGrade === item.grade && <CircleCheck size={20} color="black" style={{ marginLeft: "auto" }} />}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

