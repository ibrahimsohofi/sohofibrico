import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Search as SearchIcon, Film } from 'lucide-react';
import { tmdbAPI } from '@/services/tmdb';
import MovieGrid from '@/components/movie/MovieGrid';
import EmptyState from '@/components/common/EmptyState';
import { Input } from '@/components/ui/input';

export default function Search() {
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get('q') || '';
  const [searchQuery, setSearchQuery] = useState(query);
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchResults = async () => {
      if (!query) {
        setMovies([]);
        return;
      }

      try {
        setLoading(true);
        const response = await tmdbAPI.searchMovies(query);
        setMovies(response.results || []);
      } catch (error) {
        console.error('Error searching movies:', error);
        setMovies([]);
      } finally {
        setLoading(false);
      }
    };

    fetchResults();
  }, [query]);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      setSearchParams({ q: searchQuery.trim() });
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 min-h-screen">
      {/* Search Input */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-6">Search Movies</h1>
        <form onSubmit={handleSearch} className="max-w-2xl">
          <div className="relative">
            <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            <Input
              type="text"
              placeholder="Search for movies..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 text-lg h-12"
            />
          </div>
        </form>
      </div>

      {/* Results */}
      {query && (
        <div className="mb-4">
          <p className="text-muted-foreground">
            {loading ? 'Searching...' : `${movies.length} results for "${query}"`}
          </p>
        </div>
      )}

      {!query && !loading && (
        <EmptyState
          icon={SearchIcon}
          title="Search for Movies"
          description="Enter a search query to discover amazing movies"
        />
      )}

      {query && !loading && movies.length === 0 && (
        <EmptyState
          icon={Film}
          title="No Results Found"
          description={`We couldn't find any movies matching "${query}". Try searching with different keywords.`}
          actionLabel="Browse Movies"
          actionHref="/browse"
        />
      )}

      {movies.length > 0 && <MovieGrid movies={movies} loading={loading} />}
    </div>
  );
}
