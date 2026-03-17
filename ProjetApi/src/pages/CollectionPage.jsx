import { useEffect, useState } from "react";
import {
  Box,
  Typography,
  CircularProgress,
  Alert,
  TextField,
  InputAdornment,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import CardItem from "../components/CardItem";
import { initCardsIfNeeded, getAllCards } from "../services/cardService";

/* Composant de page qui affiche la collection de cartes de l'utilisateur, avec une barre de recherche pour filtrer les cartes par nom. Gère le chargement des données, les erreurs et l'affichage des cartes. */
export default function CollectionPage() {
  const [cards, setCards] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [search, setSearch] = useState("");
  
  /* Utilise useEffect pour charger les cartes depuis le service cardService lors du montage du composant, en gérant les états de chargement et d'erreur */
  useEffect(() => {
    async function load() {
      try {
        await initCardsIfNeeded();
        const data = await getAllCards();
        setCards(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);


/* Filtre les cartes en fonction de la recherche saisie par l'utilisateur, en comparant le nom de chaque carte avec la chaîne de recherche (insensible à la casse) */
  const filtered = cards.filter((c) =>
    c.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <Box p={3} pb={10} minHeight="100vh">
      <Typography variant="h4" fontWeight="bold" mb={3}>
        Collection
      </Typography>

      <TextField
        placeholder="Rechercher un personnage..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        size="small"
        sx={{ mb: 3, width: 300 }}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon />
            </InputAdornment>
          ),
        }}
      />

      {loading && (
        <Box display="flex" justifyContent="center" mt={6}>
          <CircularProgress />
        </Box>
      )}

      {error && <Alert severity="error">{error}</Alert>}

      {!loading && !error && (
        <Box display="flex" flexWrap="wrap" gap={2}>
          {filtered.map((card) => (
            <CardItem key={card.id} card={card} />
          ))}
          {filtered.length === 0 && (
            <Typography color="text.secondary">Aucun résultat.</Typography>
          )}
        </Box>
      )}
    </Box>
  );
}
