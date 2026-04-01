import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { cities, reviews } from "@/lib/mock-data";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import ReviewCard from "@/components/reviews/ReviewCard";
import ReviewForm from "@/components/reviews/ReviewForm";
import ScoreRadarChart from "@/components/cities/ScoreRadarChart";
import {
  Share2,
  Bookmark,
  MapPin,
  Users,
  Star,
  Wifi,
  ArrowLeft,
} from "lucide-react";

interface Props {
  params: Promise<{ slug: string }>;
}

const scoreLabels: Record<string, { label: string; emoji: string }> = {
  internet: { label: "인터넷", emoji: "📡" },
  cafe: { label: "카페/코워킹", emoji: "☕" },
  cost: { label: "생활비", emoji: "💵" },
  safety: { label: "안전도", emoji: "👮" },
  climate: { label: "기후", emoji: "🌤" },
  community: { label: "커뮤니티", emoji: "🤝" },
};

const seasonEmoji: Record<string, string> = {
  봄: "🌸",
  여름: "☀️",
  가을: "🍂",
  겨울: "❄️",
};

export default async function CityDetailPage({ params }: Props) {
  const { slug } = await params;
  const city = cities.find((c) => c.slug === slug);

  if (!city) notFound();

  const cityReviews = reviews.filter((r) => r.cityId === city.id);

  const totalCost = Object.values(city.costBreakdown).reduce((a, b) => a + b, 0);

  return (
    <div>
      {/* Hero */}
      <div className="relative h-72 sm:h-96 overflow-hidden">
        <Image
          src={city.thumbnail}
          alt={city.name}
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />

        <div className="absolute top-4 left-4">
          <Button
            variant="ghost"
            size="sm"
            className="text-white hover:bg-white/20 gap-1.5"
            render={<Link href="/cities" />}
          >
            <ArrowLeft className="w-4 h-4" /> 목록으로
          </Button>
        </div>

        <div className="absolute top-4 right-4 flex gap-2">
          <Button variant="ghost" size="icon" className="text-white hover:bg-white/20 h-9 w-9">
            <Bookmark className="w-4 h-4" />
          </Button>
          <Button variant="ghost" size="icon" className="text-white hover:bg-white/20 h-9 w-9">
            <Share2 className="w-4 h-4" />
          </Button>
        </div>

        <div className="absolute bottom-6 left-6 right-6">
          <div className="flex items-end justify-between">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <Badge className="bg-primary"># {city.rank}위</Badge>
                <Badge variant="secondary" className="bg-white/20 text-white border-0">
                  {city.region}
                </Badge>
              </div>
              <h1 className="text-3xl sm:text-4xl font-bold text-white mb-1">{city.name}</h1>
              <div className="flex items-center gap-1 text-white/80 text-sm">
                <MapPin className="w-3.5 h-3.5" />
                <span>{city.region} · {city.currentNomads}명 체류 중</span>
              </div>
            </div>
            <div className="text-right">
              <div className="text-4xl font-bold text-white">{city.scores.nomad}</div>
              <div className="text-white/70 text-sm">노마드 점수</div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Quick stats */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-8">
          {[
            { label: "월 생활비", value: `${(city.monthlyCost / 10000).toFixed(0)}만원`, emoji: "💵" },
            { label: "인터넷", value: `${city.internetSpeed}Mbps`, emoji: "📡" },
            { label: "리뷰 수", value: `${city.reviewCount}개`, emoji: "💬" },
            { label: "체류 노마드", value: `${city.currentNomads}명`, emoji: "👤" },
          ].map((stat) => (
            <Card key={stat.label}>
              <CardContent className="pt-4 pb-4 text-center">
                <div className="text-2xl mb-1">{stat.emoji}</div>
                <div className="font-bold text-lg">{stat.value}</div>
                <div className="text-xs text-muted-foreground">{stat.label}</div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Description */}
            <div>
              <h2 className="text-xl font-bold mb-2">{city.name} 소개</h2>
              <p className="text-muted-foreground leading-relaxed">{city.description}</p>
              <div className="flex gap-1.5 flex-wrap mt-3">
                {city.tags.map((tag) => (
                  <Badge key={tag} variant="secondary">#{tag}</Badge>
                ))}
              </div>
            </div>

            <Separator />

            {/* Score breakdown */}
            <div>
              <h2 className="text-xl font-bold mb-4">항목별 점수</h2>
              <div className="space-y-3">
                {(Object.entries(scoreLabels) as [string, { label: string; emoji: string }][]).map(
                  ([key, { label, emoji }]) => {
                    const score = city.scores[key as keyof typeof city.scores];
                    return (
                      <div key={key} className="flex items-center gap-3">
                        <span className="text-lg w-7 shrink-0">{emoji}</span>
                        <span className="text-sm w-24 shrink-0">{label}</span>
                        <Progress value={score} className="flex-1 h-2" />
                        <span className="text-sm font-semibold w-8 text-right">{score}</span>
                      </div>
                    );
                  }
                )}
              </div>
            </div>

            <Separator />

            {/* Reviews */}
            <div>
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-bold">리뷰 ({city.reviewCount})</h2>
              </div>
              <Tabs defaultValue="recent">
                <TabsList className="mb-4">
                  <TabsTrigger value="recent">최신순</TabsTrigger>
                  <TabsTrigger value="helpful">유용한순</TabsTrigger>
                </TabsList>
                <TabsContent value="recent" className="space-y-4">
                  {cityReviews.length > 0 ? (
                    cityReviews.map((review) => (
                      <ReviewCard key={review.id} review={review} />
                    ))
                  ) : (
                    <Card>
                      <CardContent className="py-12 text-center text-muted-foreground">
                        <p className="mb-2">아직 리뷰가 없어요</p>
                        <p className="text-sm">첫 번째 리뷰를 작성해보세요!</p>
                      </CardContent>
                    </Card>
                  )}
                </TabsContent>
                <TabsContent value="helpful" className="space-y-4">
                  {cityReviews
                    .sort((a, b) => b.helpfulCount - a.helpfulCount)
                    .map((review) => (
                      <ReviewCard key={review.id} review={review} />
                    ))}
                </TabsContent>
              </Tabs>
            </div>

            {/* Review Form */}
            <ReviewForm cityName={city.name} />
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Radar Chart */}
            <Card>
              <CardHeader>
                <CardTitle className="text-base">점수 분포</CardTitle>
              </CardHeader>
              <CardContent>
                <ScoreRadarChart scores={city.scores} cityName={city.name} />
              </CardContent>
            </Card>

            {/* Cost Breakdown */}
            <Card>
              <CardHeader>
                <CardTitle className="text-base">월 생활비 분석</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {(
                  [
                    ["숙박", city.costBreakdown.housing],
                    ["식비", city.costBreakdown.food],
                    ["교통", city.costBreakdown.transport],
                    ["카페", city.costBreakdown.cafe],
                    ["기타", city.costBreakdown.other],
                  ] as [string, number][]
                ).map(([label, amount]) => (
                  <div key={label}>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-muted-foreground">{label}</span>
                      <span className="font-medium">{(amount / 10000).toFixed(0)}만원</span>
                    </div>
                    <Progress value={(amount / totalCost) * 100} className="h-1.5" />
                  </div>
                ))}
                <Separator />
                <div className="flex justify-between text-sm font-semibold">
                  <span>합계</span>
                  <span className="text-primary">{(city.monthlyCost / 10000).toFixed(0)}만원/월</span>
                </div>
              </CardContent>
            </Card>

            {/* Best Seasons */}
            <Card>
              <CardHeader>
                <CardTitle className="text-base">추천 방문 시즌</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-4 gap-2">
                  {["봄", "여름", "가을", "겨울"].map((season) => (
                    <div
                      key={season}
                      className={`text-center p-3 rounded-lg text-sm font-medium transition-colors ${
                        city.bestSeasons.includes(season)
                          ? "bg-primary text-primary-foreground"
                          : "bg-muted text-muted-foreground"
                      }`}
                    >
                      <div className="text-lg mb-1">{seasonEmoji[season]}</div>
                      {season}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Related Actions */}
            <div className="space-y-2">
              <Button className="w-full gap-2" variant="outline">
                <Users className="w-4 h-4" />
                지금 여기 있어요 (체크인)
              </Button>
              <Button className="w-full gap-2" variant="outline">
                <Star className="w-4 h-4" />
                즐겨찾기 추가
              </Button>
              <Button className="w-full gap-2" variant="outline">
                <Wifi className="w-4 h-4" />
                도시 비교하기
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export async function generateStaticParams() {
  return cities.map((city) => ({ slug: city.slug }));
}
