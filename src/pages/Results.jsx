import { useMemo } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useUser } from "../context/UserContext";

export default function Results() {
  const { state } = useLocation();
  const { pseudo, meilleurScore } = useUser();
  const navigate = useNavigate();

  const ratio = useMemo(() => {
    if (!state?.total) return "0%";
    return ((state.score / state.total) * 100).toFixed(1) + "%";
  }, [state?.score, state?.total]);

  return (
    <div style={{ maxWidth: 500, margin: "80px auto", textAlign: "center" , lineHeight:"43px"}}>
      <h1>Résultats</h1>
      <p>Bravo <strong>{pseudo}</strong> !</p>
      <p style={{ fontSize: 48 }}>{state?.score} / {state?.total}</p>
      <p>Ratio de bonnes réponses : <strong>{ratio}</strong></p>
      <p>Ton meilleur score : {meilleurScore}</p>
      <button
        onClick={() => navigate("/quiz")}
        style={{ padding: "12px 24px", marginRight: 12, borderRadius: 8, cursor: "pointer", background: "#5be26686" }}
      >
        Rejouer
      </button>
      <button
        onClick={() => navigate("/")}
        style={{ padding: "12px 24px", borderRadius: 8, cursor: "pointer", background: "#5be266c5" }}
      >
        Accueil
      </button>
    </div>
  );
}