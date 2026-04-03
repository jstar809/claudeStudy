import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Users } from "lucide-react";
import { cities } from "@/lib/mock-data";

const MEDALS = ["🥇", "🥈", "🥉"];

export default function CheckinRankSection() {
  const top3 = [...cities]
    .sort((a, b) => b.currentNomads - a.currentNomads)
    .slice(0, 3);

  return (
    <section className="py-16 bg-muted/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-2 mb-8">
          <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse inline-block" />
          <h2 className="text-2xl sm:text-3xl font-bold">이번 달 노마드 체크인 TOP 3</h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
          {top3.map((city, idx) => (
            <Link key={city.id} href={`/cities/${city.slug}`}>
              <Card className="hover:shadow-md transition-shadow cursor-pointer h-full">
                <CardContent className="p-6 text-center">
                  <div className="text-4xl mb-2">{MEDALS[idx]}</div>
                  <div className="text-xl font-bold mb-3">{city.name}</div>
                  <div className="flex items-center justify-center gap-1.5 text-2xl font-bold text-green-600">
                    <Users className="w-5 h-5" />
                    {city.currentNomads}명
                  </div>
                  <div className="text-xs text-muted-foreground mt-1">현재 체류 중</div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
