import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  Box,
  Chip,
} from "@mui/material";

/* Définit les couleurs des chips en fonction du statut de la carte (Alive, Dead, unknown) */
const STATUS_COLORS = {
  Alive: "success",
  Dead: "error",
  unknown: "default",
};


/* Composant qui affiche les informations d'une carte (image, nom, statut, attaque et défense) et gère les interactions de sélection */
export default function CardItem({ card, onClick, selected = false }) {
  return (
    <Card
      onClick={onClick}
      sx={{
        width: 180,
        cursor: onClick ? "pointer" : "default",
        border: selected ? "2px solid" : "2px solid transparent",
        borderColor: selected ? "primary.main" : "transparent",
        transition: "transform 0.15s, border-color 0.15s",
        "&:hover": onClick ? { transform: "scale(1.04)" } : {},
      }}
      /* Permet de sélectionner une carte en cliquant dessus, en changeant son apparence (bordure et effet de zoom) pour indiquer qu'elle est sélectionnée */
    >
      <CardMedia
        component="img"
        height="180"
        image={card.image}
        alt={card.name}
      />
      <CardContent sx={{ p: 1.5, "&:last-child": { pb: 1.5 } }}>
        <Typography
          variant="body2"
          fontWeight="bold"
          noWrap
          title={card.name}
          mb={0.5}
        >
          {card.name}
        </Typography>
        <Chip
          label={card.status}
          color={STATUS_COLORS[card.status] ?? "default"}
          size="small"
          sx={{ mb: 1 }}
        />
        <Box display="flex" justifyContent="space-between">
          <Typography variant="caption" color="error.light">
            ⚔ ATK {card.atk}
          </Typography>
          <Typography variant="caption" color="info.light">
            🛡 DEF {card.def}
          </Typography>
        </Box>
      </CardContent>
    </Card>
  );
}
