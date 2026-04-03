import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "마이페이지",
  description: "내 리뷰, 즐겨찾기, 여행 기록을 확인하세요.",
};
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { mockUser, reviews, cities } from "@/lib/mock-data";
import ReviewCard from "@/components/reviews/ReviewCard";
import CityCard from "@/components/cities/CityCard";
import { MapPin, Star, Bookmark, Settings, Edit3, CheckCircle } from "lucide-react";

export default function MyPage() {
  const user = mockUser;
  const userReviews = reviews.filter((r) => r.userId === user.id);
  const favoriteCities = cities.slice(0, 3);
  const currentCity = cities.find((c) => c.id === user.checkinCityId);

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      {/* Profile Card */}
      <Card className="mb-8 overflow-hidden">
        <div className="h-24 bg-gradient-to-r from-primary/30 to-accent/40" />
        <CardContent className="relative pt-0 pb-6 px-6">
          <div className="flex items-end justify-between -mt-10 mb-4">
            <Avatar className="h-20 w-20 border-4 border-background shadow-lg">
              <AvatarFallback className="bg-primary text-primary-foreground text-2xl font-bold">
                {user.nickname.charAt(0)}
              </AvatarFallback>
            </Avatar>
            <div className="flex gap-2 pb-2">
              <Button variant="outline" size="sm" className="gap-1.5">
                <Edit3 className="w-3.5 h-3.5" /> 프로필 편집
              </Button>
              <Button variant="ghost" size="sm">
                <Settings className="w-4 h-4" />
              </Button>
            </div>
          </div>

          <div className="flex items-start justify-between flex-wrap gap-3">
            <div>
              <h1 className="text-2xl font-bold mb-1">{user.nickname}</h1>
              <div className="flex items-center gap-2 mb-2">
                <Badge variant="secondary">{user.jobType}</Badge>
                {currentCity && (
                  <span className="flex items-center gap-1 text-xs text-muted-foreground">
                    <div className="w-2 h-2 rounded-full bg-green-500" />
                    <MapPin className="w-3 h-3" />
                    현재 {currentCity.name} 체류 중
                  </span>
                )}
              </div>
              <p className="text-sm text-muted-foreground">{user.bio}</p>
            </div>
          </div>

          <Separator className="mt-4 mb-4" />

          {/* Stats */}
          <div className="grid grid-cols-3 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-primary">{user.reviewCount}</div>
              <div className="text-xs text-muted-foreground">작성 리뷰</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-primary">{user.favoriteCount}</div>
              <div className="text-xs text-muted-foreground">즐겨찾기</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-primary">{user.visitedCities}</div>
              <div className="text-xs text-muted-foreground">방문 도시</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Premium CTA */}
      <Card className="mb-8 bg-gradient-to-r from-primary/5 to-accent/10 border-primary/20">
        <CardContent className="p-5">
          <div className="flex items-center justify-between gap-4 flex-wrap">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <Star className="w-4 h-4 text-amber-500" />
                <span className="font-semibold">프리미엄으로 업그레이드</span>
              </div>
              <p className="text-sm text-muted-foreground">
                도시 비교, 비용 계산기, 광고 없는 환경을 경험하세요.
              </p>
              <div className="flex gap-3 mt-2 text-xs text-muted-foreground">
                {["도시 무제한 비교", "비용 계산기", "광고 없음"].map((f) => (
                  <span key={f} className="flex items-center gap-1">
                    <CheckCircle className="w-3 h-3 text-green-500" /> {f}
                  </span>
                ))}
              </div>
            </div>
            <Button className="shrink-0">
              ₩9,900/월로 시작
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Content Tabs */}
      <Tabs defaultValue="reviews">
        <TabsList className="mb-6">
          <TabsTrigger value="reviews" className="gap-1.5">
            <Star className="w-3.5 h-3.5" /> 내 리뷰 ({user.reviewCount})
          </TabsTrigger>
          <TabsTrigger value="favorites" className="gap-1.5">
            <Bookmark className="w-3.5 h-3.5" /> 즐겨찾기 ({user.favoriteCount})
          </TabsTrigger>
          <TabsTrigger value="history" className="gap-1.5">
            <MapPin className="w-3.5 h-3.5" /> 여행 기록
          </TabsTrigger>
        </TabsList>

        <TabsContent value="reviews" className="space-y-4">
          {userReviews.length > 0 ? (
            userReviews.map((review) => (
              <ReviewCard key={review.id} review={review} />
            ))
          ) : (
            <Card>
              <CardContent className="py-12 text-center text-muted-foreground">
                <Star className="w-10 h-10 mx-auto mb-3 opacity-30" />
                <p className="font-medium mb-1">아직 작성한 리뷰가 없어요</p>
                <p className="text-sm mb-4">방문했던 도시의 경험을 공유해보세요!</p>
                <Button variant="outline" render={<Link href="/cities" />}>
                  도시 탐색하기
                </Button>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        <TabsContent value="favorites">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {favoriteCities.map((city) => (
              <CityCard key={city.id} city={city} />
            ))}
          </div>
          <p className="text-sm text-muted-foreground text-center mt-4">
            {user.favoriteCount - favoriteCities.length}개 더 있어요 —{" "}
            <Link href="/my/favorites" className="text-primary hover:underline">
              전체 보기
            </Link>
          </p>
        </TabsContent>

        <TabsContent value="history">
          <div className="space-y-3">
            {cities.slice(0, user.visitedCities).map((city, idx) => (
              <Card key={city.id}>
                <CardContent className="flex items-center gap-4 p-4">
                  <div className="w-8 h-8 rounded-full bg-primary/10 text-primary flex items-center justify-center text-sm font-bold shrink-0">
                    {idx + 1}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <span className="font-medium">{city.name}</span>
                      <Badge variant="outline" className="text-xs">{city.region}</Badge>
                    </div>
                    <p className="text-xs text-muted-foreground mt-0.5">2025년 방문</p>
                  </div>
                  <Button variant="ghost" size="sm" render={<Link href={`/cities/${city.slug}`} />}>
                    보기
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
