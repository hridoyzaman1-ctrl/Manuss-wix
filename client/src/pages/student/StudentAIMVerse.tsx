import StudentDashboardLayout from "@/components/StudentDashboardLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { trpc } from "@/lib/trpc";
import { Sparkles, Play, Clock, Star } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { Badge } from "@/components/ui/badge";

export default function StudentAIMVerse() {
  const { data: episodes, isLoading } = trpc.aimverse.getEpisodes.useQuery({ releasedOnly: true });

  return (
    <StudentDashboardLayout>
      <div className="space-y-6">
        {/* Hero Section */}
        <div className="bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 rounded-2xl p-8 text-white">
          <div className="flex items-center gap-3 mb-4">
            <Sparkles className="h-8 w-8" />
            <h1 className="text-3xl font-bold">AIMVerse</h1>
          </div>
          <p className="text-white/90 max-w-2xl">
            Welcome to AIMVerse - where learning meets adventure! Watch exciting episodes, 
            collect cards, and win amazing prizes while learning new things.
          </p>
        </div>

        {/* Episodes */}
        <Card className="bg-white dark:bg-slate-800 border-pink-100 dark:border-slate-700">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Play className="h-5 w-5 text-pink-500" />
              Episodes
            </CardTitle>
            <CardDescription>
              Watch and learn from our educational episodes
            </CardDescription>
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {[1, 2, 3].map(i => (
                  <div key={i} className="rounded-xl overflow-hidden border">
                    <Skeleton className="h-48 w-full" />
                    <div className="p-4">
                      <Skeleton className="h-5 w-3/4 mb-2" />
                      <Skeleton className="h-4 w-1/2" />
                    </div>
                  </div>
                ))}
              </div>
            ) : episodes && episodes.length > 0 ? (
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {episodes.map((episode) => (
                  <div 
                    key={episode.id} 
                    className="rounded-xl overflow-hidden border border-slate-200 dark:border-slate-700 hover:shadow-lg transition-all cursor-pointer group"
                  >
                    <div className="h-48 bg-gradient-to-br from-pink-400 to-purple-500 relative flex items-center justify-center">
                      {episode.thumbnailUrl ? (
                        <img 
                          src={episode.thumbnailUrl} 
                          alt={episode.title}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <Sparkles className="h-16 w-16 text-white/30" />
                      )}
                      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors flex items-center justify-center">
                        <div className="h-14 w-14 rounded-full bg-white/90 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                          <Play className="h-6 w-6 text-pink-600 ml-1" />
                        </div>
                      </div>
                      {episode.seasonNumber && episode.episodeNumber && (
                        <Badge className="absolute top-3 left-3 bg-black/60 text-white">
                          S{episode.seasonNumber} E{episode.episodeNumber}
                        </Badge>
                      )}
                    </div>
                    <div className="p-4">
                      <h3 className="font-semibold text-slate-900 dark:text-white line-clamp-1">
                        {episode.title}
                      </h3>
                      {episode.titleBn && (
                        <p className="text-sm text-slate-500 dark:text-slate-400 line-clamp-1">
                          {episode.titleBn}
                        </p>
                      )}
                      <div className="flex items-center gap-4 mt-3 text-xs text-slate-500 dark:text-slate-400">
                        {episode.duration && (
                          <span className="flex items-center gap-1">
                            <Clock className="h-3 w-3" />
                            {Math.floor(episode.duration / 60)} min
                          </span>
                        )}
                        <span className="flex items-center gap-1">
                          <Star className="h-3 w-3 text-amber-500" />
                          New
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-12 text-slate-500 dark:text-slate-400">
                <Sparkles className="h-16 w-16 mx-auto mb-4 opacity-30" />
                <p className="text-lg font-medium">Coming Soon!</p>
                <p className="text-sm">Exciting episodes are being prepared for you</p>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Cards & Prizes Preview */}
        <div className="grid gap-6 md:grid-cols-2">
          <Card className="bg-gradient-to-br from-amber-50 to-orange-50 dark:from-amber-900/20 dark:to-orange-900/20 border-amber-200 dark:border-amber-800">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-amber-700 dark:text-amber-400">
                <Star className="h-5 w-5" />
                Collectible Cards
              </CardTitle>
              <CardDescription>
                Collect character cards, power cards, and more!
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-amber-700/80 dark:text-amber-400/80">
                Watch episodes and complete quizzes to unlock exclusive cards.
              </p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-emerald-50 to-teal-50 dark:from-emerald-900/20 dark:to-teal-900/20 border-emerald-200 dark:border-emerald-800">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-emerald-700 dark:text-emerald-400">
                <Sparkles className="h-5 w-5" />
                Win Prizes
              </CardTitle>
              <CardDescription>
                Participate in competitions and win amazing prizes!
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-emerald-700/80 dark:text-emerald-400/80">
                Top performers get featured and win special rewards.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </StudentDashboardLayout>
  );
}
