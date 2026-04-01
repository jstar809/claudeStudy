import { cities, mockUser } from "@/lib/mock-data";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { ArrowLeft, MapPin } from "lucide-react";

export default function HistoryPage() {
  const visitedCities = cities.slice(0, mockUser.visitedCities);

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="flex items-center gap-3 mb-6">
        <Button variant="ghost" size="sm" render={<Link href="/my" />}>
          <ArrowLeft className="w-4 h-4" />
        </Button>
        <h1 className="text-2xl font-bold">여행 기록</h1>
        <span className="text-muted-foreground text-sm">({visitedCities.length}개 도시)</span>
      </div>

      <div className="space-y-3">
        {visitedCities.map((city, idx) => (
          <Card key={city.id}>
            <CardContent className="flex items-center gap-4 p-4">
              <div className="w-10 h-10 rounded-full bg-primary/10 text-primary flex items-center justify-center font-bold shrink-0">
                {idx + 1}
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <span className="font-semibold">{city.name}</span>
                  <Badge variant="outline" className="text-xs">{city.region}</Badge>
                </div>
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <MapPin className="w-3 h-3" />
                  <span>2025년 방문</span>
                  <span>·</span>
                  <span>노마드 점수 {city.scores.nomad}점</span>
                </div>
              </div>
              <Button variant="ghost" size="sm" render={<Link href={`/cities/${city.slug}`} />}>
                도시 보기
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
