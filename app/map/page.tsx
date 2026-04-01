import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { cities } from "@/lib/mock-data";
import { MapPin, Users } from "lucide-react";
import Link from "next/link";

export default function MapPage() {
  return (
    <div className="flex h-[calc(100vh-4rem)]">
      {/* Sidebar */}
      <div className="w-80 shrink-0 border-r overflow-y-auto flex flex-col">
        <div className="p-4 border-b">
          <h2 className="font-bold mb-1">도시 목록</h2>
          <p className="text-xs text-muted-foreground">{cities.length}개 도시</p>
        </div>
        <div className="flex-1 overflow-y-auto divide-y">
          {cities.map((city) => (
            <Link
              key={city.id}
              href={`/cities/${city.slug}`}
              className="flex items-center gap-3 p-3 hover:bg-accent transition-colors"
            >
              <Badge className="w-7 h-7 rounded-full flex items-center justify-center text-xs p-0 shrink-0">
                {city.rank}
              </Badge>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between mb-0.5">
                  <span className="font-medium text-sm">{city.name}</span>
                  <span className="text-xs font-bold text-primary">{city.scores.nomad}</span>
                </div>
                <Progress value={city.scores.nomad} className="h-1 mb-1" />
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <span>{city.region}</span>
                  <span className="flex items-center gap-0.5">
                    <Users className="w-3 h-3" /> {city.currentNomads}명
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Map area placeholder */}
      <div className="flex-1 relative bg-muted/30 flex items-center justify-center">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-100 to-slate-200 dark:from-slate-800 dark:to-slate-900" />

        {/* Simulated map pins */}
        <div className="absolute inset-0">
          {cities.slice(0, 6).map((city, i) => {
            const positions = [
              { top: "60%", left: "20%" },
              { top: "70%", left: "55%" },
              { top: "50%", left: "45%" },
              { top: "75%", left: "35%" },
              { top: "65%", left: "60%" },
              { top: "45%", left: "25%" },
            ];
            const pos = positions[i];
            return (
              <div
                key={city.id}
                className="absolute -translate-x-1/2 -translate-y-1/2 cursor-pointer group"
                style={{ top: pos.top, left: pos.left }}
              >
                <div className="relative">
                  <div className="flex items-center gap-1 bg-background border-2 border-primary shadow-lg rounded-full px-2.5 py-1 text-xs font-semibold whitespace-nowrap group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                    <MapPin className="w-3 h-3" />
                    {city.name}
                  </div>
                  <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-primary rotate-45" />
                </div>
              </div>
            );
          })}
        </div>

        {/* Center placeholder message */}
        <Card className="relative z-10 shadow-xl">
          <CardContent className="p-8 text-center">
            <MapPin className="w-12 h-12 text-primary mx-auto mb-4" />
            <h3 className="text-lg font-bold mb-2">카카오맵 연동 예정</h3>
            <p className="text-sm text-muted-foreground mb-4 max-w-64">
              Kakao Map API 연동 후 실제 지도에서<br />
              도시 위치와 정보를 확인할 수 있습니다.
            </p>
            <Button variant="outline" render={<Link href="/cities" />}>
              도시 목록으로 보기
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
