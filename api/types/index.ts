export interface AccessTokenResponse {
  access_token: string;
}

export interface Track {
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
  preview_url: null;
  track_number: number;
  type: string;
  uri: string;
}

export interface Genre {
  href: string;
  icons: Icon[];
  id: string;
  name: string;
}

interface Icon {
  height: number;
  url: string;
  width: number;
}

interface ExternalUrls {
  spotify: string;
}

interface Image {
  height: number;
  url: string;
  width: number;
}

interface Owner {
  display_name: string;
  external_urls: ExternalUrls;
  href: string;
  id: string;
  type: string;
  uri: string;
}

interface Tracks {
  href: string;
  total: number;
}

export interface Playlist {
  collaborative: boolean;
  description: string;
  external_urls: ExternalUrls;
  href: string;
  id: string;
  images: Image[];
  name: string;
  owner: Owner;
  primary_color: string | null;
  public: boolean | null;
  snapshot_id: string;
  tracks: Tracks;
  type: string;
  uri: string;
}

export interface SearchTracks {
  tracks: {
    items: Track[];
  };
}

export interface SpotifyTrack {
  added_at: string;
  added_by: unknown;
  is_local: boolean;
  primary_color: string;
  track: Track;
  video_thumbnail: unknown;
}
