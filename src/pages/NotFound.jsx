import { Link } from 'react-router-dom';
import { Home, Search, Film } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-background">
      <Card className="max-w-lg w-full text-center">
        <CardContent className="pt-12 pb-12 space-y-6">
          <div className="flex justify-center">
            <div className="relative">
              <div className="text-9xl font-bold text-muted-foreground/20">404</div>
              <Film className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 h-16 w-16 text-muted-foreground" />
            </div>
          </div>

          <div className="space-y-2">
            <h1 className="text-3xl font-bold">Page Not Found</h1>
            <p className="text-muted-foreground">
              Oops! The page you're looking for doesn't exist. It might have been moved or deleted.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 justify-center pt-4">
            <Button asChild size="lg">
              <Link to="/">
                <Home className="h-4 w-4 mr-2" />
                Go Home
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg">
              <Link to="/search">
                <Search className="h-4 w-4 mr-2" />
                Search Movies
              </Link>
            </Button>
          </div>

          <div className="pt-4 border-t">
            <p className="text-sm text-muted-foreground mb-3">Popular sections:</p>
            <div className="flex flex-wrap gap-2 justify-center">
              <Button asChild variant="ghost" size="sm">
                <Link to="/browse">Browse Movies</Link>
              </Button>
              <Button asChild variant="ghost" size="sm">
                <Link to="/genres">Genres</Link>
              </Button>
              <Button asChild variant="ghost" size="sm">
                <Link to="/watchlist">My Watchlist</Link>
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
