import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { tmdbAPI } from '@/services/tmdb';
import MovieGrid from '@/components/movie/MovieGrid';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export default function Browse() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const sortBy = searchParams.get('sort') || 'popular';

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        setLoading(true);
        let response;

        switch (sortBy) {
          case 'trending':
            response = await tmdbAPI.getTrending('week');
            break;
          case 'top_rated':
            response = await tmdbAPI.getTopRated(page);
            break;
          case 'upcoming':
            response = await tmdbAPI.getUpcoming(page);
            break;
          case 'now_playing':
            response = await tmdbAPI.getNowPlaying(page);
            break;
          default:
            response = await tmdbAPI.getPopular(page);
        }

        setMovies(response.data.results);
        setTotalPages(Math.min(response.data.total_pages, 500)); // TMDB limits to 500 pages
      } catch (error) {
        console.error('Error fetching movies:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchMovies();
  }, [sortBy, page]);

  const handlePageChange = (newPage) => {
    setPage(newPage);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const getSortTitle = () => {
    switch (sortBy) {
      case 'trending':
        return 'Trending Movies';
      case 'top_rated':
        return 'Top Rated Movies';
      case 'upcoming':
        return 'Upcoming Movies';
      case 'now_playing':
        return 'Now Playing';
      default:
        return 'Popular Movies';
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 min-h-screen">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl md:text-4xl font-bold mb-4">{getSortTitle()}</h1>

        {/* Sort Options */}
        <div className="flex flex-wrap gap-2">
          <Button
            variant={sortBy === 'popular' ? 'default' : 'outline'}
            onClick={() => {
              setSearchParams({ sort: 'popular' });
              setPage(1);
            }}
          >
            Popular
          </Button>
          <Button
            variant={sortBy === 'trending' ? 'default' : 'outline'}
            onClick={() => {
              setSearchParams({ sort: 'trending' });
              setPage(1);
            }}
          >
            Trending
          </Button>
          <Button
            variant={sortBy === 'top_rated' ? 'default' : 'outline'}
            onClick={() => {
              setSearchParams({ sort: 'top_rated' });
              setPage(1);
            }}
          >
            Top Rated
          </Button>
          <Button
            variant={sortBy === 'now_playing' ? 'default' : 'outline'}
            onClick={() => {
              setSearchParams({ sort: 'now_playing' });
              setPage(1);
            }}
          >
            Now Playing
          </Button>
          <Button
            variant={sortBy === 'upcoming' ? 'default' : 'outline'}
            onClick={() => {
              setSearchParams({ sort: 'upcoming' });
              setPage(1);
            }}
          >
            Upcoming
          </Button>
        </div>
      </div>

      {/* Movies Grid */}
      <MovieGrid movies={movies} loading={loading} />

      {/* Pagination */}
      {!loading && totalPages > 1 && (
        <div className="flex items-center justify-center gap-4 mt-12">
          <Button
            variant="outline"
            size="icon"
            onClick={() => handlePageChange(page - 1)}
            disabled={page === 1}
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>

          <div className="flex items-center gap-2">
            <span className="text-sm">
              Page {page} of {totalPages}
            </span>
          </div>

          <Button
            variant="outline"
            size="icon"
            onClick={() => handlePageChange(page + 1)}
            disabled={page === totalPages}
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      )}
    </div>
  );
}
