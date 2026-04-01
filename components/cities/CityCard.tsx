import Link from "next/link";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Bookmark, ArrowRight, Users, Star, Wifi, Coffee } from "lucide-react";
import type { City } from "@/types";

interface CityCardProps {
  city: City;
  view?: "grid" | "list";
}

function formatCost(cost: number) {
  return `${(cost / 10000).toFixed(0)}만원`;
}

export default function CityCard({ city, view = "grid" }: CityCardProps) {
  if (view === "list") {
    return (
      <Card className="overflow-hidden hover:shadow-md transition-shadow">
        <div className="flex">
          <div className="relative w-48 shrink-0">
            <Image
              src={city.thumbnail}
              alt={city.name}
              fill
              className="object-cover"
            />
            <div className="absolute top-3 left-3">
              <Badge className="bg-primary text-primary-foreground font-bold">
                #{city.rank}
              </Badge>
            </div>
          </div>
          <CardContent className="flex-1 p-4">
            <div className="flex items-start justify-between mb-2">
              <div>
                <h3 className="text-lg font-bold">{city.name}</h3>
                <p className="text-sm text-muted-foreground">{city.region}</p>
              </div>
              <div className="text-right">
                <div className="text-2xl font-bold text-primary">{city.scores.nomad}</div>
                <div className="text-xs text-muted-foreground">노마드 점수</div>
              </div>
            </div>
            <Progress value={city.scores.nomad} className="h-2 mb-3" />
            <div className="grid grid-cols-4 gap-2 mb-3 text-xs text-muted-foreground">
              <div className="flex items-center gap-1">
                <span>💵</span> {formatCost(city.monthlyCost)}/월
              </div>
              <div className="flex items-center gap-1">
                <Wifi className="w-3 h-3" /> {city.internetSpeed}Mbps
              </div>
              <div className="flex items-center gap-1">
                <Coffee className="w-3 h-3" /> 카페 {city.scores.cafe}점
              </div>
              <div className="flex items-center gap-1">
                <Users className="w-3 h-3" /> {city.currentNomads}명 체류
              </div>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex gap-1 flex-wrap">
                {city.tags.slice(0, 3).map((tag) => (
                  <Badge key={tag} variant="secondary" className="text-xs">{tag}</Badge>
                ))}
              </div>
              <div className="flex gap-2">
                <Button variant="ghost" size="sm">
                  <Bookmark className="w-4 h-4" />
                </Button>
                <Button size="sm" render={<Link href={`/cities/${city.slug}`} />}>
                  상세보기
                </Button>
              </div>
            </div>
          </CardContent>
        </div>
      </Card>
    );
  }

  return (
    <Card className="overflow-hidden hover:shadow-lg transition-all duration-200 hover:-translate-y-0.5 group">
      {/* Thumbnail */}
      <div className="relative h-44 overflow-hidden">
        <Image
          src={city.thumbnail}
          alt={city.name}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
        <div className="absolute top-3 left-3">
          <Badge className="bg-primary text-primary-foreground font-bold">
            #{city.rank}
          </Badge>
        </div>
        <div className="absolute top-3 right-3">
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 bg-white/20 backdrop-blur hover:bg-white/40 text-white"
          >
            <Bookmark className="w-4 h-4" />
          </Button>
        </div>
        <div className="absolute bottom-3 left-3 right-3 flex items-end justify-between">
          <div>
            <h3 className="text-white font-bold text-lg leading-tight">{city.name}</h3>
            <p className="text-white/80 text-xs">{city.region}</p>
          </div>
          <div className="text-right">
            <div className="text-white font-bold text-xl">{city.scores.nomad}</div>
            <div className="text-white/70 text-xs">종합점수</div>
          </div>
        </div>
      </div>

      <CardContent className="p-4">
        {/* Score Bar */}
        <div className="mb-3">
          <div className="flex justify-between text-xs text-muted-foreground mb-1">
            <span>노마드 점수</span>
            <span className="font-medium text-foreground">{city.scores.nomad}/100</span>
          </div>
          <Progress value={city.scores.nomad} className="h-1.5" />
        </div>

        {/* Key Stats */}
        <div className="grid grid-cols-2 gap-2 mb-3 text-xs">
          <div className="flex items-center gap-1.5 text-muted-foreground">
            <span className="text-base">💵</span>
            <div>
              <div className="font-medium text-foreground">{formatCost(city.monthlyCost)}</div>
              <div>월 생활비</div>
            </div>
          </div>
          <div className="flex items-center gap-1.5 text-muted-foreground">
            <span className="text-base">📡</span>
            <div>
              <div className="font-medium text-foreground">{city.internetSpeed}Mbps</div>
              <div>인터넷</div>
            </div>
          </div>
          <div className="flex items-center gap-1.5 text-muted-foreground">
            <span className="text-base">☕</span>
            <div>
              <div className="font-medium text-foreground">{city.scores.cafe}점</div>
              <div>카페/코워킹</div>
            </div>
          </div>
          <div className="flex items-center gap-1.5 text-muted-foreground">
            <span className="text-base">👮</span>
            <div>
              <div className="font-medium text-foreground">{city.scores.safety}점</div>
              <div>안전도</div>
            </div>
          </div>
        </div>

        {/* Tags */}
        <div className="flex gap-1 flex-wrap mb-3">
          {city.tags.slice(0, 3).map((tag) => (
            <Badge key={tag} variant="secondary" className="text-xs">
              {tag}
            </Badge>
          ))}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between pt-2 border-t">
          <div className="flex items-center gap-3 text-xs text-muted-foreground">
            <span className="flex items-center gap-1">
              <Star className="w-3 h-3" /> {city.reviewCount}개 리뷰
            </span>
            <span className="flex items-center gap-1">
              <Users className="w-3 h-3" /> {city.currentNomads}명 체류
            </span>
          </div>
          <Button
            size="sm"
            variant="ghost"
            className="text-primary hover:text-primary h-7 px-2 gap-1"
            render={<Link href={`/cities/${city.slug}`} />}
          >
            상세보기 <ArrowRight className="w-3 h-3" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
