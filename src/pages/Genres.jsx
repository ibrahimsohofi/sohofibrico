import { Link } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { Film } from 'lucide-react';

export default function Genres() {
  const genres = [
    { id: 28, name: 'Action', icon: '💥', description: 'High-octane thrills and explosive adventures' },
    { id: 12, name: 'Adventure', icon: '🗺️', description: 'Epic journeys and exciting quests' },
    { id: 16, name: 'Animation', icon: '🎨', description: 'Animated stories for all ages' },
    { id: 35, name: 'Comedy', icon: '😂', description: 'Laugh-out-loud funny moments' },
    { id: 80, name: 'Crime', icon: '🕵️', description: 'Gripping crime dramas and thrillers' },
    { id: 99, name: 'Documentary', icon: '📹', description: 'Real stories and factual films' },
    { id: 18, name: 'Drama', icon: '🎭', description: 'Compelling emotional narratives' },
    { id: 10751, name: 'Family', icon: '👨‍👩‍👧‍👦', description: 'Fun for the whole family' },
    { id: 14, name: 'Fantasy', icon: '🧙', description: 'Magical worlds and mythical tales' },
    { id: 36, name: 'History', icon: '📜', description: 'Historical events and periods' },
    { id: 27, name: 'Horror', icon: '👻', description: 'Spine-chilling scares and suspense' },
    { id: 10402, name: 'Music', icon: '🎵', description: 'Musical performances and stories' },
    { id: 9648, name: 'Mystery', icon: '🔍', description: 'Puzzles and enigmas to solve' },
    { id: 10749, name: 'Romance', icon: '💕', description: 'Love stories that warm the heart' },
    { id: 878, name: 'Science Fiction', icon: '🚀', description: 'Futuristic worlds and technology' },
    { id: 10770, name: 'TV Movie', icon: '📺', description: 'Made-for-television films' },
    { id: 53, name: 'Thriller', icon: '😱', description: 'Edge-of-your-seat suspense' },
    { id: 10752, name: 'War', icon: '⚔️', description: 'War stories and military action' },
    { id: 37, name: 'Western', icon: '🤠', description: 'Cowboys and the Wild West' },
  ];

  return (
    <div className="min-h-screen bg-background py-8">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="mb-12 text-center">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Film className="h-10 w-10 text-red-600" />
            <h1 className="text-4xl md:text-5xl font-bold">Browse by Genre</h1>
          </div>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Discover movies from your favorite genres. From action-packed adventures to heartwarming romances.
          </p>
        </div>

        {/* Genre Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {genres.map((genre) => (
            <Link key={genre.id} to={`/genre/${genre.id}`}>
              <Card className="h-full hover:scale-105 transition-transform duration-200 hover:border-red-600 cursor-pointer group">
                <CardContent className="p-6 text-center">
                  <div className="text-5xl mb-3 group-hover:scale-110 transition-transform">
                    {genre.icon}
                  </div>
                  <h3 className="text-xl font-bold mb-2 group-hover:text-red-600 transition-colors">
                    {genre.name}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {genre.description}
                  </p>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
