import { Bookmark } from 'lucide-react';
import { useWatchlistStore } from '@/store/useStore';
import MovieGrid from '@/components/movie/MovieGrid';
import EmptyState from '@/components/common/EmptyState';

export default function Watchlist() {
  const { watchlist } = useWatchlistStore();

  if (watchlist.length === 0) {
    return (
      <div className="container mx-auto px-4 py-16 min-h-screen">
        <EmptyState
          icon={Bookmark}
          title="Your Watchlist is Empty"
          description="Start adding movies to your watchlist to keep track of what you want to watch!"
          actionLabel="Browse Movies"
          actionHref="/browse"
        />
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 min-h-screen">
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-2">
          <Bookmark className="h-8 w-8 text-red-600" />
          <h1 className="text-3xl font-bold">My Watchlist</h1>
        </div>
        <p className="text-muted-foreground">
          {watchlist.length} {watchlist.length === 1 ? 'movie' : 'movies'} saved
        </p>
      </div>

      <MovieGrid movies={watchlist} />
    </div>
  );
}
