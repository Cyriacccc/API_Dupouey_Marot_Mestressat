 	import { db } from "./firebase";
import { ref, set, get, update, onValue } from "firebase/database";
import { getDeck } from "./deckService";
import CardService from "./cardService";


/* Service pour gérer les parties de jeu, en utilisant Firebase Realtime Database pour stocker les données. Fournit des fonctions pour créer une nouvelle partie, rejoindre une partie existante, et écouter les changements d'état d'une partie. Chaque partie contient un code unique, un statut (en attente, prête ou terminée), les informations des joueurs A et B, et la date de création. */
function generateGameCode() {
  return Math.random().toString(36).substring(2, 8).toUpperCase();
}


/* Fonction asynchrone pour créer une nouvelle partie de jeu, en générant un code unique et en stockant les informations du joueur A dans la base de données Firebase. Retourne le code de la partie créée. */
export async function createGame(userId, userDisplayName) {
  const code = generateGameCode();
  const gameRef = ref(db, `parties/${code}`);
  await set(gameRef, {
    code,
    status: "waiting",
    playerA: { uid: userId, displayName: userDisplayName },
    playerB: null,
    createdAt: new Date().toISOString(),
  });
  return code;
}


/* Fonction asynchrone pour rejoindre une partie existante, en vérifiant que la partie existe, qu'elle est en attente, et que le joueur qui rejoint n'est pas déjà dans la partie. Si toutes les conditions sont remplies, met à jour la partie dans la base de données Firebase avec les informations du joueur B et change le statut de la partie à "ready". Retourne les données de la partie mise à jour. */
export async function joinGame(code, userId, userDisplayName) {
  const gameRef = ref(db, `parties/${code}`);
  const snapshot = await get(gameRef);


  if (!snapshot.exists()) throw new Error("Partie introuvable.");


  const game = snapshot.val();
  if (game.status !== "waiting") throw new Error("Cette partie a déjà commencé.");
  if (game.playerA.uid === userId) throw new Error("Tu es déjà dans cette partie.");


  await update(gameRef, {
    playerB: { uid: userId, displayName: userDisplayName },
    status: "ready",
  });


  return game;
}


function pickRandom(arr, n) {
  const shuffled = [...arr].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, n);
}


export async function initGame(code) {
  const gameRef = ref(db, `parties/${code}`);
  const snapshot = await get(gameRef);
  if (!snapshot.exists()) throw new Error("Partie introuvable.");


  const game = snapshot.val();
  if (game.status !== "ready") return;


  const [deckA, deckB] = await Promise.all([
    getDeck(game.playerA.uid),
    getDeck(game.playerB.uid),
  ]);


  const fieldAIds = pickRandom(deckA, 3);
  const fieldBIds = pickRandom(deckB, 3);


  const remainingA = deckA.filter((id) => !fieldAIds.includes(id));
  const remainingB = deckB.filter((id) => !fieldBIds.includes(id));


  const [fieldACards, fieldBCards] = await Promise.all([
    Promise.all(fieldAIds.map((id) => CardService.getCardById(id))),
    Promise.all(fieldBIds.map((id) => CardService.getCardById(id))),
  ]);


  const activePlayer = Math.random() < 0.5 ? "A" : "B";


  await update(gameRef, {
    status: "playing",
    activePlayer,
    playerA: { ...game.playerA, hp: 5, deck: remainingA, field: fieldACards },
    playerB: { ...game.playerB, hp: 5, deck: remainingB, field: fieldBCards },
  });
}


/*  Fonction pour écouter les changements d'état d'une partie en temps réel, en utilisant la fonction onValue de Firebase Realtime Database. Prend en paramètre le code de la partie à écouter et une fonction de rappel qui sera appelée à chaque fois que les données de la partie changent, avec les nouvelles données de la partie en argument. Retourne une fonction de désabonnement pour arrêter l'écoute des changements. */
export function listenToGame(code, callback) {
  const gameRef = ref(db, `parties/${code}`);
  return onValue(gameRef, (snapshot) => {
    callback(snapshot.val());
  });
}



