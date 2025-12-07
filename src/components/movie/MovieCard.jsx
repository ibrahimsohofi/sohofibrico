import { Link } from 'react-router-dom';
import { Star, Bookmark, BookmarkCheck } from 'lucide-react';
import { getImageUrl } from '@/services/tmdb';
import { useWatchlistStore } from '@/store/useStore';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { useState } from 'react';

export default function MovieCard({ movie }) {
  const { watchlist, addToWatchlist, removeFromWatchlist } = useWatchlistStore();
  const isInWatchlist = watchlist.some((m) => m.id === movie.id);
  const [imageError, setImageError] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);

  const handleWatchlistToggle = (e) => {
    e.preventDefault();
    if (isInWatchlist) {
      removeFromWatchlist(movie.id);
    } else {
      addToWatchlist(movie);
    }
  };

  const posterUrl = getImageUrl(movie.poster_path, 'w500');
  const year = movie.release_date ? new Date(movie.release_date).getFullYear() : 'N/A';
  const rating = movie.vote_average ? movie.vote_average.toFixed(1) : 'N/A';

  // Fallback placeholder SVG
  const placeholderImage = `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='500' height='750' viewBox='0 0 500 750'%3E%3Crect width='500' height='750' fill='%23374151'/%3E%3Ctext x='50%25' y='50%25' dominant-baseline='middle' text-anchor='middle' font-family='system-ui' font-size='24' fill='%239CA3AF'%3E${encodeURIComponent(movie.title || 'No Image')}%3C/text%3E%3C/svg%3E`;

  const handleImageError = () => {
    setImageError(true);
    setImageLoaded(true);
  };

  const handleImageLoad = () => {
    setImageLoaded(true);
  };

  return (
    <Card className="group relative overflow-hidden hover:shadow-2xl transition-all duration-300 hover:-translate-y-2">
      <Link to={`/movie/${movie.id}`}>
        <div className="relative aspect-[2/3] overflow-hidden bg-muted">
          {!imageLoaded && (
            <div className="absolute inset-0 flex items-center justify-center bg-muted">
              <div className="animate-pulse text-muted-foreground">Loading...</div>
            </div>
          )}

          <img
            src={imageError || !posterUrl ? placeholderImage : posterUrl}
            alt={movie.title}
            className={`w-full h-full object-cover transition-transform duration-300 group-hover:scale-110 ${!imageLoaded ? 'opacity-0' : 'opacity-100'}`}
            loading="lazy"
            onError={handleImageError}
            onLoad={handleImageLoad}
          />

          {/* Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <div className="absolute bottom-0 left-0 right-0 p-4 space-y-2">
              <p className="text-sm text-white/80 line-clamp-3">
                {movie.overview || 'No description available.'}
              </p>
            </div>
          </div>

          {/* Rating Badge */}
          {movie.vote_average > 0 && (
            <div className="absolute top-2 left-2 bg-black/80 backdrop-blur px-2 py-1 rounded-full flex items-center space-x-1">
              <Star className="h-3 w-3 fill-yellow-500 text-yellow-500" />
              <span className="text-xs font-semibold text-white">{rating}</span>
            </div>
          )}

          {/* Watchlist Button */}
          <div className="absolute top-2 right-2">
            <Button
              size="icon"
              variant="secondary"
              className="h-8 w-8 rounded-full bg-black/60 backdrop-blur hover:bg-black/80"
              onClick={handleWatchlistToggle}
            >
              {isInWatchlist ? (
                <BookmarkCheck className="h-4 w-4 text-red-600" />
              ) : (
                <Bookmark className="h-4 w-4" />
              )}
            </Button>
          </div>
        </div>

        <CardContent className="p-4">
          <h3 className="font-semibold text-sm line-clamp-1 mb-1 group-hover:text-red-600 transition-colors">
            {movie.title}
          </h3>
          <p className="text-xs text-muted-foreground">{year}</p>
        </CardContent>
      </Link>
    </Card>
  );
}
