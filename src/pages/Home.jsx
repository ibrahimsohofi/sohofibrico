import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Play, Info, TrendingUp, Star, Calendar } from 'lucide-react';
import { tmdbAPI, getImageUrl } from '@/services/tmdb';
import MovieGrid from '@/components/movie/MovieGrid';
import ApiKeyNotice from '@/components/common/ApiKeyNotice';
import HeroSkeleton from '@/components/common/HeroSkeleton';
import { Button } from '@/components/ui/button';

export default function Home() {
  const [featured, setFeatured] = useState(null);
  const [trending, setTrending] = useState([]);
  const [popular, setPopular] = useState([]);
  const [topRated, setTopRated] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        setLoading(true);

        const [trendingRes, popularRes, topRatedRes] = await Promise.all([
          tmdbAPI.getTrending('week'),
          tmdbAPI.getPopular(1),
          tmdbAPI.getTopRated(1),
        ]);

        const trendingMovies = trendingRes.data.results;
        setTrending(trendingMovies);
        setPopular(popularRes.data.results);
        setTopRated(topRatedRes.data.results);

        // Set first trending movie as featured
        if (trendingMovies.length > 0) {
          setFeatured(trendingMovies[0]);
        }
      } catch (error) {
        console.error('Error fetching movies:', error);
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    fetchMovies();
  }, []);

  // Check if API key is missing
  const apiKey = import.meta.env.VITE_TMDB_API_KEY;
  if (!apiKey || apiKey === 'your_api_key_here') {
    return <ApiKeyNotice />;
  }

  // Show error if API request failed
  if (error && !loading) {
    return <ApiKeyNotice />;
  }

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      {loading && <HeroSkeleton />}
      {featured && !loading && (
        <div className="relative h-[70vh] md:h-[85vh] -mt-16">
          {/* Background Image */}
          <div className="absolute inset-0">
            <img
              src={getImageUrl(featured.backdrop_path, 'original')}
              alt={featured.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-r from-background via-transparent to-transparent" />
          </div>

          {/* Content */}
          <div className="relative container mx-auto px-4 h-full flex items-center">
            <div className="max-w-2xl space-y-6 pt-16">
              <h1 className="text-4xl md:text-6xl font-bold leading-tight">
                {featured.title}
              </h1>

              <div className="flex items-center space-x-4 text-sm">
                {featured.vote_average > 0 && (
                  <div className="flex items-center space-x-1">
                    <Star className="h-4 w-4 fill-yellow-500 text-yellow-500" />
                    <span className="font-semibold">{featured.vote_average.toFixed(1)}</span>
                  </div>
                )}
                {featured.release_date && (
                  <div className="flex items-center space-x-1">
                    <Calendar className="h-4 w-4" />
                    <span>{new Date(featured.release_date).getFullYear()}</span>
                  </div>
                )}
              </div>

              <p className="text-lg text-muted-foreground line-clamp-3 md:line-clamp-4">
                {featured.overview}
              </p>

              <div className="flex flex-wrap gap-3">
                <Link to={`/movie/${featured.id}`}>
                  <Button size="lg" className="gap-2">
                    <Info className="h-5 w-5" />
                    More Info
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Movie Sections */}
      <div className="container mx-auto px-4 space-y-12 py-12">
        {/* Trending This Week */}
        <section>
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-2">
              <TrendingUp className="h-6 w-6 text-red-600" />
              <h2 className="text-2xl md:text-3xl font-bold">Trending This Week</h2>
            </div>
            <Link to="/browse?sort=trending">
              <Button variant="ghost">View All</Button>
            </Link>
          </div>
          <MovieGrid movies={trending.slice(0, 12)} loading={loading} />
        </section>

        {/* Popular Movies */}
        <section>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl md:text-3xl font-bold">Popular Movies</h2>
            <Link to="/browse?sort=popular">
              <Button variant="ghost">View All</Button>
            </Link>
          </div>
          <MovieGrid movies={popular.slice(0, 12)} loading={loading} />
        </section>

        {/* Top Rated */}
        <section>
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-2">
              <Star className="h-6 w-6 text-yellow-500" />
              <h2 className="text-2xl md:text-3xl font-bold">Top Rated</h2>
            </div>
            <Link to="/browse?sort=top_rated">
              <Button variant="ghost">View All</Button>
            </Link>
          </div>
          <MovieGrid movies={topRated.slice(0, 12)} loading={loading} />
        </section>
      </div>
    </div>
  );
}
