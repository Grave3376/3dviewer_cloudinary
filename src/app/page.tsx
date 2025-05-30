"use client";
import { useRouter } from "next/navigation";

const products = [
  {
    id: 1,
    name: "MacBook Grade A",
    image: "./models/macbook.jpg",
    modelUrl:
      "https://res.cloudinary.com/dxm0jq0xk/image/upload/v1748588742/A-Grade-v1.2_ivs3jn.glb",
  },
  {
    id: 2,
    name: "MacBook Grade B",
    image: "./models/macbook.jpg",
    modelUrl:
      "https://res.cloudinary.com/dxm0jq0xk/image/upload/v1748588820/B-Grade-v4_hmi06y.glb",
  },
  {
    id: 3,
    name: "MacBook Grade C",
    image: "./models/macbook.jpg",
    modelUrl:
      "https://res.cloudinary.com/dxm0jq0xk/image/upload/v1748588883/C-Grade-v1.6_sbdga3.glb",
  },
];

export default function ProductList() {
  const router = useRouter(); // Initialize useRouter for navigation

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "100vh",
        padding: "20px",
        backgroundColor: "#000000",
      }}
    >
      <div
        style={{
          display: "flex",
          gap: "50px",
          flexWrap: "wrap",
          justifyContent: "center",
        }}
      >
        {products.map((product) => (
          <div
            key={product.id}
            style={{
              width: "300px",
              backgroundColor: "white", // Black card background
              border: "1px solid #ddd",
              borderRadius: "10px",
              overflow: "hidden",
              boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
              textAlign: "center",
              transition: "0.3s ease", // Smooth transition for hover effect
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.border = "3px solid #007bff"; // Blue border on hover
              e.currentTarget.style.borderRadius = "15px"; // Increase border radius on hover
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.border = "1px solid #ddd"; // Reset border
              e.currentTarget.style.borderRadius = "10px"; // Reset border radius
            }}
          >
            <div
              style={{
                width: "100%",
                height: "301px",
                overflow: "hidden",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <img
                src={product.image}
                alt={product.name}
                style={{
                  width: "70%",
                  height: "70%",
                  objectFit: "cover",
                }}
              />
            </div>
            <div style={{ padding: "10px" }}>
              <h3
                style={{
                  margin: "20px 20px ",
                  fontSize: "24px",
                  color: "#000", // Black product name
                }}
              >
                {product.name}
              </h3>
              <button
                onClick={() => router.push(`/viewer?modelUrl=${product.modelUrl}`)} // Navigate to viewer
                style={{
                  backgroundColor: "#007bff",
                  color: "#fff",
                  padding: "10px 20px",
                  border: "none",
                  borderRadius: "5px",
                  cursor: "pointer",
                  fontSize: "16px",
                }}
              >
                View in 3D
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
