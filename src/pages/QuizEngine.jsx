import { useReducer, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useUser } from "../context/UserContext";
import { useFetch } from "../hooks/useFetch";

const etatInitial = {
  indexQuestion: 0,
  score: 0,
  statut: "en_cours",
  reponseSelectionnee: null,
};

function quizReducer(state, action) {
  switch (action.type) {

    case "START_QUIZ":
      return { ...etatInitial };

    case "ANSWER_QUESTION": {
      const estCorrecte = action.reponse === action.bonneReponse;
      const nouveauScore = estCorrecte ? state.score + 1 : state.score;
      const prochaineQuestion = state.indexQuestion + 1;
      const estFini = prochaineQuestion >= action.totalQuestions;

      return {
        ...state,
        score: nouveauScore,
        reponseSelectionnee: action.reponse,
        indexQuestion: estFini ? state.indexQuestion : prochaineQuestion,
        statut: estFini ? "termine" : "en_cours",
      };
    }

    case "FINISH_QUIZ":
      return { ...state, statut: "termine" };

    default:
      return state;
  }
}

export default function QuizEngine() {
  const [state, dispatch] = useReducer(quizReducer, etatInitial);
  const { data: questions, loading } = useFetch("/questions.json");
  const { setMeilleurScore } = useUser();
  const navigate = useNavigate();

  const intervalRef = useRef(null);
  const [tempsRestant, setTempsRestant] = useState(60);

  // Chronomètre : useRef évite les re-rendus inutiles
  useEffect(() => {
    intervalRef.current = setInterval(() => {
      setTempsRestant((t) => {
        if (t <= 1) {
          clearInterval(intervalRef.current);
          dispatch({ type: "FINISH_QUIZ" });
          return 0;
        }
        return t - 1;
      });
    }, 1000);

    return () => clearInterval(intervalRef.current);
  }, []);

  // Redirection quand le quiz est terminé
  useEffect(() => {
    if (state.statut === "termine") {
      clearInterval(intervalRef.current);
      setMeilleurScore((prev) => Math.max(prev, state.score));
      navigate("/resultats", {
        state: { score: state.score, total: questions?.length },
      });
    }
  }, [state.statut, state.score, questions?.length, navigate, setMeilleurScore]);

  if (loading) return <p>Chargement des questions...</p>;

  const questionCourante = questions[state.indexQuestion];

  return (
    <div style={{ maxWidth: 600, margin: "0 auto", padding: 24 }}>
      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 16 }}>
        <span>Question {state.indexQuestion + 1} / {questions.length}</span>
        <span>⏱ {tempsRestant}s</span>
        <span>Score : {state.score}</span>
      </div>

      <h2>{questionCourante.libelle}</h2>
      <p style={{ color: "#888" }}>Catégorie : {questionCourante.categorie}</p>

      <div style={{ display: "grid", gap: 12, marginTop: 16 }}>
        {questionCourante.options.map((option) => (
          <button
            key={option}
            onClick={() =>
              dispatch({
                type: "ANSWER_QUESTION",
                reponse: option,
                bonneReponse: questionCourante.bonne_reponse,
                totalQuestions: questions.length,
              })
            }
            style={{
              padding: "12px 20px",
              borderRadius: 8,
              border: "1px solid #ccc",
              cursor: "pointer",
              background: state.reponseSelectionnee === option ? "#5be266c5" : "white",
              color: state.reponseSelectionnee === option ? "white" : "black",
            }}
          >
            {option}
          </button>
        ))}
      </div>
    </div>
  );
}