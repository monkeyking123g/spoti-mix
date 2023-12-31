import { Playlist } from "./types";

export const getPlaylistByGenre = async (
  token: string,
  genreId: string
): Promise<Playlist[]> => {
  const limit = 10;

  const result = await fetch(
    `https://api.spotify.com/v1/browse/categories/${genreId}/playlists?limit=${limit}`,
    {
      method: "GET",
      headers: { Authorization: `Bearer ${token}` },
    }
  );

  if (!result.ok) {
    return [];
  }

  const data: { playlists: { items: Playlist[] } } = await result.json();
  return data.playlists.items;
};
