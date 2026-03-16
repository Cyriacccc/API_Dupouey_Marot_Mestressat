import { ref, set, get } from "firebase/database";
import { db } from "./firebase";

const DECK_SIZE = 10;

export async function saveDeck(userId, cardIds) {
  if (cardIds.length !== DECK_SIZE) {
    throw new Error(`Le deck doit contenir exactement ${DECK_SIZE} cartes.`);
  }
  await set(ref(db, `decks/${userId}`), cardIds);
}

export async function getDeck(userId) {
  const snapshot = await get(ref(db, `decks/${userId}`));
  return snapshot.exists() ? snapshot.val() : [];
}
