import { useState, useEffect } from "react";

export function useFetch(url) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true); // true par défaut dès le départ
  const [error, setError] = useState(null);

  useEffect(() => {
    let ignore = false;

    // Tout le setState est déplacé dans les callbacks async
    fetch(url)
      .then((res) => {
        if (!res.ok) throw new Error("Erreur réseau : " + res.status);
        return res.json();
      })
      .then((json) => {
        if (!ignore) {
          setData(json);
          setLoading(false); // ← dans le callback, pas dans le corps
        }
      })
      .catch((err) => {
        if (!ignore) {
          setError(err.message);
          setLoading(false);
        }
      });

    return () => {
      ignore = true;
    };
  }, [url]);

  return { data, loading, error };
}