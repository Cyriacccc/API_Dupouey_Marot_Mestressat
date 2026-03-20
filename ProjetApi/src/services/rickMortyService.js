const ROOT_ENDPOINT = "https://rickandmortyapi.com/api";


/*On crée notre modèle de cartes (ca permet d'avoir tout ceux dont nous avons besoin pour la suites et pas des infos inutiles*/
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
    /* Récupère les personnages de la page spécifiée en appelant l'API Rick & Morty, puis crée des instances de Character à partir des données reçues. Retourne un objet contenant la liste des personnages et les informations de pagination. */
    const data = await this.fetchFromApi(
      `${ROOT_ENDPOINT}/character?page=${page}`
    );
    return { results: this.createCharacters(data.results), info: data.info }; /* On transforme les données brutes de l'API en instances de notre classe Character, ce qui nous permet d'avoir une structure de données plus adaptée à notre application. */
  }

/*Récupère un personnage et le transforme en caractère*/
  async getCharacterById(id) {
    const data = await this.fetchFromApi(`${ROOT_ENDPOINT}/character/${id}`);
    return this.createCharacter(data);
  }

/* On va sur internet, on recupère les données et on les transforme en objet JavaScript*/
  async fetchFromApi(query) {
    console.log(`Fetching API with query ${query}`);/*On fait une requete Http*/
    try {
      const response = await fetch(query);
      return await response.json(); /*On parse la reponse en json et on la retourne*/
    } catch (e) {
      console.error(e);
    }
    /*En cas d'erreur lors de la requête, on log l'erreur dans la console. Cela permet de diagnostiquer les problèmes de connexion ou les erreurs de l'API. */
  }

/* On crée une instance de Character à partir des données brutes de l'API, en extrayant les propriétés pertinentes (id, name, image, status, species) et en les assignant aux champs de la classe Character. Cela nous permet d'avoir une structure de données plus cohérente et facile à manipuler dans notre application. */
  createCharacter(data) {
    return new Character(
      data.id,
      data.name,
      data.image,
      data.status,
      data.species
    );
  }

/* On vérfie que les données existent et transforme chaque élément en Charactrer*/
  createCharacters(data) {
    if (data == null) return [];
    return data.map((c) => this.createCharacter(c));
  }
}


export default new RickMortyService();



