import { reviews, mockUser } from "@/lib/mock-data";
import ReviewCard from "@/components/reviews/ReviewCard";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Link from "next/link";
import { ArrowLeft, Star } from "lucide-react";

export default function MyReviewsPage() {
  const userReviews = reviews.filter((r) => r.userId === mockUser.id);

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="flex items-center gap-3 mb-6">
        <Button variant="ghost" size="sm" render={<Link href="/my" />}>
          <ArrowLeft className="w-4 h-4" />
        </Button>
        <h1 className="text-2xl font-bold">내 리뷰</h1>
      </div>

      {userReviews.length > 0 ? (
        <div className="space-y-4">
          {userReviews.map((r) => <ReviewCard key={r.id} review={r} />)}
        </div>
      ) : (
        <Card>
          <CardContent className="py-16 text-center text-muted-foreground">
            <Star className="w-12 h-12 mx-auto mb-4 opacity-20" />
            <p className="font-medium mb-1">아직 작성한 리뷰가 없어요</p>
            <p className="text-sm mb-4">방문했던 도시의 경험을 공유해보세요!</p>
            <Button render={<Link href="/cities" />}>도시 탐색하기</Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
