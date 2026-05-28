import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useUser } from "../context/UserContext";

export default function Home() {
  const [saisie, setSaisie] = useState("");
  const { setPseudo } = useUser();
  const navigate = useNavigate();

  function handleSubmit() {
    if (!saisie.trim()) return;
    setPseudo(saisie.trim());
    navigate("/quiz");
  }

  return (
    <div style={{ maxWidth: 400, margin: "80px auto", lineHeight: "40px" ,textAlign: "center" }}>
      <h1>🏆 PolyQuiz 🏆</h1>
      <p>Entre ton pseudo pour commencer</p>
      <input
        value={saisie}
        onChange={(e) => setSaisie(e.target.value)}
        placeholder="Ton pseudo..."
        style={{ padding: 10, borderRadius: 8, border: "1px solid rgb(140, 235, 235)", width: "100%",  }}
      />
      <button
        onClick={handleSubmit}
        style={{ marginTop: 16, padding: "12px 32px", borderRadius: 8, background: "#5be266c5", color: "white", border: "2px solid green", cursor: "pointer" }}
      >
        Jouer
      </button>
    </div>
  );
}