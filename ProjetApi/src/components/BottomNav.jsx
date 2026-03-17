import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import Paper from "@mui/material/Paper";
import HomeIcon from "@mui/icons-material/Home";
import GridViewIcon from "@mui/icons-material/GridView";
import StyleIcon from "@mui/icons-material/Style";
import SportsKabaddiIcon from "@mui/icons-material/SportsKabaddi";
import { Link, useLocation } from "react-router-dom";

const TABS = [
  { label: "Accueil", icon: <HomeIcon />, path: "/" },
  { label: "Collection", icon: <GridViewIcon />, path: "/collection" },
  { label: "Mon Deck", icon: <StyleIcon />, path: "/deck" },
  { label: "Combat", icon: <SportsKabaddiIcon />, path: "/lobby" },
];

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
