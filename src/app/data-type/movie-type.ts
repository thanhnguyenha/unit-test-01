export type MovieData = {
  adult: boolean;
  backdrop_path: string;
  genre_ids: number[];
  id: number;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  release_date?: string; // for movies
  first_air_date?: string; // for TV shows
  title?: string; // for movies
  name?: string; // for TV shows
  video: boolean;
  vote_average: number;
  vote_count: number;
};

