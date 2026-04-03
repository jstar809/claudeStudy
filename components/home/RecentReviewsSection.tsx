import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Star } from "lucide-react";
import { cities, reviews } from "@/lib/mock-data";

const cityMap = Object.fromEntries(cities.map((c) => [c.id, c]));

const recentReviews = [...reviews]
  .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
  .slice(0, 3);

export default function RecentReviewsSection() {
  return (
    <section className="py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-2xl sm:text-3xl font-bold mb-8">📝 최근 등록된 리뷰</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {recentReviews.map((review) => {
            const city = cityMap[review.cityId];
            return (
              <Link key={review.id} href={`/cities/${city?.slug ?? ""}`}>
                <Card className="hover:shadow-md transition-shadow h-full cursor-pointer">
                  <CardContent className="p-5">
                    <div className="flex items-center gap-2 mb-3">
                      <Badge variant="secondary">{city?.name}</Badge>
                      <span className="text-xs text-muted-foreground">{review.season}</span>
                    </div>
                    <p className="text-sm text-muted-foreground line-clamp-3 mb-3">
                      {review.body}
                    </p>
                    <div className="flex items-center justify-between text-xs text-muted-foreground">
                      <span>{review.userNickname} · {review.userJobType}</span>
                      <span className="flex items-center gap-1">
                        <Star className="w-3 h-3 text-amber-500" />
                        {review.helpfulCount}
                      </span>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
