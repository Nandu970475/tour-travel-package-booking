import { useNavigate } from "react-router-dom";

function Categories() {
  const navigate = useNavigate();

  const categories = [
    { name: "Hill Stations", icon: "🏔️" },
    { name: "Spiritual Tours", icon: "🛕" },
    { name: "Honeymoon Tours", icon: "❤️" },
    { name: "Beach Tours", icon: "🏖️" },
    { name: "Heritage Tours", icon: "🏰" },
    { name: "Nature Tours", icon: "🌿" },
    { name: "Adventure Tours", icon: "🎢" },
    { name: "Family Tours", icon: "👨‍👩‍👧" },
  ];

  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit,minmax(220px,1fr))",
        gap: "20px",
        maxWidth: "1200px",
        margin: "40px auto",
      }}
    >
      {categories.map((cat) => (
        <div
          key={cat.name}
          onClick={() =>
            navigate(`/category/${encodeURIComponent(cat.name)}`)
          }
          style={{
            background: "white",
            borderRadius: "15px",
            padding: "30px",
            textAlign: "center",
            cursor: "pointer",
            boxShadow: "0 10px 20px rgba(0,0,0,0.15)",
            transition: "0.3s",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = "translateY(-8px)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = "translateY(0)";
          }}
        >
          <h1 style={{ fontSize: "50px" }}>{cat.icon}</h1>

          <h3>{cat.name}</h3>

          <p style={{ color: "gray" }}>
            Click to explore tours
          </p>
        </div>
      ))}
    </div>
  );
}

export default Categories;