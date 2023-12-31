import { SpotifyTrack } from "./types";

export const getTracks = async (
  token: string,
  tracksEndPoint: string
): Promise<SpotifyTrack[]> => {
  const limit = 20;

  const result = await fetch(`${tracksEndPoint}?limit=${limit}`, {
    method: "GET",
    headers: { Authorization: `Bearer ${token}` },
  });

  if (!result.ok) {
    return [];
  }

  const data: { items: SpotifyTrack[] } = await result.json();
  return data.items;
};
