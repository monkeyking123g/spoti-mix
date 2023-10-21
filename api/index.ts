const CLIENT_ID: string = "c7dcfaa3740442c2be8b11f035539845";
const CLIENT_SECRET: string = "f7017db86d2243b79d6d5d59943055dc";

interface AccessTokenResponse {
  access_token: string;
}

interface SpotifyTrack {
    album: {
      album_type: string;
      artists: {
        external_urls: {
          spotify: string;
        };
        href: string;
        id: string;
        name: string;
        type: string;
        uri: string;
      }[];
      available_markets: string[];
      external_urls: {
        spotify: string;
      };
      href: string;
      id: string;
      images: {
        height: number;
        url: string;
        width: number;
      }[];
      name: string;
      release_date: string;
      release_date_precision: string;
      total_tracks: number;
      type: string;
      uri: string;
    };
    artists: {
      external_urls: {
        spotify: string;
      };
      href: string;
      id: string;
      name: string;
      type: string;
      uri: string;
    }[];
    available_markets: string[];
    disc_number: number;
    duration_ms: number;
    explicit: boolean;
    external_ids: {
      isrc: string;
    };
    external_urls: {
      spotify: string;
    };
    href: string;
    id: string;
    is_local: boolean;
    name: string;
    popularity: number;
    preview_url: null; // Potrebbe essere una stringa o null
    track_number: number;
    type: string;
    uri: string;
  }
  

interface GenreCategory {
  // Definisci le proprietà della categoria qui, ad esempio:
  // id: string;
  // name: string;
  // ...
}

interface Playlist {
  // Definisci le proprietà della playlist qui, ad esempio:
  // id: string;
  // name: string;
  // ...
}

interface SearchTracks {
    tracks: {
        items: SpotifyTrack[]
    }
}

export const getToken = async (): Promise<string> => {
  const result = await fetch("https://accounts.spotify.com/api/token", {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      Authorization: "Basic " + btoa(`${CLIENT_ID}:${CLIENT_SECRET}`),
    },
    body: "grant_type=client_credentials",
  });

  const data: AccessTokenResponse = await result.json();
  return data.access_token;
};

export const getTracks = async (
  token: string,
  tracksEndPoint: string
): Promise<SpotifyTrack[]> => {
  const limit = 20;

  const result = await fetch(`${tracksEndPoint}?limit=${limit}`, {
    method: "GET",
    headers: { Authorization: `Bearer ${token}` },
  });

  const data: { items: SpotifyTrack[] } = await result.json();
  return data.items;
};

export const getGenres = async (token: string): Promise<GenreCategory[]> => {
  const result = await fetch(
    `https://api.spotify.com/v1/browse/categories?locale=sv_US`,
    {
      method: "GET",
      headers: { Authorization: `Bearer ${token}` },
    }
  );

  const data: { categories: { items: GenreCategory[] } } = await result.json();
  return data.categories.items;
};

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

  const data: { playlists: { items: Playlist[] } } = await result.json();
  return data.playlists.items;
};

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