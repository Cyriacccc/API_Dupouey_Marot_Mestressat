import { AppBar, Toolbar, Typography, Avatar, Box } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

export default function NavBar() {
  const { user } = useAuth();
  const navigate = useNavigate();

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography
          variant="h6"
          sx={{ flexGrow: 1, cursor: "pointer", fontWeight: "bold" }}
          onClick={() => navigate("/")}
        >
          R&M Card Game
        </Typography>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 1,
            cursor: "pointer",
          }}
          onClick={() => navigate("/")}
        >
          <Avatar src={user?.photoURL} sx={{ width: 32, height: 32 }} />
          <Typography variant="body2">{user?.displayName}</Typography>
        </Box>
      </Toolbar>
    </AppBar>
  );
}
