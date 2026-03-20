const ROOT_ENDPOINT = "https://rickandmortyapi.com/api";


// Model class for a character card
export class Character {
  constructor(id, name, image, status, species) {
    this.id = id;
    this.name = name;
    this.image = image;
    this.status = status;
    this.species = species;
  }
}


class RickMortyService {
  async getCharactersByPage(page = 1) {
    const data = await this.fetchFromApi(
      `${ROOT_ENDPOINT}/character?page=${page}`
    );
    return { results: this.createCharacters(data.results), info: data.info };
  }


  async getCharacterById(id) {
    const data = await this.fetchFromApi(`${ROOT_ENDPOINT}/character/${id}`);
    return this.createCharacter(data);
  }


  async fetchFromApi(query) {
    console.log(`Fetching API with query ${query}`);
    try {
      const response = await fetch(query);
      return await response.json();
    } catch (e) {
      console.error(e);
    }
  }


  createCharacter(data) {
    return new Character(
      data.id,
      data.name,
      data.image,
      data.status,
      data.species
    );
  }


  createCharacters(data) {
    if (data == null) return [];
    return data.map((c) => this.createCharacter(c));
  }
}


export default new RickMortyService();



