import { ref, set, get } from "firebase/database";
import { db } from "./firebase";

const DECK_SIZE = 10;

/* Service pour gérer les decks de cartes des utilisateurs, en utilisant Firebase Realtime Database pour stocker les données. Fournit des fonctions pour sauvegarder un deck de cartes pour un utilisateur donné, et pour récupérer le deck d'un utilisateur. Chaque deck est une liste d'identifiants de cartes, et doit contenir exactement 10 cartes pour être valide. */
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
