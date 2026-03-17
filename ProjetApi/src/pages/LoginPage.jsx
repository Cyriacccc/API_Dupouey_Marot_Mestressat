import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Box, Button, Typography, Paper } from "@mui/material";
import GoogleIcon from "@mui/icons-material/Google";
import { useAuth } from "../contexts/AuthContext";
/* Composant de page qui affiche un écran de connexion avec un bouton pour se connecter avec Google, et qui redirige vers la page d'accueil si l'utilisateur est déjà connecté. Gère la connexion avec Google en appelant la fonction loginWithGoogle du contexte d'authentification, et affiche une erreur en cas d'échec de la connexion. */
export default function LoginPage() {
  const { user, loginWithGoogle } = useAuth();
  const navigate = useNavigate();
/* Utilise l'effet useEffect pour vérifier si l'utilisateur est déjà connecté au chargement de la page, et redirige vers la page d'accueil si c'est le cas. */
  useEffect(() => {
    if (user) navigate("/", { replace: true });
  }, [user, navigate]);
/* Fonction asynchrone pour gérer la connexion avec Google en appelant la fonction loginWithGoogle du contexte d'authentification, et en affichant une erreur en cas d'échec de la connexion. */
  const handleLogin = async () => {
    try {
      await loginWithGoogle();
    } catch (err) {
      console.error("Erreur de connexion :", err);
    }
  };

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      height="100vh"
    >
      <Paper
        elevation={3}
        sx={{
          p: 6,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 3,
          borderRadius: 3,
          minWidth: 320,
        }}
      >
        <Typography variant="h4" fontWeight="bold" color="primary">
          R&M Card Game
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Connecte-toi pour jouer
        </Typography>
        <Button
          variant="contained"
          size="large"
          startIcon={<GoogleIcon />}
          onClick={handleLogin}
          sx={{ mt: 1, textTransform: "none", fontWeight: "bold" }}
        >
          Se connecter avec Google
        </Button>
      </Paper>
    </Box>
  );
}
