import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  Box,
  Chip,
} from "@mui/material";

const STATUS_COLORS = {
  Alive: "success",
  Dead: "error",
  unknown: "default",
};

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
