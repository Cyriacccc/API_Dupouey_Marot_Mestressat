import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Box, Button, Typography, Paper } from "@mui/material";
import GoogleIcon from "@mui/icons-material/Google";
import { useAuth } from "../contexts/AuthContext";

export default function LoginPage() {
  const { user, loginWithGoogle } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (user) navigate("/", { replace: true });
  }, [user, navigate]);

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
