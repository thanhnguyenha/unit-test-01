'use client';

import { useState, useEffect, useCallback } from 'react';
import Image from 'next/image';
import { movieService } from '@/service/movies';
import { MovieData } from '@/app/data-type/movie-type';
import {
  Container,
  Header,
  Title,
  SearchAndFilter,
  SearchInput,
  MovieGrid,
  MovieCard,
  MoviePoster,
  MovieInfo,
  MovieTitle,
  MovieMeta,
  Rating,
  Pagination,
  PageButton,
  ResultsCount,
} from './moveListStyle';

interface MovieListProps {
  category: string;
}

export const MovieList = ({ category }: MovieListProps) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [movies, setMovies] = useState<MovieData[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [totalPages, setTotalPages] = useState(1);
  const [totalResults, setTotalResults] = useState(0);

  // Fetch movies from API when category is 'cinema'
  const fetchMovies = useCallback(async () => {
    if (category !== 'cinema') {
      setMovies([]);
      setTotalPages(1);
      setTotalResults(0);
      return;
    }

    setLoading(true);
    setError(null);
    try {
      const response = await movieService.getListMovies({
        keyword: searchTerm || undefined,
        page: currentPage,
      });
      setMovies(response.results);
      setTotalPages(response.total_pages);
      setTotalResults(response.total_results);
    } catch (err) {
      setError('Không thể tải danh sách phim. Vui lòng thử lại.');
      console.error('Error fetching movies:', err);
    } finally {
      setLoading(false);
    }
  }, [category, currentPage, searchTerm]);

  useEffect(() => {
    fetchMovies();
  }, [fetchMovies]);

  // Reset to page 1 when search changes
  const handleSearchChange = (newSearch: string) => {
    setSearchTerm(newSearch);
    setCurrentPage(1);
  };

  // Use movies directly from API (already filtered by API)
  const filteredMovies = movies;

  const getCategoryTitle = () => {
    const titles: Record<string, string> = {
      cinema: 'Phim Chiếu Rạp',
      series: 'Phim Bộ',
      tv: 'Tivi',
      music: 'MV Ca Nhạc',
    };
    return titles[category] || 'Danh Sách Phim';
  };

  const getYearFromDate = (dateString: string) => {
    if (!dateString) return 'N/A';
    return new Date(dateString).getFullYear();
  };

  const formatRating = (rating: number) => {
    return rating.toFixed(1);
  };

  return (
    <Container id="movie-list">
      <Header>
        <Title>{getCategoryTitle()}</Title>
        {category === 'cinema' && (
          <SearchAndFilter>
            <SearchInput
              type="text"
              placeholder="Tìm kiếm phim..."
              value={searchTerm}
              onChange={(e) => handleSearchChange(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  fetchMovies();
                }
              }}
            />
          </SearchAndFilter>
        )}
        <ResultsCount>
          {category === 'cinema' 
            ? `Tìm thấy ${totalResults} kết quả`
            : 'Chức năng đang phát triển'}
        </ResultsCount>
      </Header>

      {loading && (
        <div style={{ textAlign: 'center', color: '#b0b0b0', padding: '48px' }}>
          Đang tải...
        </div>
      )}

      {error && (
        <div style={{ textAlign: 'center', color: '#e53e3e', padding: '48px' }}>
          {error}
        </div>
      )}

      {!loading && !error && (
        <MovieGrid>
          {filteredMovies.length > 0 ? (
            filteredMovies.map((movie) => (
              <MovieCard key={movie.id}>
                <MoviePoster>
                  {movie.poster_path ? (
                    <Image
                      src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                      alt={movie.title}
                      width={200}
                      height={280}
                      style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                      unoptimized
                    />
                  ) : (
                    movie.title.charAt(0)
                  )}
                </MoviePoster>
                <MovieInfo>
                  <MovieTitle>{movie.title}</MovieTitle>
                  <MovieMeta>
                    <span>{getYearFromDate(movie.release_date)}</span>
                    <Rating>⭐ {formatRating(movie.vote_average)}</Rating>
                  </MovieMeta>
                </MovieInfo>
              </MovieCard>
            ))
          ) : (
            !loading && (
              <div style={{ gridColumn: '1 / -1', textAlign: 'center', color: '#b0b0b0', padding: '48px' }}>
                {category === 'cinema' ? 'Không tìm thấy phim nào' : 'Chức năng đang phát triển'}
              </div>
            )
          )}
        </MovieGrid>
      )}

      {!loading && !error && category === 'cinema' && totalPages > 1 && (
        <Pagination>
          <PageButton
            $disabled={currentPage === 1}
            onClick={() => setCurrentPage((prev) => Math.max(1, prev - 1))}
          >
            Trước
          </PageButton>
          {Array.from({ length: Math.min(totalPages, 10) }, (_, i) => i + 1).map((page) => (
            <PageButton
              key={page}
              $isActive={currentPage === page}
              onClick={() => setCurrentPage(page)}
            >
              {page}
            </PageButton>
          ))}
          <PageButton
            $disabled={currentPage === totalPages}
            onClick={() => setCurrentPage((prev) => Math.min(totalPages, prev + 1))}
          >
            Sau
          </PageButton>
        </Pagination>
      )}
    </Container>
  );
};
