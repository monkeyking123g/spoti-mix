import { SearchTracks } from "./types";

export const getSearch = async (
  token: string,
  searchInput: string,
  type: string
): Promise<SearchTracks> => {
  const result = await fetch(
    `https://api.spotify.com/v1/search?q=${searchInput}&type=${type}`,
    {
      method: "GET",
      headers: { Authorization: `Bearer ${token}` },
    }
  );
  const data = await result.json();
  return data;
};
