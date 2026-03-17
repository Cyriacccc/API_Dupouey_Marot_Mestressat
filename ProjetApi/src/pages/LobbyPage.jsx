import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Typography,
  Button,
  TextField,
  Divider,
  Alert,
  CircularProgress,
  Paper,
  Chip,
} from "@mui/material";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import LoginIcon from "@mui/icons-material/Login";
import { useAuth } from "../contexts/AuthContext";
import { createGame, joinGame } from "../services/gameService";
import { getDeck } from "../services/deckService";
/* Composant de page qui permet à l'utilisateur de créer une partie ou de rejoindre une partie existante en entrant un code, avec des messages d'erreur et de chargement. Vérifie que l'utilisateur a construit un deck avant de lui permettre de créer ou rejoindre une partie. Gère la navigation vers la page de combat après avoir rejoint une partie. */
export default function LobbyPage() {
  const { user } = useAuth();
  const navigate = useNavigate();

  const [joinCode, setJoinCode] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [waitingCode, setWaitingCode] = useState(null);
/* Fonction asynchrone pour vérifier que l'utilisateur a construit un deck de 10 cartes en appelant la fonction getDeck du service deckService, et en lançant une erreur si ce n'est pas le cas */
  async function checkDeck() {
    const deck = await getDeck(user.uid);
    if (!deck || deck.length < 10) {
      throw new Error("Tu dois d'abord construire un deck de 10 cartes.");
    }
  }
/* Fonction asynchrone pour créer une partie en appelant la fonction createGame du service gameService, en gérant les états de chargement et d'erreur, et en stockant le code de la partie créée pour l'afficher à l'utilisateur en attendant qu'un adversaire rejoigne. */
  async function handleCreate() {
    setError(null);
    setLoading(true);
    try {
      await checkDeck();
      const code = await createGame(user.uid, user.displayName);
      setWaitingCode(code);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }
/* Fonction asynchrone pour rejoindre une partie en appelant la fonction joinGame du service gameService, en gérant les états de chargement et d'erreur, et en naviguant vers la page de combat si la jonction est réussie. */
  async function handleJoin() {
    setError(null);
    setLoading(true);
    try {
      await checkDeck();
      await joinGame(joinCode.trim().toUpperCase(), user.uid, user.displayName);
      navigate(`/combat/${joinCode.trim().toUpperCase()}`);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  if (waitingCode) {
    return (
      <Box
        p={3}
        pb={10}
        display="flex"
        flexDirection="column"
        alignItems="center"
        gap={3}
        mt={4}
      >
        <Typography variant="h5" fontWeight="bold">
          Partie créée !
        </Typography>
        <Typography variant="body1" color="text.secondary" textAlign="center">
          Partage ce code à ton adversaire :
        </Typography>
        <Chip
          label={waitingCode}
          color="primary"
          sx={{ fontSize: "2rem", px: 3, py: 3, letterSpacing: 4 }}
        />
        <CircularProgress sx={{ mt: 2 }} />
        <Typography variant="body2" color="text.secondary">
          En attente d'un adversaire...
        </Typography>
        <Button
          variant="outlined"
          color="error"
          onClick={() => setWaitingCode(null)}
        >
          Annuler
        </Button>
      </Box>
    );
  }

  return (
    <Box p={3} pb={10} maxWidth={480} mx="auto">
      <Typography variant="h4" fontWeight="bold" mb={1}>
        Combat
      </Typography>
      <Typography variant="body2" color="text.secondary" mb={4}>
        Crée une partie ou rejoins celle d'un ami.
      </Typography>

      {error && (
        <Alert severity="error" sx={{ mb: 3 }}>
          {error}
        </Alert>
      )}

      <Paper variant="outlined" sx={{ p: 3, mb: 3 }}>
        <Typography variant="h6" fontWeight="bold" mb={1}>
          Créer une partie
        </Typography>
        <Typography variant="body2" color="text.secondary" mb={2}>
          Un code unique sera généré pour que ton adversaire puisse te rejoindre.
        </Typography>
        <Button
          variant="contained"
          startIcon={<AddCircleOutlineIcon />}
          onClick={handleCreate}
          disabled={loading}
          fullWidth
          sx={{ textTransform: "none", fontWeight: "bold" }}
        >
          {loading ? "Création..." : "Créer une partie"}
        </Button>
      </Paper>

      <Divider sx={{ my: 3 }}>OU</Divider>

      <Paper variant="outlined" sx={{ p: 3 }}>
        <Typography variant="h6" fontWeight="bold" mb={1}>
          Rejoindre une partie
        </Typography>
        <Typography variant="body2" color="text.secondary" mb={2}>
          Entre le code de la partie partagé par ton adversaire.
        </Typography>
        <Box display="flex" gap={1}>
          <TextField
            placeholder="Ex : A3F8KZ"
            value={joinCode}
            onChange={(e) => setJoinCode(e.target.value.toUpperCase())}
            size="small"
            inputProps={{ maxLength: 6, style: { letterSpacing: 3, fontWeight: "bold" } }}
            sx={{ flexGrow: 1 }}
          />
          <Button
            variant="contained"
            color="secondary"
            startIcon={<LoginIcon />}
            onClick={handleJoin}
            disabled={loading || joinCode.trim().length !== 6}
            sx={{ textTransform: "none", fontWeight: "bold" }}
          >
            Rejoindre
          </Button>
        </Box>
      </Paper>
    </Box>
  );
}
