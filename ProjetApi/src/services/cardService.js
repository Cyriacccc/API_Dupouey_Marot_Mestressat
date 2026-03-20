import { ref, get, set } from "firebase/database";
import { db } from "./firebase";
import RickMortyService from "./rickMortyService";


const CARDS_REF = "cards";
const TOTAL_PAGES = 10; // 200 personnages (20 par page)


// Model class for a game card, extends character data with ATK/DEF stats
export class Card {
  constructor(id, name, image, status, species, atk, def) {
    this.id = id;
    this.name = name;
    this.image = image;
    this.status = status;
    this.species = species;
    this.atk = atk;
    this.def = def;
  }
}


class CardService {
  generateStats() {
    return {
      atk: Math.floor(Math.random() * 10) + 1,
      def: Math.floor(Math.random() * 10) + 1,
    };
  }


  createCard(character) {
    const { atk, def } = this.generateStats();
    return new Card(
      character.id,
      character.name,
      character.image,
      character.status,
      character.species,
      atk,
      def
    );
  }


  // Initialize cards in Firebase from Rick & Morty API (only once, common to all users)
  async initCardsIfNeeded() {
    const snapshot = await get(ref(db, CARDS_REF));
    if (snapshot.exists()) return;


    const allCharacters = [];
    for (let page = 1; page <= TOTAL_PAGES; page++) {
      const data = await RickMortyService.getCharactersByPage(page);
      allCharacters.push(...data.results);
    }


    const cardsMap = {};
    for (const character of allCharacters) {
      const card = this.createCard(character);
      cardsMap[card.id] = card;
    }


    await set(ref(db, CARDS_REF), cardsMap);
  }


  async getAllCards() {
    const snapshot = await get(ref(db, CARDS_REF));
    if (!snapshot.exists()) return [];
    return Object.values(snapshot.val());
  }


  async getCardById(id) {
    const snapshot = await get(ref(db, `${CARDS_REF}/${id}`));
    return snapshot.exists() ? snapshot.val() : null;
  }
}


export default new CardService();


