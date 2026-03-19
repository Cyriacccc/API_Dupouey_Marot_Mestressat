import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  Box,
  Chip,
  IconButton,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

/* Définit les couleurs des chips en fonction du statut de la carte (Alive, Dead, unknown) */
const STATUS_COLORS = {
  Alive: "success",
  Dead: "error",
  unknown: "default",
};


/* Composant qui affiche les informations d'une carte (image, nom, statut, attaque et défense) et gère les interactions de sélection. Affiche un bouton de suppression si la prop onRemove est fournie. */
export default function CardItem({ card, onClick, selected = false, onRemove }) {
  return (
    <Card
      onClick={onClick}
      sx={{
        width: 180,
        cursor: onClick ? "pointer" : "default",
        border: selected ? "2px solid" : "2px solid transparent",
        borderColor: selected ? "primary.main" : "transparent",
        transition: "transform 0.15s, border-color 0.15s",
        position: "relative",
        "&:hover": onClick ? { transform: "scale(1.04)" } : {},
      }}
    >
      {onRemove && (
        <IconButton
          size="small"
          onClick={(e) => {
            e.stopPropagation();
            onRemove();
          }}
          sx={{
            position: "absolute",
            top: 4,
            right: 4,
            bgcolor: "rgba(255,255,255,0.85)",
            "&:hover": { bgcolor: "error.light", color: "white" },
            zIndex: 1,
          }}
        >
          <DeleteIcon fontSize="small" />
        </IconButton>
      )}
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
