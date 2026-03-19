import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import Paper from "@mui/material/Paper";
import HomeIcon from "@mui/icons-material/Home";
import CollectionsIcon from "@mui/icons-material/Collections";
import StyleIcon from "@mui/icons-material/Style";
import SportsKabaddiIcon from "@mui/icons-material/SportsKabaddi";
import { Link, useLocation } from "react-router-dom";

/* Définit les onglets de navigation avec leurs étiquettes, icônes et chemins correspondants */
const TABS = [
  { label: "Accueil", icon: <HomeIcon />, path: "/" },
  { label: "Choix du deck", icon: <StyleIcon />, path: "/deck" },
  { label: "Mon Deck", icon: <CollectionsIcon />, path: "/mon-deck" },
  { label: "Combat", icon: <SportsKabaddiIcon />, path: "/lobby" },
];

/* Composant de navigation en bas de l'écran qui affiche les onglets définis dans TABS et gère la navigation entre les différentes pages de l'application */
export default function BottomNav() {
  const location = useLocation();
  const value = TABS.findIndex((t) => t.path === location.pathname);

  return (
    <Paper
      sx={{ position: "fixed", bottom: 0, left: 0, right: 0 }}
      elevation={3}
    >
      <BottomNavigation
        showLabels
        value={value}
      >
        {TABS.map((tab) => (
          <BottomNavigationAction
            key={tab.path}
            label={tab.label}
            icon={tab.icon}
            component={Link}
            to={tab.path}
          />
        ))}
      </BottomNavigation>
    </Paper>
  );
}
