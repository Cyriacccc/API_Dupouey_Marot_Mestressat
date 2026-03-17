import { useEffect, useState } from "react";
import {
  Box,
  Typography,
  CircularProgress,
  Alert,
  Button,
  TextField,
  InputAdornment,
  Chip,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import CardItem from "../components/CardItem";
import { getAllCards } from "../services/cardService";
import { saveDeck, getDeck } from "../services/deckService";
import { useAuth } from "../contexts/AuthContext";

const DECK_SIZE = 10;
/* Composant de page qui permet à l'utilisateur de construire son deck en sélectionnant des cartes parmi sa collection, avec une barre de recherche pour filtrer les cartes par nom. Gère le chargement des données, la sélection des cartes, la sauvegarde du deck et l'affichage des messages d'erreur ou de succès. */
export default function DeckPage() {
  const { user } = useAuth();
  const [cards, setCards] = useState([]);
  const [selected, setSelected] = useState([]); // liste d'ids
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const [search, setSearch] = useState("");
/* Utilise useEffect pour charger les cartes et le deck de l'utilisateur depuis les services cardService et deckService lors du montage du composant, en gérant les états de chargement et d'erreur */
  useEffect(() => {
    async function load() {
      try {
        const [allCards, savedDeck] = await Promise.all([
          getAllCards(),
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
/* Fonction pour basculer la sélection d'une carte en cliquant dessus, en ajoutant ou supprimant son id de la liste selected, et en réinitialisant le message de succès */
  function toggleCard(id) {
    setSuccess(false);
    setSelected((prev) => {
      if (prev.includes(id)) return prev.filter((x) => x !== id);
      if (prev.length >= DECK_SIZE) return prev;
      return [...prev, id];
    });
  }
/* Fonction asynchrone pour sauvegarder le deck de l'utilisateur en appelant la fonction saveDeck du service deckService, en gérant les états de sauvegarde, d'erreur et de succès */
  async function handleSave() {
    setSaving(true);
    setError(null);
    setSuccess(false);
    try {
      await saveDeck(user.uid, selected);
      setSuccess(true);
    } catch (err) {
      setError(err.message);
    } finally {
      setSaving(false);
    }
  }
/* Filtre les cartes en fonction de la recherche saisie par l'utilisateur, en comparant le nom de chaque carte avec la chaîne de recherche (insensible à la casse) */
  const filtered = cards.filter((c) =>
    c.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <Box p={3} pb={16} minHeight="100vh">
      <Typography variant="h4" fontWeight="bold" mb={1}>
        Mon Deck
      </Typography>
      <Typography variant="body2" color="text.secondary" mb={3}>
        Sélectionne exactement {DECK_SIZE} cartes. Les cartes surlignées en bleu
        sont dans ton deck.
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
        gap={2}
        zIndex={1200}
      >
        <Chip
          label={`${selected.length} / ${DECK_SIZE} cartes`}
          color={selected.length === DECK_SIZE ? "success" : "default"}
          sx={{ fontWeight: "bold", fontSize: "0.95rem" }}
        />
        <Box flexGrow={1} />
        {error && (
          <Alert severity="error" sx={{ py: 0 }}>
            {error}
          </Alert>
        )}
        {success && (
          <Alert severity="success" sx={{ py: 0 }}>
            Deck sauvegardé !
          </Alert>
        )}
        <Button
          variant="contained"
          color="success"
          disabled={selected.length !== DECK_SIZE || saving}
          onClick={handleSave}
          sx={{ textTransform: "none", fontWeight: "bold" }}
        >
          {saving ? "Sauvegarde..." : "Sauvegarder le deck"}
        </Button>
      </Box>
    </Box>
  );
}
