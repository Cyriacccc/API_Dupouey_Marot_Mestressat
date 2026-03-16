import { ref, get, set } from "firebase/database";
import { db } from "./firebase";
import { getCharacters } from "./rickMortyService";

const CARDS_REF = "cards";
const TOTAL_PAGES = 3; // 60 personnages (20 par page)

function generateStats() {
  return {
    atk: Math.floor(Math.random() * 10) + 1,
    def: Math.floor(Math.random() * 10) + 1,
  };
}

export async function initCardsIfNeeded() {
  const snapshot = await get(ref(db, CARDS_REF));
  if (snapshot.exists()) return;

  const allCharacters = [];
  for (let page = 1; page <= TOTAL_PAGES; page++) {
    const data = await getCharacters(page);
    allCharacters.push(...data.results);
  }

  const cardsMap = {};
  for (const character of allCharacters) {
    cardsMap[character.id] = {
      id: character.id,
      name: character.name,
      image: character.image,
      status: character.status,
      species: character.species,
      ...generateStats(),
    };
  }

  await set(ref(db, CARDS_REF), cardsMap);
}

export async function getAllCards() {
  const snapshot = await get(ref(db, CARDS_REF));
  if (!snapshot.exists()) return [];
  return Object.values(snapshot.val());
}
