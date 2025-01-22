"use client";
import { useRouter } from "next/navigation";

const products = [
  {
    id: 1,
    name: "iPhone 15 Pro Max",
    image: "./models/15promax.JPEG",
    modelUrl:
      "https://res.cloudinary.com/dxm0jq0xk/image/upload/v1737546562/vtmp086htkfx16tzdxy6.glb",
  },
  {
    id: 2,
    name: "Airpods",
    image: "./models/airpods.JPG",
    modelUrl:
      "https://res.cloudinary.com/dxm0jq0xk/image/upload/v1737466206/v3_qdyb3p.glb",
  },
  {
    id: 3,
    name: "Macbook",
    image: "./models/macbook.JPG",
    modelUrl:
      "https://res.cloudinary.com/dxm0jq0xk/image/upload/v1737464229/v1testing_bp4pvt.glb",
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
