import { ref, get, set } from "firebase/database";
import { db } from "./firebase";
import { getCharacters } from "./rickMortyService";

/* Service pour gérer les cartes de personnages, en utilisant Firebase Realtime Database pour stocker les données. Fournit des fonctions pour initialiser les cartes à partir de l'API Rick and Morty si elles n'existent pas déjà, et pour récupérer toutes les cartes. Chaque carte contient des informations sur le personnage ainsi que des statistiques aléatoires d'attaque et de défense. */
const CARDS_REF = "cards";
const TOTAL_PAGES = 10; // 200 personnages (20 par page)

/* Fonction pour générer des statistiques aléatoires d'attaque et de défense pour chaque carte, avec des valeurs comprises entre 1 et 10. */
function generateStats() {
  return {
    atk: Math.floor(Math.random() * 10) + 1,
    def: Math.floor(Math.random() * 10) + 1,
  };
}

/* Fonction asynchrone pour initialiser les cartes dans la base de données Firebase si elles n'existent pas déjà, en récupérant les données de l'API Rick and Morty et en les transformant en objets de carte avec des statistiques. */
export async function initCardsIfNeeded() {
  const snapshot = await get(ref(db, CARDS_REF));
  if (snapshot.exists()) return;

  /* Récupère tous les personnages de l'API Rick and Morty en parcourant les pages, et crée un objet de carte pour chaque personnage avec ses informations et des statistiques aléatoires. Ensuite, stocke toutes les cartes dans la base de données Firebase sous la référence "cards". */
  const allCharacters = [];
  for (let page = 1; page <= TOTAL_PAGES; page++) {
    const data = await getCharacters(page);
    allCharacters.push(...data.results);
  }
/* Transforme la liste de personnages en un objet de cartes indexé par l'id du personnage, avec les propriétés id, name, image, status, species et les statistiques d'attaque et de défense générées aléatoirement. */
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

/* Fonction asynchrone pour récupérer toutes les cartes depuis la base de données Firebase, en lisant les données sous la référence "cards" et en retournant une liste de cartes. Si aucune carte n'existe, retourne une liste vide. */
export async function getAllCards() {
  const snapshot = await get(ref(db, CARDS_REF));
  if (!snapshot.exists()) return [];
  return Object.values(snapshot.val());
}

export async function getCardById(id) {
  const snapshot = await get(ref(db, `${CARDS_REF}/${id}`));
  return snapshot.exists() ? snapshot.val() : null;
}
