import { db } from "./firebase";
import { ref, set, get, update, onValue } from "firebase/database";

function generateGameCode() {
  return Math.random().toString(36).substring(2, 8).toUpperCase();
}

export async function createGame(userId, userDisplayName) {
  const code = generateGameCode();
  const gameRef = ref(db, `parties/${code}`);
  await set(gameRef, {
    code,
    status: "waiting",
    playerA: { uid: userId, displayName: userDisplayName },
    playerB: null,
    createdAt: Date.now(),
  });
  return code;
}

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

export function listenToGame(code, callback) {
  const gameRef = ref(db, `parties/${code}`);
  return onValue(gameRef, (snapshot) => {
    callback(snapshot.val());
  });
}
