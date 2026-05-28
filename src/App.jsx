import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ProtectedRoute } from "./components/ProtectedRoute";
import Home from "./pages/Home";
import QuizEngine from "./pages/QuizEngine";
import Results from "./pages/Results";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />

        {/* Jalon 3 : /quiz et /resultats sont protégées */}
        <Route path="/quiz" element={
          <ProtectedRoute><QuizEngine /></ProtectedRoute>
        } />
        <Route path="/resultats" element={
          <ProtectedRoute><Results /></ProtectedRoute>
        } />
      </Routes>
    </BrowserRouter>
  );
}