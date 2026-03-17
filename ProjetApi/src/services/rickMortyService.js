const BASE_URL = "https://rickandmortyapi.com/api";

/* Service pour interagir avec l'API Rick and Morty, en fournissant des fonctions pour récupérer les personnages, les détails d'un personnage par son ID, et plusieurs personnages à la fois. Chaque fonction effectue une requête HTTP à l'API, vérifie que la réponse est valide, et retourne les données au format JSON. En cas d'erreur lors de la requête, une exception est levée avec un message d'erreur approprié. */
export async function getCharacters(page = 1) {
  const response = await fetch(`${BASE_URL}/character?page=${page}`);
  if (!response.ok) throw new Error("Failed to fetch characters");
  return response.json();
}

/* Fonction asynchrone pour récupérer les détails d'un personnage par son ID, en effectuant une requête HTTP à l'API Rick and Morty avec l'ID du personnage. Vérifie que la réponse est valide et retourne les données du personnage au format JSON. En cas d'erreur lors de la requête, une exception est levée avec un message d'erreur approprié. */
export async function getCharacterById(id) {
  const response = await fetch(`${BASE_URL}/character/${id}`);
  if (!response.ok) throw new Error(`Failed to fetch character ${id}`);
  return response.json();
}

/* Fonction asynchrone pour récupérer plusieurs personnages à la fois en fournissant une liste d'IDs, en effectuant une requête HTTP à l'API Rick and Morty avec les IDs des personnages. Vérifie que la réponse est valide et retourne les données des personnages au format JSON. Si un seul personnage est demandé, retourne un tableau contenant ce personnage pour assurer une consistance dans le format de retour. En cas d'erreur lors de la requête, une exception est levée avec un message d'erreur approprié. */
export async function getMultipleCharacters(ids) {
  const response = await fetch(`${BASE_URL}/character/${ids.join(",")}`);
  if (!response.ok) throw new Error("Failed to fetch characters");
  const data = await response.json();
  return Array.isArray(data) ? data : [data];
}
