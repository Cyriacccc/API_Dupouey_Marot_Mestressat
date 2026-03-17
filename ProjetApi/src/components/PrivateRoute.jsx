import { Navigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { CircularProgress, Box } from "@mui/material";

/* Composant de route privée qui vérifie si l'utilisateur est authentifié avant de rendre les enfants, sinon redirige vers la page de connexion. Affiche un indicateur de chargement pendant la vérification de l'authentification. */
export default function PrivateRoute({ children }) {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        height="100vh"
      >
        <CircularProgress />
      </Box>
    );
  }

  return user ? children : <Navigate to="/login" replace />;
}
