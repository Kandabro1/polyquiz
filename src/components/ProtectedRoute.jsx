import { Navigate } from "react-router-dom";
import { useUser } from "../context/UserContext";

// Principe : ce composant est un "gardien de route"
// Il rend ses enfants SEULEMENT si le pseudo existe
export function ProtectedRoute({ children }) {
  const { pseudo } = useUser();

  // Si pas de pseudo → redirection immédiate vers "/"
  if (!pseudo) {
    return <Navigate to="/" replace />;
  }

  return children; // Sinon → on affiche la page demandée
}