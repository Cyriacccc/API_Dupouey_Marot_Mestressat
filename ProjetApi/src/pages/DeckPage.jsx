import { useEffect, useState } from "react";
import {
  Box,
  Typography,
  CircularProgress,
  Alert,
  TextField,
  InputAdornment,
  Chip,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import CardItem from "../components/CardItem";
import CardService from "../services/cardService";
import { saveDeck, getDeck } from "../services/deckService";
import { useAuth } from "../contexts/AuthContext";

const DECK_SIZE = 10;

/* Composant de page qui permet à l'utilisateur de construire son deck en sélectionnant des cartes parmi sa collection, avec une barre de recherche pour filtrer les cartes par nom. La sauvegarde est automatique à chaque sélection ou désélection de carte. */
export default function DeckPage() {
  const { user } = useAuth();
  const [cards, setCards] = useState([]);
  const [selected, setSelected] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [search, setSearch] = useState("");

  /* Utilise useEffect pour charger les cartes et le deck de l'utilisateur depuis les services cardService et deckService lors du montage du composant */
  useEffect(() => {
    async function load() {
      try {
        await CardService.initCardsIfNeeded();
        const [allCards, savedDeck] = await Promise.all([
          CardService.getAllCards(),
          getDeck(user.uid),
        ]);
        setCards(allCards);
        setSelected(savedDeck);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, [user.uid]);

  /* Bascule la sélection d'une carte et sauvegarde automatiquement le deck mis à jour dans Firebase */
  async function toggleCard(id) {
    const newSelected = selected.includes(id)
      ? selected.filter((x) => x !== id)
      : selected.length >= DECK_SIZE
        ? selected
        : [...selected, id];

    setSelected(newSelected);
    await saveDeck(user.uid, newSelected);
  }

  /* Filtre les cartes en fonction de la recherche saisie par l'utilisateur */
  const filtered = cards.filter((c) =>
    c.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <Box p={3} pb={14} minHeight="100vh">
      <Typography variant="h4" fontWeight="bold" mb={1}>
        Choisis tes cartes !
      </Typography>
      <Typography variant="body2" color="text.secondary" mb={3}>
        Sélectionne exactement {DECK_SIZE} cartes. Les cartes surlignées sont
        dans ton deck. La sélection est sauvegardée automatiquement.
      </Typography>

      <TextField
        placeholder="Rechercher..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        size="small"
        sx={{ width: 280, mb: 3 }}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon />
            </InputAdornment>
          ),
        }}
      />

      {loading ? (
        <Box display="flex" justifyContent="center" mt={6}>
          <CircularProgress />
        </Box>
      ) : (
        <Box display="flex" flexWrap="wrap" gap={2}>
          {filtered.map((card) => (
            <CardItem
              key={card.id}
              card={card}
              selected={selected.includes(card.id)}
              onClick={() => toggleCard(card.id)}
            />
          ))}
        </Box>
      )}

      {error && (
        <Alert severity="error" sx={{ mt: 2 }}>
          {error}
        </Alert>
      )}

      {/* Barre flottante fixe en bas */}
      <Box
        position="fixed"
        bottom={56}
        left={0}
        right={0}
        bgcolor="background.paper"
        borderTop={1}
        borderColor="divider"
        px={3}
        py={1.5}
        display="flex"
        alignItems="center"
        zIndex={1200}
      >
        <Chip
          label={`${selected.length} / ${DECK_SIZE} cartes`}
          color={selected.length === DECK_SIZE ? "success" : "default"}
          sx={{ fontWeight: "bold", fontSize: "0.95rem" }}
        />
      </Box>
    </Box>
  );
}
