// "use client";
// import { Canvas } from "@react-three/fiber";
// import { Stage, OrbitControls, Gltf, Environment } from "@react-three/drei";

// export default function App() {
//   return (
//     <div style={{ width: '100%', height: '100vh' }}>
//       <Canvas
//         shadows
//         gl={{ antialias: false }}
//         dpr={[1, 1.5]}
//         camera={{ position: [4, -1, 8], fov: 35 }}
//       >
//         <color attach="background" args={['#000000']} />
//         {/* <Environment files="./models/env1.hdr" background /> */}
//         <Stage intensity={0.3} preset="soft" adjustCamera={1} environment="city">
//           {/* Disable Shadows on the Model */}
//           <Gltf 
//             src="./models/v3.glb" 
//             castShadow={false} 
//             receiveShadow={false} 
//           />
//         </Stage>

//         {/* OrbitControls */}
//         <OrbitControls
//           minPolarAngle={0}  // Allow looking from the top
//           maxPolarAngle={Math.PI}  // Allow looking from the bottom
//           enableZoom={true}  // Optional, allow zooming in and out
//           enablePan={true}   // Optional, allow panning
//           enableRotate={true} // Enable rotation
//         />
//       </Canvas>
//     </div>
//   );
// }




"use client";
import { Canvas } from "@react-three/fiber";
import { Stage, OrbitControls, Gltf } from "@react-three/drei";
import { useState, useEffect } from "react";

export default function App() {
  const [modelPath, setModelPath] = useState<string>("/models/iphone.glb"); // Default iPhone model

  // Function to handle file upload
  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file); // Create a temporary URL for the file
      setModelPath(url); // Set the model path to state
    }
  };

  // Clean up the temporary file URL
  useEffect(() => {
    return () => {
      if (modelPath && modelPath.startsWith("blob:")) {
        URL.revokeObjectURL(modelPath);
      }
    };
  }, [modelPath]);

  return (
    <div style={{ width: "100%", height: "100vh", position: "relative" }}>
      {/* Upload Button */}
      <input
        type="file"
        accept=".glb,.gltf"
        onChange={handleFileUpload}
        id="upload-button"
        style={{ display: "none" }}
      />
      <label
        htmlFor="upload-button"
        style={{
          position: "absolute",
          bottom: "5vh", // Positioned at the bottom center
          left: "50%",
          transform: "translateX(-50%)",
          zIndex: 10,
          background: "blue",
          backgroundSize: "400% 400%",
          color: "#fff",
          padding: "12px 24px",
          borderRadius: "8px",
          border: "none",
          cursor: "pointer",
          fontSize: "16px",
          fontWeight: "bold",
          animation: "gradient 3s infinite",
        }}
      >
        Upload 3D Model
      </label>

      {/* Three.js Canvas */}
      <Canvas
        shadows
        gl={{ antialias: true }}
        dpr={[1, 2]}
        camera={{ position: [4, -1, 8], fov: 35 }}
      >
        <color attach="background" args={["#000000"]} />
        <Stage intensity={0.3} preset="soft" adjustCamera={1} environment="city">
          {/* Render the default or uploaded model */}
          {modelPath && <Gltf src={modelPath} />}
        </Stage>

        {/* OrbitControls */}
        <OrbitControls
          minPolarAngle={0} // Allow looking from the top
          maxPolarAngle={Math.PI} // Allow looking from the bottom
          enableZoom={true} // Allow zooming in and out
          enablePan={true} // Allow panning
          enableRotate={true} // Enable rotation
        />
      </Canvas>
    </div>
  );
}

