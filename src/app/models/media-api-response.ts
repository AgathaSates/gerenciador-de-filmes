export interface MediaApiResponse {
  page: number;
  results: (Media | MediaSearchResult)[];
  total_pages: number;
  total_results: number;
}

export interface Media {
  id: number;
  adult: boolean;
  original_language: string;
  original_title: string;
  release_date?: string;
  first_air_date?: string;
  title?: string;
  name?: string;
  overview: string;
  popularity: number;
  poster_path: string;
  backdrop_path: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
  genre_ids: number[];
}

export interface MediaSearchResult {
  id: number;
  media_type: string;
  adult: boolean;
  original_language: string;
  original_title: string;
  release_date?: string;
  first_air_date?: string;
  title?: string;
  name?: string;
  overview: string;
  popularity: number;
  poster_path: string;
  backdrop_path: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
  genre_ids: number[];
}

export interface TmdbCast {
  id: number;
  name: string;
  character: string;
  order: number;
  profile_path: string | null;
}

export interface TmdbCrew {
  id: number;
  name: string;
  job: string;
  department: string;
  profile_path: string | null;
}

export interface TmdbVideo {
  id: string;
  key: string;
  name: string;
  site: 'YouTube' | 'Vimeo' | string;
  size: number;
  type: 'Trailer' | 'Teaser' | 'Clip' | string;
  official: boolean;
  published_at: string;
  iso_639_1: string;
  iso_3166_1: string;
}

export interface MovieDetailsResponse {
  id: number;
  title: string;
  overview: string;
  release_date: string;
  original_language: string;
  vote_average: number;
  vote_count: number;
  runtime: number | null;
  genres: Array<{ id: number; name: string }>;
  poster_path: string | null;
  backdrop_path: string | null;
  credits?: {
    cast: Array<{
      id: number;
      name: string;
      character: string;
      order: number;
      profile_path: string | null;
    }>;
    crew: Array<{
      id: number;
      name: string;
      job: string;
      department: string;
      profile_path: string | null;
    }>;
  };
  videos?: { results: TmdbVideo[] };
}

export enum MediaCategory {
  Popular = 'popular',
  TopRated = 'top-rated',
  NowPlaying = 'now-playing',
  Search = 'search',
}
