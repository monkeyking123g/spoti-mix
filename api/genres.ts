import { Genre } from "./types";

export const getGenres = async (token: string): Promise<Genre[]> => {
  const result = await fetch(
    `https://api.spotify.com/v1/browse/categories?locale=sv_US`,
    {
      method: "GET",
      headers: { Authorization: `Bearer ${token}` },
    }
  );

  const data: { categories: { items: Genre[] } } = await result.json();
  return data.categories.items;
};
