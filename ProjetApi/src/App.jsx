import { useEffect, useState } from "react";
import { ref, set, onValue } from "firebase/database";
import { db } from "./services/firebase";

function App() {
  const [status, setStatus] = useState("Connexion en cours...");
  const [error, setError] = useState(null);

  useEffect(() => {
    const testRef = ref(db, "test/connexion");

    // Écriture d'un message dans la DB
    set(testRef, {
      message: "Firebase connecté !",
      timestamp: Date.now(),
    })
      .then(() => {
        // Lecture en temps réel
        onValue(testRef, (snapshot) => {
          const data = snapshot.val();
          if (data) {
            setStatus(`✅ ${data.message}`);
          }
        });
      })
      .catch((err) => {
        setError(`❌ Erreur : ${err.message}`);
      });
  }, []);

  return (
    <div style={{ padding: "2rem", fontFamily: "monospace", fontSize: "1.2rem" }}>
      <h1>Test Firebase</h1>
      {error ? (
        <p style={{ color: "red" }}>{error}</p>
      ) : (
        <p style={{ color: "green" }}>{status}</p>
      )}
      <p style={{ color: "#888", fontSize: "0.9rem" }}>
        Vérifie aussi dans la console Firebase → Realtime Database → test/connexion
      </p>
    </div>
  );
}

export default App;
