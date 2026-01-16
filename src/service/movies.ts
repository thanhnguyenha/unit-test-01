import { MovieData } from "@/app/data-type/movie-type";
import axiosInstance from "./custom-axios";

class MovieService {
    private static instance: MovieService | null = null;

    public static getInstance(): MovieService {
      if (!MovieService.instance) {
        MovieService.instance = new MovieService();
      }
      return MovieService.instance;
    }
    
    async getListMovies (params: {
      keyword?: string;
      page?: number;
    }): Promise<{
      results: MovieData[];
      page: number;
      total_pages: number;
      total_results: number;
    }> {
      const response = await axiosInstance.get('/movie/popular',
        { params: {
          ...params,
          language: 'vi-VN', // 'en-US'
         } });
      return response.data;
    }

    async getListTVShows (params: {
      keyword?: string;
      page?: number;
    }): Promise<{
      results: MovieData[];
      page: number;
      total_pages: number;
      total_results: number;
    }> {
      const response = await axiosInstance.get('/tv/popular',
        { params: {
          ...params,
          language: 'vi-VN', // 'en-US'
         } });
      return response.data;
    }


}

export const movieService = MovieService.getInstance();