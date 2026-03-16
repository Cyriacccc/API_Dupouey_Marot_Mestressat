const BASE_URL = "https://rickandmortyapi.com/api";

export async function getCharacters(page = 1) {
  const response = await fetch(`${BASE_URL}/character?page=${page}`);
  if (!response.ok) throw new Error("Failed to fetch characters");
  return response.json();
}

export async function getCharacterById(id) {
  const response = await fetch(`${BASE_URL}/character/${id}`);
  if (!response.ok) throw new Error(`Failed to fetch character ${id}`);
  return response.json();
}

export async function getMultipleCharacters(ids) {
  const response = await fetch(`${BASE_URL}/character/${ids.join(",")}`);
  if (!response.ok) throw new Error("Failed to fetch characters");
  const data = await response.json();
  return Array.isArray(data) ? data : [data];
}
