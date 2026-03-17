import { createContext, useContext, useEffect, useState } from "react";
import { onAuthStateChanged, signInWithPopup, signOut } from "firebase/auth";
import { auth, googleProvider } from "../services/firebase";

const AuthContext = createContext(null); /* Crée un contexte pour l'authentification */

/* Fournit les données d'authentification et les fonctions de connexion/déconnexion à l'ensemble de l'application */
export function AuthProvider({ children }) {
  const [user, setUser] = useState(null); /* Stocke les informations de l'utilisateur connecté */
  const [loading, setLoading] = useState(true);/* Indique si l'état de l'authentification est en cours de chargement */

/* Utilise useEffect pour écouter les changements d'état de l'authentification Firebase */
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      setUser(firebaseUser);
      setLoading(false);
    });
    return unsubscribe;
  }, []);

  /* Fonction pour se connecter avec Google en utilisant Firebase */
  const loginWithGoogle = () => signInWithPopup(auth, googleProvider);
  /* Fonction pour se déconnecter de l'application en utilisant Firebase */
  const logout = () => signOut(auth);

  return (
    <AuthContext.Provider value={{ user, loading, loginWithGoogle, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

/* Hook personnalisé pour accéder au contexte d'authentification dans les composants */
export function useAuth() {
  return useContext(AuthContext);
}
