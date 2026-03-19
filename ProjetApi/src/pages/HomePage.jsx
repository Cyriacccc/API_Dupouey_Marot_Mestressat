import { Avatar, Box, Button, Divider, Typography } from "@mui/material";
import LogoutIcon from "@mui/icons-material/Logout";
import { useAuth } from "../contexts/AuthContext";

/* Composant de page qui affiche le profil de l'utilisateur connecté avec son avatar, son nom et son email, ainsi qu'un bouton pour se déconnecter. */
export default function HomePage() {
  const { user, logout } = useAuth();

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
