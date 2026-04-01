import { cities } from "@/lib/mock-data";
import CityCard from "@/components/cities/CityCard";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Link from "next/link";
import { ArrowLeft, Bookmark } from "lucide-react";

export default function FavoritesPage() {
  const favoriteCities = cities.slice(0, 5);

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="flex items-center gap-3 mb-6">
        <Button variant="ghost" size="sm" render={<Link href="/my" />}>
          <ArrowLeft className="w-4 h-4" />
        </Button>
        <h1 className="text-2xl font-bold">즐겨찾기</h1>
        <span className="text-muted-foreground text-sm">({favoriteCities.length}개)</span>
      </div>

      {favoriteCities.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {favoriteCities.map((city) => (
            <CityCard key={city.id} city={city} />
          ))}
        </div>
      ) : (
        <Card>
          <CardContent className="py-16 text-center text-muted-foreground">
            <Bookmark className="w-12 h-12 mx-auto mb-4 opacity-20" />
            <p className="font-medium mb-1">즐겨찾기한 도시가 없어요</p>
            <p className="text-sm mb-4">관심 있는 도시를 저장해보세요!</p>
            <Button render={<Link href="/cities" />}>도시 탐색하기</Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
