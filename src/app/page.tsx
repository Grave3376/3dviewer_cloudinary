"use client";
import { Canvas } from "@react-three/fiber";
import { Stage, OrbitControls, Gltf, Environment } from "@react-three/drei";

export default function App() {
  return (
    <div style={{ width: '100%', height: '100vh' }}>
      <Canvas
        shadows
        gl={{ antialias: false }}
        dpr={[1, 1.5]}
        camera={{ position: [4, -1, 8], fov: 35 }}
      >
        <color attach="background" args={['#000000']} />
        {/* <Environment files="./models/env1.hdr" background /> */}
        <Stage intensity={0.3} preset="soft" adjustCamera={1} environment="city">
          {/* Disable Shadows on the Model */}
          <Gltf 
            src="./models/iphone.glb" 
            castShadow={false} 
            receiveShadow={false} 
          />
        </Stage>

        {/* OrbitControls */}
        <OrbitControls
          minPolarAngle={0}  // Allow looking from the top
          maxPolarAngle={Math.PI}  // Allow looking from the bottom
          enableZoom={true}  // Optional, allow zooming in and out
          enablePan={true}   // Optional, allow panning
          enableRotate={true} // Enable rotation
        />
      </Canvas>
    </div>
  );
}
