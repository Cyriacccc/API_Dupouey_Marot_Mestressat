import { useEffect, useState } from "react";
import {
  Box,
  Typography,
  CircularProgress,
  Alert,
  Chip,
  Snackbar,
} from "@mui/material";
import CardItem from "../components/CardItem";
import { getAllCards } from "../services/cardService";
import { getDeck, saveDeck } from "../services/deckService";
import { useAuth } from "../contexts/AuthContext";

/* Composant de page qui affiche uniquement les cartes composant le deck du joueur connecté. Charge le deck sauvegardé depuis Firebase et affiche les cartes correspondantes avec leurs statistiques. */
export default function MyDeckPage() {
  const { user } = useAuth();
  const [deckCards, setDeckCards] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [snackbar, setSnackbar] = useState(false);

  useEffect(() => {
    async function load() {
      try {
        const [savedDeck, allCards] = await Promise.all([
          getDeck(user.uid),
          getAllCards(),
        ]);
        const cardsMap = Object.fromEntries(allCards.map((c) => [c.id, c]));
        setDeckCards(savedDeck.map((id) => cardsMap[id]).filter(Boolean));
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, [user.uid]);

  async function handleRemove(cardId) {
    const updated = deckCards.filter((c) => c.id !== cardId);
    setDeckCards(updated);
    await saveDeck(user.uid, updated.map((c) => c.id));
    setSnackbar(true);
  }

  return (
    <Box p={3} pb={16} minHeight="100vh">
      <Box display="flex" alignItems="center" gap={2} mb={1}>
        <Typography variant="h4" fontWeight="bold">
          Mon deck
        </Typography>
        {!loading && (
          <Chip
            label={`${deckCards.length} / 10`}
            color={deckCards.length === 10 ? "success" : "warning"}
            sx={{ fontWeight: "bold" }}
          />
        )}
      </Box>
      <Typography variant="body2" color="text.secondary" mb={3}>
        Tu peux retirer une carte de ton deck en cliquant sur la corbeille.
      </Typography>

      {loading && (
        <Box display="flex" justifyContent="center" mt={6}>
          <CircularProgress />
        </Box>
      )}

      {error && <Alert severity="error">{error}</Alert>}

      {!loading && !error && deckCards.length === 0 && (
        <Alert severity="info">
          Tu n&apos;as pas encore de deck. Va dans &quot;Choix du deck&quot;
          pour en construire un.
        </Alert>
      )}

      {!loading && !error && (
        <Box display="flex" flexWrap="wrap" gap={2}>
          {deckCards.map((card) => (
            <CardItem
              key={card.id}
              card={card}
              onRemove={() => handleRemove(card.id)}
            />
          ))}
        </Box>
      )}

      <Snackbar
        open={snackbar}
        autoHideDuration={2000}
        onClose={() => setSnackbar(false)}
        message="Carte retirée du deck"
      />
    </Box>
  );
}
