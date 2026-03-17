import { Avatar, Box, Button, Divider, Typography } from "@mui/material";
import LogoutIcon from "@mui/icons-material/Logout";
import StyleIcon from "@mui/icons-material/Style";
import GridViewIcon from "@mui/icons-material/GridView";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

/* Composant de page qui affiche le profil de l'utilisateur connecté, avec son avatar, son nom et son email, ainsi que des boutons pour naviguer vers la collection de cartes et la construction du deck, et un bouton pour se déconnecter. Gère la navigation entre les différentes pages de l'application. */
export default function HomePage() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  return (
    <Box p={3} pb={10}>
      <Typography variant="h5" fontWeight="bold" mb={3}>
        Mon profil
      </Typography>

      <Box display="flex" alignItems="center" gap={2} mb={3}>
        <Avatar src={user?.photoURL} sx={{ width: 64, height: 64 }} />
        <Box>
          <Typography variant="h6">{user?.displayName}</Typography>
          <Typography variant="body2" color="text.secondary">
            {user?.email}
          </Typography>
        </Box>
      </Box>

      <Divider sx={{ mb: 3 }} />

      <Typography variant="subtitle1" fontWeight="bold" mb={2}>
        Navigation rapide
      </Typography>

      <Box display="flex" flexDirection="column" gap={1.5} mb={4}>
        <Button
          variant="outlined"
          startIcon={<GridViewIcon />}
          onClick={() => navigate("/collection")}
          sx={{ justifyContent: "flex-start", textTransform: "none" }}
        >
          Voir la collection de cartes
        </Button>
        <Button
          variant="outlined"
          startIcon={<StyleIcon />}
          onClick={() => navigate("/deck")}
          sx={{ justifyContent: "flex-start", textTransform: "none" }}
        >
          Construire mon deck
        </Button>
      </Box>

      <Divider sx={{ mb: 3 }} />

      <Button
        variant="outlined"
        color="error"
        startIcon={<LogoutIcon />}
        onClick={logout}
        sx={{ textTransform: "none" }}
      >
        Se déconnecter
      </Button>
    </Box>
  );
}
